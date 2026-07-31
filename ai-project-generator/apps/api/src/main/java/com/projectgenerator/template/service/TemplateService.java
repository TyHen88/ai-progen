package com.projectgenerator.template.service;

import com.projectgenerator.template.dto.TemplateDto;

import java.util.List;

public interface TemplateService {

    List<TemplateDto> getAllTemplates();

    TemplateDto getTemplateById(String id);
}
