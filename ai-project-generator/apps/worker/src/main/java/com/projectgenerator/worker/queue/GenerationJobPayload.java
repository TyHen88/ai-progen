package com.projectgenerator.worker.queue;

import java.util.Map;

/** Matches the fields apps/api's GeneratorServiceImpl XADDs to the generation-jobs stream. */
public record GenerationJobPayload(
        String jobId,
        String userId,
        String prompt,
        String projectType,
        String frontend,
        String backend,
        String database
) {

    public static GenerationJobPayload fromFields(Map<String, String> fields) {
        return new GenerationJobPayload(
                fields.get("jobId"),
                fields.get("userId"),
                fields.get("prompt"),
                fields.get("projectType"),
                emptyToNull(fields.get("frontend")),
                emptyToNull(fields.get("backend")),
                emptyToNull(fields.get("database"))
        );
    }

    private static String emptyToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }
}
