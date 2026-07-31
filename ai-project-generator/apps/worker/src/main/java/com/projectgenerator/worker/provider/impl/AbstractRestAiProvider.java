package com.projectgenerator.worker.provider.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.projectgenerator.worker.provider.AiProvider;
import com.projectgenerator.worker.provider.AiProviderException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.function.Function;
import java.util.function.Supplier;

/**
 * Shared HTTP-call scaffolding for the three AiProvider implementations — construction with a
 * timeout, the "is a key even configured" guard, and error wrapping are identical across
 * Gemini/OpenAI/Anthropic; only the request shape, auth header, and response parsing differ,
 * which each subclass still owns directly.
 */
@Slf4j
public abstract class AbstractRestAiProvider implements AiProvider {

    protected RestClient restClient;

    protected abstract String apiKey();

    protected abstract int timeoutMillis();

    @PostConstruct
    private void init() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(timeoutMillis());
        requestFactory.setReadTimeout(timeoutMillis());
        this.restClient = RestClient.builder().requestFactory(requestFactory).build();
    }

    /**
     * Runs apiCall, guarded by an api-key check and RestClientException wrapping, then extracts
     * the generated text from the vendor-specific JSON shape via textExtractor.
     */
    protected final String callApi(Supplier<JsonNode> apiCall, Function<JsonNode, String> textExtractor) {
        if (apiKey() == null || apiKey().isBlank()) {
            throw new AiProviderException(getProviderName() + " API key is not configured (set "
                    + getProviderName().toUpperCase() + "_API_KEY)");
        }

        try {
            JsonNode response = apiCall.get();
            String text = (response == null) ? null : textExtractor.apply(response);
            if (text == null) {
                log.warn("Unexpected {} response shape: {}", getProviderName(), response);
                throw new AiProviderException(getProviderName() + " response had no generated content");
            }
            return text;
        } catch (RestClientException ex) {
            log.error("{} API call failed", getProviderName(), ex);
            throw new AiProviderException(getProviderName() + " AI generation failed: " + ex.getMessage(), ex);
        }
    }
}
