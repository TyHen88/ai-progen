package com.projectgenerator.admin.service;

import com.projectgenerator.admin.dto.AdminStatsDto;
import com.projectgenerator.admin.dto.AdminUserDto;
import com.projectgenerator.generator.dto.GenerationJobDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {

    Page<AdminUserDto> getUsers(Pageable pageable);

    Page<GenerationJobDto> getAllJobs(Pageable pageable);

    AdminStatsDto getStats();
}
