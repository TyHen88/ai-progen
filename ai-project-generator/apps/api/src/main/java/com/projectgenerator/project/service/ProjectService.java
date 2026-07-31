package com.projectgenerator.project.service;

import com.projectgenerator.project.dto.CreateProjectRequest;
import com.projectgenerator.project.dto.ProjectDto;

import java.util.List;

public interface ProjectService {

    List<ProjectDto> getAllProjects();

    List<ProjectDto> getUserProjects(String userId);

    ProjectDto getProjectById(String id, String userId);

    ProjectDto createProject(CreateProjectRequest request, String userId);

    ProjectDto toggleFavorite(String id, String userId);

    void deleteProject(String id, String userId);

    /**
     * Internal-only — not exposed via any controller. Called by the generator pipeline right
     * after it has actually built and stored an archive for a project it just created.
     */
    ProjectDto updateArchiveUrl(String id, String archiveUrl);
}
