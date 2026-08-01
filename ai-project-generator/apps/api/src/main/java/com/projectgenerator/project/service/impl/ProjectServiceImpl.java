package com.projectgenerator.project.service.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.common.exception.ErrorCode;
import com.projectgenerator.project.dto.CreateProjectRequest;
import com.projectgenerator.project.dto.ProjectDto;
import com.projectgenerator.project.entity.ProjectEntity;
import com.projectgenerator.project.repository.ProjectRepository;
import com.projectgenerator.project.service.ProjectService;
import com.projectgenerator.security.SecurityUtils;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectDto> getProjects(String search, String projectType, Boolean isFavorite, Pageable pageable) {
        Specification<ProjectEntity> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String searchLike = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), searchLike),
                        cb.like(cb.lower(root.get("description")), searchLike)
                ));
            }

            if (projectType != null && !projectType.isBlank()) {
                predicates.add(cb.equal(root.get("projectType"), projectType.trim()));
            }

            if (isFavorite != null) {
                predicates.add(cb.equal(root.get("isFavorite"), isFavorite));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return projectRepository.findAll(spec, pageable).map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getUserProjects(String userId) {
        return projectRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToDto)
                .toList();
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
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "Project not found with id: " + id));
        project.setArchiveUrl(archiveUrl);
        return mapToDto(projectRepository.save(project));
    }

    private ProjectEntity findOwnedProjectOrThrow(String id, String userId) {
        ProjectEntity project = projectRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "Project not found with id: " + id));
        SecurityUtils.validateOwnership(project.getUserId(), userId);
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
