package com.projectgenerator.template.controller;

import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.common.response.PageResponse;
import com.projectgenerator.template.dto.TemplateDto;
import com.projectgenerator.template.service.TemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/templates")
@RequiredArgsConstructor
@Tag(name = "Templates", description = "Browse & detail endpoints for starter templates")
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    @Operation(summary = "List Templates (Paginated & Filtered)", description = "Fetch paginated, sorted, and filtered list of pre-configured starter project templates")
    public ResponseEntity<ApiResponse<PageResponse<TemplateDto>>> getTemplates(
            @Parameter(description = "Search term by title or description") @RequestParam(required = false) String search,
            @Parameter(description = "Filter by template category") @RequestParam(required = false) String category,
            @Parameter(description = "Filter by premium status") @RequestParam(required = false) Boolean isPremium,
            @PageableDefault(size = 20, sort = "downloadsCount", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        PageResponse<TemplateDto> response = PageResponse.of(templateService.getTemplates(search, category, isPremium, pageable));
        return ResponseEntity.ok(ApiResponse.success(response, "Templates retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Template by ID", description = "Fetch detailed template specifications")
    public ResponseEntity<ApiResponse<TemplateDto>> getTemplateById(@PathVariable String id) {
        TemplateDto template = templateService.getTemplateById(id);
        return ResponseEntity.ok(ApiResponse.success(template));
    }
}
