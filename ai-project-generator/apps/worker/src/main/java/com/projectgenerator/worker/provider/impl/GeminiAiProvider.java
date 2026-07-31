package com.projectgenerator.worker.provider.impl;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component("gemini")
public class GeminiAiProvider extends AbstractRestAiProvider {

    private static final String API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

    @Value("${providers.gemini.api-key:}")
    private String apiKey;

    @Value("${providers.gemini.model:gemini-1.5-pro}")
    private String model;

    @Value("${ai.max-tokens:4096}")
    private int maxOutputTokens;

    @Value("${ai.timeout:30000}")
    private int timeoutMillis;

    @Override
    protected String apiKey() {
        return apiKey;
    }

    @Override
    protected int timeoutMillis() {
        return timeoutMillis;
    }

    @Override
    public String getProviderName() {
        return "gemini";
    }

    @Override
    public String generateText(String prompt, double temperature) {
        log.info("Generating text via Gemini [model={}] for prompt length={}", model, prompt.length());
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of(
                        "temperature", temperature,
                        "maxOutputTokens", maxOutputTokens
                )
        );

        return callApi(
                () -> restClient.post()
                        .uri(API_BASE_URL + "/{model}:generateContent?key={key}", model, apiKey)
                        .body(requestBody)
                        .retrieve()
                        .body(JsonNode.class),
                this::extractText
        );
    }

    @Override
    public String generateCode(String prompt, String language) {
        log.info("Generating {} code via Gemini [model={}]", language, model);
        String codePrompt = "Generate " + (language == null || language.isBlank() ? "application" : language)
                + " code for the following requirement. Respond with code only, no explanation, no markdown fences.\n\n"
                + prompt;
        return generateText(codePrompt, 0.3);
    }

    private String extractText(JsonNode response) {
        JsonNode textNode = response.path("candidates").path(0).path("content").path("parts").path(0).path("text");
        return textNode.isMissingNode() ? null : textNode.asText();
    }
}
