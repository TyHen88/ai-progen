package com.projectgenerator.health;

import com.projectgenerator.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health Check", description = "System status & telemetry endpoint")
public class HealthController {

    @GetMapping
    @Operation(summary = "Get system health status", description = "Returns service status, profile, and version info")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealthStatus() {
        Map<String, Object> statusData = Map.of(
            "status", "UP",
            "service", "ai-project-generator-api",
            "version", "0.1.0",
            "jvm", System.getProperty("java.version"),
            "environment", System.getProperty("spring.profiles.active", "dev")
        );
        return ResponseEntity.ok(ApiResponse.success(statusData, "API service is healthy"));
    }
}
