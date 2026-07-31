package com.projectgenerator.template.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateEntity {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(length = 50)
    private String badge;

    @Column(length = 50)
    private String frontend;

    @Column(length = 50)
    private String backend;

    @Column(length = 50)
    private String database;

    @Column(name = "downloads_count")
    private Integer downloadsCount;

    @Column(name = "stars_count")
    private Integer starsCount;

    @Column(name = "is_premium")
    private Boolean isPremium;

    @Column(name = "created_at")
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
        if (downloadsCount == null) downloadsCount = 0;
        if (starsCount == null) starsCount = 0;
        if (isPremium == null) isPremium = false;
        createdAt = Instant.now();
    }
}
