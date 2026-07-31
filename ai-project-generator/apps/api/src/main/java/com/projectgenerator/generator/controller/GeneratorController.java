package com.projectgenerator.generator.controller;

import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.generator.dto.GenerateProjectRequest;
import com.projectgenerator.generator.dto.GenerationJobDto;
import com.projectgenerator.generator.service.GeneratorService;
import com.projectgenerator.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/generator")
@RequiredArgsConstructor
@Tag(name = "Generator Engine", description = "AI Project Generation pipeline endpoints")
public class GeneratorController {

    private final GeneratorService generatorService;

    @PostMapping("/generate")
    @Operation(summary = "Start AI Project Generation", description = "Submit a prompt to start background AI project generation pipeline")
    public ResponseEntity<ApiResponse<GenerationJobDto>> generateProject(
            @Valid @RequestBody GenerateProjectRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        GenerationJobDto job = generatorService.startGeneration(request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(job, "Generation pipeline started successfully"));
    }

    @GetMapping("/jobs/{jobId}")
    @Operation(summary = "Check Job Progress Status", description = "Poll generation pipeline status and percentage")
    public ResponseEntity<ApiResponse<GenerationJobDto>> getJobStatus(
            @PathVariable String jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        GenerationJobDto job = generatorService.getJobStatus(jobId, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(job));
    }
}
