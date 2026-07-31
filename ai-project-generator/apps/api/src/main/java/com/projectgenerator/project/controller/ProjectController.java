package com.projectgenerator.project.controller;

import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.project.dto.CreateProjectRequest;
import com.projectgenerator.project.dto.ProjectDto;
import com.projectgenerator.project.service.ProjectService;
import com.projectgenerator.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "User & Admin Project CRUD operations")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "List All Projects", description = "Fetch list of all generated projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.success(projects, "Projects retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Project by ID", description = "Fetch project metadata details")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectById(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        ProjectDto project = projectService.getProjectById(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @PostMapping
    @Operation(summary = "Create Project", description = "Create a new project definition")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(
            @Valid @RequestBody CreateProjectRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        ProjectDto project = projectService.createProject(request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(project, "Project created successfully"));
    }

    @PatchMapping("/{id}/favorite")
    @Operation(summary = "Toggle Project Favorite", description = "Toggle isFavorite state for a project")
    public ResponseEntity<ApiResponse<ProjectDto>> toggleFavorite(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        ProjectDto project = projectService.toggleFavorite(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(project, "Project favorite updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Project", description = "Delete a project by ID")
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        projectService.deleteProject(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(null, "Project deleted successfully"));
    }
}
