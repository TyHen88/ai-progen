# PROCESS.md — packages/ai-provider (AI Provider Abstraction Process)

This document specifies the process for the **Multi-Provider AI Abstraction Package**.

---

## 📌 Multi-Provider AI Process Pipeline

```text
[ Generator Service Request ]
               │
               ▼
     AiProviderFactory.getProvider(providerName)
               │
      ┌────────┼────────┬────────┐
      ▼        ▼        ▼        ▼
   Gemini   OpenAI  Anthropic DeepSeek
      │        │        │        │
      └────────┴───┬────┴────────┘
                   ▼
     Standardized Text / Code Output
```

---

## 🛠️ Supported AI Providers
1. **Google Gemini**: Gemini 1.5 Pro & Flash.
2. **OpenAI**: GPT-4o & GPT-4o-mini.
3. **Anthropic**: Claude 3.5 Sonnet.
4. **DeepSeek**: DeepSeek V3 & R1.
5. **OpenRouter / Ollama**: Open router API & local models.
