package com.projectgenerator.worker.generator.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Mirrors apps/api's com.projectgenerator.generator.entity.GenerationJobEntity — same table,
 * separate Gradle project (no shared module exists yet, see .ai/memory/known-issues.md).
 * apps/api owns the schema (Flyway); this service only reads/writes rows.
 */
@Entity
@Table(name = "generation_jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenerationJobEntity {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "user_id", length = 36)
    private String userId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "project_type", nullable = false, length = 50)
    private String projectType;

    @Column(length = 50)
    private String frontend;

    @Column(length = 50)
    private String backend;

    @Column(length = 50)
    private String database;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "progress_percentage")
    private Integer progressPercentage;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "result_project_id", length = 36)
    private String resultProjectId;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
