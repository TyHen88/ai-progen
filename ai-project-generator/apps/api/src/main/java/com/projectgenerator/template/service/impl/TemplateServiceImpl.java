package com.projectgenerator.template.service.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.template.dto.TemplateDto;
import com.projectgenerator.template.entity.TemplateEntity;
import com.projectgenerator.template.repository.TemplateRepository;
import com.projectgenerator.template.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;

    @Override
    @Transactional(readOnly = true)
    public List<TemplateDto> getAllTemplates() {
        return templateRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TemplateDto getTemplateById(String id) {
        TemplateEntity entity = templateRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Template not found with id: " + id, HttpStatus.NOT_FOUND));
        return mapToDto(entity);
    }

    private TemplateDto mapToDto(TemplateEntity entity) {
        return TemplateDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .badge(entity.getBadge())
                .frontend(entity.getFrontend())
                .backend(entity.getBackend())
                .database(entity.getDatabase())
                .downloadsCount(entity.getDownloadsCount())
                .starsCount(entity.getStarsCount())
                .isPremium(entity.getIsPremium())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
