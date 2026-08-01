package com.projectgenerator.project.service;

import com.projectgenerator.project.dto.CreateProjectRequest;
import com.projectgenerator.project.dto.ProjectDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectService {

    Page<ProjectDto> getProjects(String search, String projectType, Boolean isFavorite, Pageable pageable);

    List<ProjectDto> getAllProjects();

    List<ProjectDto> getUserProjects(String userId);

    ProjectDto getProjectById(String id, String userId);

    ProjectDto createProject(CreateProjectRequest request, String userId);

    ProjectDto toggleFavorite(String id, String userId);

    void deleteProject(String id, String userId);

    ProjectDto updateArchiveUrl(String id, String archiveUrl);
}
