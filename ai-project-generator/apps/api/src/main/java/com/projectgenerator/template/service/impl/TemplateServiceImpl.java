package com.projectgenerator.template.service.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.common.exception.ErrorCode;
import com.projectgenerator.template.dto.TemplateDto;
import com.projectgenerator.template.entity.TemplateEntity;
import com.projectgenerator.template.repository.TemplateRepository;
import com.projectgenerator.template.service.TemplateService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;

@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<TemplateDto> getTemplates(String search, String category, Boolean isPremium, Pageable pageable) {
        Specification<TemplateEntity> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String searchLike = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), searchLike),
                        cb.like(cb.lower(root.get("description")), searchLike)
                ));
            }

            if (category != null && !category.isBlank()) {
                predicates.add(cb.equal(root.get("category"), category.trim()));
            }

            if (isPremium != null) {
                predicates.add(cb.equal(root.get("isPremium"), isPremium));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return templateRepository.findAll(spec, pageable).map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TemplateDto> getAllTemplates() {
        return templateRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TemplateDto getTemplateById(String id) {
        TemplateEntity entity = templateRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "Template not found with id: " + id));
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
