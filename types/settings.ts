export type AIProvider = "OpenAI" | "Anthropic" | "DeepSeek" | "Gemini";

export interface SystemSettings {
  apiKey: string;
  secretKey: string;
  passphrase: string;
  aiProvider: AIProvider;
  aiApiKey: string;
}
