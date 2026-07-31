package com.projectgenerator.worker.provider.impl;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component("openai")
public class OpenAiProvider extends AbstractRestAiProvider {

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    @Value("${providers.openai.api-key:}")
    private String apiKey;

    @Value("${providers.openai.model:gpt-4o}")
    private String model;

    @Value("${ai.max-tokens:4096}")
    private int maxTokens;

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
        return "openai";
    }

    @Override
    public String generateText(String prompt, double temperature) {
        log.info("Generating text via OpenAI [model={}] for prompt length={}", model, prompt.length());
        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(Map.of("role", "user", "content", prompt)),
                "temperature", temperature,
                "max_tokens", maxTokens
        );

        return callApi(
                () -> restClient.post()
                        .uri(API_URL)
                        .header("Authorization", "Bearer " + apiKey)
                        .body(requestBody)
                        .retrieve()
                        .body(JsonNode.class),
                this::extractText
        );
    }

    @Override
    public String generateCode(String prompt, String language) {
        log.info("Generating {} code via OpenAI [model={}]", language, model);
        String codePrompt = "Generate " + (language == null || language.isBlank() ? "application" : language)
                + " code for the following requirement. Respond with code only, no explanation, no markdown fences.\n\n"
                + prompt;
        return generateText(codePrompt, 0.3);
    }

    private String extractText(JsonNode response) {
        JsonNode textNode = response.path("choices").path(0).path("message").path("content");
        return textNode.isMissingNode() ? null : textNode.asText();
    }
}
