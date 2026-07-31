package com.projectgenerator.admin.controller;

import com.projectgenerator.admin.dto.AdminStatsDto;
import com.projectgenerator.admin.dto.AdminUserDto;
import com.projectgenerator.admin.service.AdminService;
import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.common.response.PageResponse;
import com.projectgenerator.generator.dto.GenerationJobDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Every endpoint here requires ROLE_ADMIN — enforced by SecurityConfig's /api/v1/admin/** matcher. */
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Read-only administrative views over users, jobs, and system stats")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    @Operation(summary = "List Users", description = "Paginated list of all registered users")
    public ResponseEntity<ApiResponse<PageResponse<AdminUserDto>>> getUsers(
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success(PageResponse.of(adminService.getUsers(pageable))));
    }

    @GetMapping("/jobs")
    @Operation(summary = "List All Generation Jobs", description = "Paginated list of every user's generation jobs")
    public ResponseEntity<ApiResponse<PageResponse<GenerationJobDto>>> getAllJobs(
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success(PageResponse.of(adminService.getAllJobs(pageable))));
    }

    @GetMapping("/stats")
    @Operation(summary = "System Stats", description = "Counts of users, projects, and generation jobs by status")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getStats() {
        return ResponseEntity.ok(ApiResponse.success(adminService.getStats()));
    }
}
