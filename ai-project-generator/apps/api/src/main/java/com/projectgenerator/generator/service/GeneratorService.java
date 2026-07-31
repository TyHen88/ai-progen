package com.projectgenerator.generator.service;

import com.projectgenerator.generator.dto.GenerateProjectRequest;
import com.projectgenerator.generator.dto.GenerationJobDto;

public interface GeneratorService {

    GenerationJobDto startGeneration(GenerateProjectRequest request, String userId);

    GenerationJobDto getJobStatus(String jobId, String userId);
}
