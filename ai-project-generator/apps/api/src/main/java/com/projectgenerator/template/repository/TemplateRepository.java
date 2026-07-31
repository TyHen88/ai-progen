package com.projectgenerator.template.repository;

import com.projectgenerator.template.entity.TemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<TemplateEntity, String> {

    List<TemplateEntity> findByCategory(String category);
}
