package com.projectgenerator.template.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateDto {

    private String id;
    private String title;
    private String description;
    private String category;
    private String badge;
    private String frontend;
    private String backend;
    private String database;
    private Integer downloadsCount;
    private Integer starsCount;
    private Boolean isPremium;
    private Instant createdAt;
}
