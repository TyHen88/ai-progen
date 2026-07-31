package com.projectgenerator.template.controller;

import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.template.dto.TemplateDto;
import com.projectgenerator.template.service.TemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/templates")
@RequiredArgsConstructor
@Tag(name = "Templates", description = "Browse & detail endpoints for starter templates")
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    @Operation(summary = "List Templates", description = "Fetch list of pre-configured starter project templates")
    public ResponseEntity<ApiResponse<List<TemplateDto>>> getAllTemplates() {
        List<TemplateDto> templates = templateService.getAllTemplates();
        return ResponseEntity.ok(ApiResponse.success(templates, "Templates retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Template by ID", description = "Fetch detailed template specifications")
    public ResponseEntity<ApiResponse<TemplateDto>> getTemplateById(@PathVariable String id) {
        TemplateDto template = templateService.getTemplateById(id);
        return ResponseEntity.ok(ApiResponse.success(template));
    }
}
