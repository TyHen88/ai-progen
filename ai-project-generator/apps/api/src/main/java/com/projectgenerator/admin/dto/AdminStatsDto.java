package com.projectgenerator.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDto {

    private long totalUsers;
    private long totalProjects;
    private long totalGenerationJobs;
    private Map<String, Long> jobsByStatus;
}
