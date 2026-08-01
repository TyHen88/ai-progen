package com.projectgenerator.template.service;

import com.projectgenerator.template.dto.TemplateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TemplateService {

    Page<TemplateDto> getTemplates(String search, String category, Boolean isPremium, Pageable pageable);

    List<TemplateDto> getAllTemplates();

    TemplateDto getTemplateById(String id);
}
