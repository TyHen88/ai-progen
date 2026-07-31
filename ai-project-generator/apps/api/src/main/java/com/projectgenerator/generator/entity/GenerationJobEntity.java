package com.projectgenerator.generator.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

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

    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = "QUEUED";
        }
        if (progressPercentage == null) {
            progressPercentage = 0;
        }
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
