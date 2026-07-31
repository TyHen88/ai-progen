package com.projectgenerator.worker.provider.impl;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component("anthropic")
public class AnthropicAiProvider extends AbstractRestAiProvider {

    private static final String API_URL = "https://api.anthropic.com/v1/messages";
    private static final String ANTHROPIC_VERSION = "2023-06-01";

    @Value("${providers.anthropic.api-key:}")
    private String apiKey;

    @Value("${providers.anthropic.model:claude-3-5-sonnet-20241022}")
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
        return "anthropic";
    }

    @Override
    public String generateText(String prompt, double temperature) {
        log.info("Generating text via Anthropic [model={}] for prompt length={}", model, prompt.length());
        Map<String, Object> requestBody = Map.of(
                "model", model,
                "max_tokens", maxTokens,
                "temperature", temperature,
                "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        return callApi(
                () -> restClient.post()
                        .uri(API_URL)
                        .header("x-api-key", apiKey)
                        .header("anthropic-version", ANTHROPIC_VERSION)
                        .body(requestBody)
                        .retrieve()
                        .body(JsonNode.class),
                this::extractText
        );
    }

    @Override
    public String generateCode(String prompt, String language) {
        log.info("Generating {} code via Anthropic [model={}]", language, model);
        String codePrompt = "Generate " + (language == null || language.isBlank() ? "application" : language)
                + " code for the following requirement. Respond with code only, no explanation, no markdown fences.\n\n"
                + prompt;
        return generateText(codePrompt, 0.3);
    }

    private String extractText(JsonNode response) {
        JsonNode textNode = response.path("content").path(0).path("text");
        return textNode.isMissingNode() ? null : textNode.asText();
    }
}
