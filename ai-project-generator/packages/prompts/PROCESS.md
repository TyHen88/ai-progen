# PROCESS.md — packages/prompts

## Purpose & Process Specification
System AI prompt definitions, versioning, and prompt engineering template assets.

## Pipeline Flow
1. Load base domain prompt templates (Shopping, CRM, ERP, Blog, SaaS).
2. Inject user input parameters & stack preferences.
3. Pass formatted prompt string to AiProviderFactory.
