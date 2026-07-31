package com.projectgenerator.worker.project.repository;

import com.projectgenerator.worker.project.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {
}
