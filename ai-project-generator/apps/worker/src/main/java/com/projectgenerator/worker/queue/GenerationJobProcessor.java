package com.projectgenerator.worker.queue;

import com.projectgenerator.worker.archive.ArchiveService;
import com.projectgenerator.worker.generator.entity.GenerationJobEntity;
import com.projectgenerator.worker.generator.repository.GenerationJobRepository;
import com.projectgenerator.worker.project.entity.ProjectEntity;
import com.projectgenerator.worker.project.repository.ProjectRepository;
import com.projectgenerator.worker.provider.AiProvider;
import com.projectgenerator.worker.provider.factory.AiProviderFactory;
import com.projectgenerator.worker.templateengine.TemplateEngine;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * The actual generation pipeline — moved here from apps/api's old (synchronous, in-request)
 * GeneratorServiceImpl.processGenerationAsync. Runs off the HTTP request thread, in this
 * separate process, triggered by GenerationJobConsumer.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GenerationJobProcessor {

    private static final Set<String> TERMINAL_STATUSES = Set.of("COMPLETED", "FAILED");

    private final GenerationJobRepository jobRepository;
    private final ProjectRepository projectRepository;
    private final AiProviderFactory aiProviderFactory;
    private final TemplateEngine templateEngine;
    private final ArchiveService archiveService;

    @Value("${generator.workspace-dir:./generated}")
    private String workspaceRootDir;

    @Value("${templates.root-dir:../../templates}")
    private String templatesRootDir;

    public void process(GenerationJobPayload payload) {
        Optional<GenerationJobEntity> existing = jobRepository.findById(payload.jobId());
        if (existing.isEmpty()) {
            log.warn("Received message for unknown job {}, skipping", payload.jobId());
            return;
        }

        GenerationJobEntity job = existing.get();
        if (TERMINAL_STATUSES.contains(job.getStatus())) {
            // Idempotency guard: a redelivered (retried) message for an already-finished job
            // must be a no-op, not redo (and re-bill) the work.
            log.info("Job {} already {}, skipping redelivered message", payload.jobId(), job.getStatus());
            return;
        }

        Path workspaceDir = null;
        try {
            updateProgress(job, "ANALYZING_REQUIREMENTS", 40);
            AiProvider provider = aiProviderFactory.getProvider(null);
            String analysis = provider.generateText(payload.prompt(), 0.7);

            updateProgress(job, "GENERATING_CODE", 75);
            String generatedCode = provider.generateCode(payload.prompt(), payload.backend());

            Map<String, String> variables = buildTemplateVariables(payload);
            workspaceDir = Path.of(workspaceRootDir, payload.jobId());
            Files.createDirectories(workspaceDir);

            templateEngine.render(Path.of(templatesRootDir, "spring-boot", "files"), workspaceDir, variables);
            writeGeneratedCode(workspaceDir, variables, generatedCode);
            writeAiContext(workspaceDir, payload, analysis);

            File zipFile = archiveService.createZipArchive(workspaceDir.toFile(), payload.jobId());
            String downloadUrl = "/api/v1/storage/download/" + zipFile.getName();

            ProjectEntity project = ProjectEntity.builder()
                    .userId(payload.userId())
                    .name(variables.get("PROJECT_NAME"))
                    .description(payload.prompt())
                    .projectType(payload.projectType())
                    .frontendStack(payload.frontend())
                    .backendStack(payload.backend())
                    .databaseStack(payload.database())
                    .status("READY")
                    .archiveUrl(downloadUrl)
                    .build();
            ProjectEntity savedProject = projectRepository.save(project);

            job.setStatus("COMPLETED");
            job.setProgressPercentage(100);
            job.setResultProjectId(savedProject.getId());
            jobRepository.save(job);

            log.info("Generation job {} completed -> project {}", payload.jobId(), savedProject.getId());
        } catch (Exception e) {
            log.error("Generation job {} failed", payload.jobId(), e);
            job.setStatus("FAILED");
            job.setErrorMessage("Generation failed: " + e.getMessage());
            jobRepository.save(job);
        } finally {
            cleanupWorkspace(workspaceDir);
        }
    }

    private Map<String, String> buildTemplateVariables(GenerationJobPayload payload) {
        String shortId = payload.jobId().replace("job_", "").replace("-", "");
        shortId = shortId.substring(0, Math.min(8, shortId.length()));
        String slug = slugify(payload.projectType()) + "-" + shortId;

        Map<String, String> variables = new HashMap<>();
        variables.put("PROJECT_NAME", slug);
        variables.put("PACKAGE_NAME", "com.generated." + slug.replace("-", ""));
        variables.put("DB_NAME", slug.replace("-", "_"));
        return variables;
    }

    private String slugify(String value) {
        if (value == null || value.isBlank()) {
            return "app";
        }
        String slug = value.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-+|-+$)", "");
        return slug.isBlank() ? "app" : slug;
    }

    private void writeGeneratedCode(Path workspaceDir, Map<String, String> variables, String generatedCode) throws IOException {
        String packagePath = variables.get("PACKAGE_NAME").replace('.', '/');
        Path generatedDir = workspaceDir.resolve("src/main/java").resolve(packagePath).resolve("generated");
        Files.createDirectories(generatedDir);

        String header = "package " + variables.get("PACKAGE_NAME") + ".generated;\n\n";
        Files.writeString(generatedDir.resolve("GeneratedFeature.java"), header + stripMarkdownFences(generatedCode));
    }

    private void writeAiContext(Path workspaceDir, GenerationJobPayload payload, String analysis) throws IOException {
        Path aiDir = workspaceDir.resolve(".ai");
        Files.createDirectories(aiDir);
        String content = """
                # AI Context

                ## Original prompt
                %s

                ## Requested stack
                - Project type: %s
                - Frontend: %s
                - Backend: %s
                - Database: %s

                ## AI requirements analysis
                %s
                """.formatted(
                payload.prompt(),
                payload.projectType(),
                orDash(payload.frontend()),
                orDash(payload.backend()),
                orDash(payload.database()),
                analysis
        );
        Files.writeString(aiDir.resolve("context.md"), content);
    }

    private String orDash(String value) {
        return (value == null || value.isBlank()) ? "-" : value;
    }

    private String stripMarkdownFences(String text) {
        if (text == null) {
            return "";
        }
        String trimmed = text.strip();
        if (trimmed.startsWith("```")) {
            int firstNewline = trimmed.indexOf('\n');
            int lastFence = trimmed.lastIndexOf("```");
            if (firstNewline != -1 && lastFence > firstNewline) {
                return trimmed.substring(firstNewline + 1, lastFence).strip();
            }
        }
        return trimmed;
    }

    private void updateProgress(GenerationJobEntity job, String status, int percentage) {
        job.setStatus(status);
        job.setProgressPercentage(percentage);
        jobRepository.save(job);
    }

    private void cleanupWorkspace(Path workspaceDir) {
        if (workspaceDir == null || !Files.exists(workspaceDir)) {
            return;
        }
        try (var paths = Files.walk(workspaceDir)) {
            paths.sorted(Comparator.reverseOrder()).forEach(path -> {
                try {
                    Files.delete(path);
                } catch (IOException e) {
                    log.warn("Failed to delete {} while cleaning up workspace", path, e);
                }
            });
        } catch (IOException e) {
            log.warn("Failed to clean up workspace {}", workspaceDir, e);
        }
    }
}
