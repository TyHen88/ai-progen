package com.projectgenerator.worker.provider;

public interface AiProvider {

    String getProviderName();

    String generateText(String prompt, double temperature);

    String generateCode(String prompt, String language);
}
