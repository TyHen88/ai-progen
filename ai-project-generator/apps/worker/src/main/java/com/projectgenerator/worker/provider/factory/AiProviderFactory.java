package com.projectgenerator.worker.provider.factory;

import com.projectgenerator.worker.provider.AiProvider;
import com.projectgenerator.worker.provider.AiProviderException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AiProviderFactory {

    private final Map<String, AiProvider> providers;

    @Value("${ai.default-provider:gemini}")
    private String defaultProviderName;

    public AiProvider getProvider(String providerName) {
        String name = (providerName != null && !providerName.isBlank())
                ? providerName.toLowerCase()
                : defaultProviderName.toLowerCase();

        AiProvider provider = providers.get(name);
        if (provider == null) {
            throw new AiProviderException("AI Provider not supported: " + name);
        }
        return provider;
    }

    public AiProvider getDefaultProvider() {
        return getProvider(defaultProviderName);
    }
}
