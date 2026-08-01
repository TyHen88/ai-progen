package com.projectgenerator.admin.service.impl;

import com.projectgenerator.admin.dto.AdminStatsDto;
import com.projectgenerator.admin.dto.AdminUserDto;
import com.projectgenerator.admin.service.AdminService;
import com.projectgenerator.generator.dto.GenerationJobDto;
import com.projectgenerator.generator.entity.GenerationJobEntity;
import com.projectgenerator.generator.repository.GenerationJobRepository;
import com.projectgenerator.project.repository.ProjectRepository;
import com.projectgenerator.user.entity.UserEntity;
import com.projectgenerator.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final GenerationJobRepository jobRepository;

    @Override
    public Page<AdminUserDto> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::mapUser);
    }

    @Override
    public Page<GenerationJobDto> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable).map(this::mapJob);
    }

    @Override
    @Cacheable(value = "statsCache", unless = "#result == null")
    public AdminStatsDto getStats() {
        Map<String, Long> jobsByStatus = new HashMap<>();
        for (Object[] row : jobRepository.countGroupedByStatus()) {
            jobsByStatus.put((String) row[0], (Long) row[1]);
        }

        return AdminStatsDto.builder()
                .totalUsers(userRepository.count())
                .totalProjects(projectRepository.count())
                .totalGenerationJobs(jobRepository.count())
                .jobsByStatus(jobsByStatus)
                .build();
    }

    private AdminUserDto mapUser(UserEntity entity) {
        return AdminUserDto.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .fullName(entity.getFullName())
                .role(entity.getRole())
                .credits(entity.getCredits())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    private GenerationJobDto mapJob(GenerationJobEntity entity) {
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
