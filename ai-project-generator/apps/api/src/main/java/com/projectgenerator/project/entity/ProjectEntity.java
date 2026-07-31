package com.projectgenerator.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectEntity {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "user_id", length = 36)
    private String userId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "project_type", nullable = false, length = 50)
    private String projectType;

    @Column(name = "frontend_stack", length = 50)
    private String frontendStack;

    @Column(name = "backend_stack", length = 50)
    private String backendStack;

    @Column(name = "database_stack", length = 50)
    private String databaseStack;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "archive_url", length = 500)
    private String archiveUrl;

    @Column(name = "stars_count")
    private Integer starsCount;

    @Column(name = "is_favorite")
    private Boolean isFavorite;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
        if (status == null) {
            status = "READY";
        }
        if (starsCount == null) {
            starsCount = 0;
        }
        if (isFavorite == null) {
            isFavorite = false;
        }
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
