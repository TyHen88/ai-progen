package com.projectgenerator.project.repository;

import com.projectgenerator.project.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {

    List<ProjectEntity> findByUserIdOrderByCreatedAtDesc(String userId);

    List<ProjectEntity> findByIsFavoriteTrue();
}
