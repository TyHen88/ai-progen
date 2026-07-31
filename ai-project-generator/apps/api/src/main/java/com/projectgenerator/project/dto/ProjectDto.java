package com.projectgenerator.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {

    private String id;
    private String userId;
    private String name;
    private String description;
    private String projectType;
    private String frontendStack;
    private String backendStack;
    private String databaseStack;
    private String status;
    private String archiveUrl;
    private Integer starsCount;
    private Boolean isFavorite;
    private Instant createdAt;
    private Instant updatedAt;
}
