package com.projectgenerator.generator.service.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.generator.dto.GenerateProjectRequest;
import com.projectgenerator.generator.dto.GenerationJobDto;
import com.projectgenerator.generator.entity.GenerationJobEntity;
import com.projectgenerator.generator.repository.GenerationJobRepository;
import com.projectgenerator.generator.service.GeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * This service only enqueues generation work now — apps/worker (a separate process) does the
 * actual AI/template/archive/storage pipeline, consuming the stream this class produces to.
 * See .ai/architecture/system.md and .ai/memory/changelog.md (2026-07-31, "Backend: full
 * completion pass") for why this moved out of an in-process @Async method.
 */
@Service
@RequiredArgsConstructor
public class GeneratorServiceImpl implements GeneratorService {

    private final GenerationJobRepository jobRepository;
    private final StringRedisTemplate redisTemplate;

    @Value("${queue.stream-name:generation-jobs}")
    private String streamName;

    @Override
    public GenerationJobDto startGeneration(GenerateProjectRequest request, String userId) {
        String jobId = "job_" + UUID.randomUUID();

        GenerationJobEntity job = GenerationJobEntity.builder()
                .id(jobId)
                .userId(userId)
                .prompt(request.getPrompt())
                .projectType(request.getProjectType())
                .frontend(request.getFrontend())
                .backend(request.getBackend())
                .database(request.getDatabase())
                .status("QUEUED")
                .progressPercentage(0)
                .build();

        GenerationJobEntity saved = jobRepository.save(job);

        redisTemplate.opsForStream().add(streamName, toStreamFields(saved));

        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public GenerationJobDto getJobStatus(String jobId, String userId) {
        return mapToDto(findOwnedJobOrThrow(jobId, userId));
    }

    private Map<String, String> toStreamFields(GenerationJobEntity job) {
        Map<String, String> fields = new HashMap<>();
        fields.put("jobId", job.getId());
        fields.put("userId", nullToEmpty(job.getUserId()));
        fields.put("prompt", nullToEmpty(job.getPrompt()));
        fields.put("projectType", nullToEmpty(job.getProjectType()));
        fields.put("frontend", nullToEmpty(job.getFrontend()));
        fields.put("backend", nullToEmpty(job.getBackend()));
        fields.put("database", nullToEmpty(job.getDatabase()));
        return fields;
    }

    private String nullToEmpty(String value) {
        return value == null ? "" : value;
    }

    private GenerationJobEntity findOwnedJobOrThrow(String jobId, String userId) {
        GenerationJobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new BusinessException("Generation job not found: " + jobId, HttpStatus.NOT_FOUND));
        if (!job.getUserId().equals(userId)) {
            throw new BusinessException("You do not have access to this generation job", HttpStatus.FORBIDDEN);
        }
        return job;
    }

    private GenerationJobDto mapToDto(GenerationJobEntity entity) {
        return GenerationJobDto.builder()
                .jobId(entity.getId())
                .userId(entity.getUserId())
                .prompt(entity.getPrompt())
                .projectType(entity.getProjectType())
                .frontend(entity.getFrontend())
                .backend(entity.getBackend())
                .database(entity.getDatabase())
                .status(entity.getStatus())
                .progressPercentage(entity.getProgressPercentage())
                .errorMessage(entity.getErrorMessage())
                .resultProjectId(entity.getResultProjectId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
