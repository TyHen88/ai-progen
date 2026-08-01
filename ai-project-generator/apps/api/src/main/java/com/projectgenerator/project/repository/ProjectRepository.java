package com.projectgenerator.project.repository;

import com.projectgenerator.project.entity.ProjectEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, String>, JpaSpecificationExecutor<ProjectEntity> {

    Page<ProjectEntity> findByUserId(String userId, Pageable pageable);

    List<ProjectEntity> findByUserIdOrderByCreatedAtDesc(String userId);

    List<ProjectEntity> findByIsFavoriteTrue();
}
