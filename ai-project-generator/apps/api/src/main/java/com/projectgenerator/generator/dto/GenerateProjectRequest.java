package com.projectgenerator.generator.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GenerateProjectRequest {

    @NotBlank(message = "Prompt is required")
    private String prompt;

    @NotBlank(message = "Project type is required")
    private String projectType;

    private String frontend;
    private String backend;
    private String database;
    private Boolean includeAuth;
    private Boolean includeDocker;
    private Boolean includeTests;
}
