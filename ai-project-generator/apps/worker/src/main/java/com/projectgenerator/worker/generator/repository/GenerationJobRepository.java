package com.projectgenerator.worker.generator.repository;

import com.projectgenerator.worker.generator.entity.GenerationJobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerationJobRepository extends JpaRepository<GenerationJobEntity, String> {
}
