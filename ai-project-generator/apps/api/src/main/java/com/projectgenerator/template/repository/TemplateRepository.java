package com.projectgenerator.template.repository;

import com.projectgenerator.template.entity.TemplateEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<TemplateEntity, String>, JpaSpecificationExecutor<TemplateEntity> {

    Page<TemplateEntity> findByCategory(String category, Pageable pageable);

    List<TemplateEntity> findByCategory(String category);
}
