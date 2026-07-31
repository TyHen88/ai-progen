package com.projectgenerator.generator.repository;

import com.projectgenerator.generator.entity.GenerationJobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GenerationJobRepository extends JpaRepository<GenerationJobEntity, String> {

    @Query("SELECT j.status, COUNT(j) FROM GenerationJobEntity j GROUP BY j.status")
    List<Object[]> countGroupedByStatus();
}
