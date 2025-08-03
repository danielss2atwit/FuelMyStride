import Constants from 'expo-constants';


export async function callClaude(prompt) {
     const API_KEY = Constants.expoConfig.extra.claudeApiKey;
  try {
    const response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "x-api-key":  API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3.5",
        prompt,
        max_tokens_to_sample: 300,
        stop_sequences: ["\n\n"],
      }),
    });
    const data = await response.json();
    return data.completion;
  } catch (error) {
    console.error("Claude API error:", error);
    return null;
  }
}