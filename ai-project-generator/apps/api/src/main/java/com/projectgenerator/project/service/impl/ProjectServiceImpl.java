package com.projectgenerator.project.service.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.project.dto.CreateProjectRequest;
import com.projectgenerator.project.dto.ProjectDto;
import com.projectgenerator.project.entity.ProjectEntity;
import com.projectgenerator.project.repository.ProjectRepository;
import com.projectgenerator.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getUserProjects(String userId) {
        return projectRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDto getProjectById(String id, String userId) {
        ProjectEntity project = findOwnedProjectOrThrow(id, userId);
        return mapToDto(project);
    }

    @Override
    @Transactional
    public ProjectDto createProject(CreateProjectRequest request, String userId) {
        ProjectEntity entity = ProjectEntity.builder()
                .userId(userId)
                .name(request.getName())
                .description(request.getDescription())
                .projectType(request.getProjectType())
                .frontendStack(request.getFrontendStack())
                .backendStack(request.getBackendStack())
                .databaseStack(request.getDatabaseStack())
                .status("READY")
                .isFavorite(false)
                .starsCount(0)
                .build();

        ProjectEntity saved = projectRepository.save(entity);
        return mapToDto(saved);
    }

    @Override
    @Transactional
    public ProjectDto toggleFavorite(String id, String userId) {
        ProjectEntity project = findOwnedProjectOrThrow(id, userId);
        project.setIsFavorite(!Boolean.TRUE.equals(project.getIsFavorite()));
        return mapToDto(projectRepository.save(project));
    }

    @Override
    @Transactional
    public void deleteProject(String id, String userId) {
        ProjectEntity project = findOwnedProjectOrThrow(id, userId);
        projectRepository.delete(project);
    }

    @Override
    @Transactional
    public ProjectDto updateArchiveUrl(String id, String archiveUrl) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Project not found with id: " + id, HttpStatus.NOT_FOUND));
        project.setArchiveUrl(archiveUrl);
        return mapToDto(projectRepository.save(project));
    }

    /**
     * Loads a project and verifies it belongs to userId, so one user can never read/mutate
     * another user's project by guessing its id (IDOR).
     */
    private ProjectEntity findOwnedProjectOrThrow(String id, String userId) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Project not found with id: " + id, HttpStatus.NOT_FOUND));
        if (!project.getUserId().equals(userId)) {
            throw new BusinessException("You do not have access to this project", HttpStatus.FORBIDDEN);
        }
        return project;
    }

    private ProjectDto mapToDto(ProjectEntity entity) {
        return ProjectDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .name(entity.getName())
                .description(entity.getDescription())
                .projectType(entity.getProjectType())
                .frontendStack(entity.getFrontendStack())
                .backendStack(entity.getBackendStack())
                .databaseStack(entity.getDatabaseStack())
                .status(entity.getStatus())
                .archiveUrl(entity.getArchiveUrl())
                .starsCount(entity.getStarsCount())
                .isFavorite(entity.getIsFavorite())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
