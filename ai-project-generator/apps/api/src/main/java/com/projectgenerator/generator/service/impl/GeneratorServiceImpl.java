package com.projectgenerator.generator.service.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.common.exception.ErrorCode;
import com.projectgenerator.generator.dto.GenerateProjectRequest;
import com.projectgenerator.generator.dto.GenerationJobDto;
import com.projectgenerator.generator.entity.GenerationJobEntity;
import com.projectgenerator.generator.repository.GenerationJobRepository;
import com.projectgenerator.generator.service.GeneratorService;
import com.projectgenerator.security.SecurityUtils;
import com.projectgenerator.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeneratorServiceImpl implements GeneratorService {

    private static final int GENERATION_CREDIT_COST = 10;

    private final GenerationJobRepository jobRepository;
    private final UserRepository userRepository;
    private final StringRedisTemplate redisTemplate;

    @Value("${queue.stream-name:generation-jobs}")
    private String streamName;

    @Override
    @Transactional
    public GenerationJobDto startGeneration(GenerateProjectRequest request, String userId) {
        // 1. Atomic Credit Check & Deduction
        int updatedRows = userRepository.deductCredits(userId, GENERATION_CREDIT_COST);
        if (updatedRows == 0) {
            log.warn("User {} has insufficient credits (cost: {})", userId, GENERATION_CREDIT_COST);
            throw new BusinessException(ErrorCode.INSUFFICIENT_CREDITS, "Insufficient credits. Generating a project requires " + GENERATION_CREDIT_COST + " credits.");
        }

        // 2. Persist Generation Job in Database
        String jobId = UUID.randomUUID().toString();

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

        // 3. Publish to Redis Stream with Fail-Safe Transaction Rollback
        try {
            redisTemplate.opsForStream().add(streamName, toStreamFields(saved));
            log.info("Successfully enqueued job {} for user {} to stream {}", jobId, userId, streamName);
        } catch (Exception ex) {
            log.error("Failed to publish job {} to Redis Stream {}", jobId, streamName, ex);
            throw new BusinessException(ErrorCode.QUEUE_ENQUEUE_FAILED, "Failed to enqueue project generation task into job queue");
        }

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
                .orElseThrow(() -> new BusinessException(ErrorCode.JOB_NOT_FOUND, "Generation job not found: " + jobId));

        SecurityUtils.validateOwnership(job.getUserId(), userId);
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
