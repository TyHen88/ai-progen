package com.projectgenerator.project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProjectRequest {

    @NotBlank(message = "Project name is required")
    private String name;

    private String description;

    @NotBlank(message = "Project type is required")
    private String projectType;

    private String frontendStack;
    private String backendStack;
    private String databaseStack;
}
