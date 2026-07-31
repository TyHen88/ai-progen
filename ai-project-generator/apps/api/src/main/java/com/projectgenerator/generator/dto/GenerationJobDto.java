package com.projectgenerator.generator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerationJobDto {

    private String jobId;
    private String userId;
    private String prompt;
    private String projectType;
    private String frontend;
    private String backend;
    private String database;
    private String status;
    private Integer progressPercentage;
    private String errorMessage;
    private String resultProjectId;
    private Instant createdAt;
    private Instant updatedAt;
}
