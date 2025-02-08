const API_URL = "https://integrate.api.nvidia.com/v1"; 
const API_KEY = "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"; 

export const fetchDeepSeekResponse = async (message, history = []) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        user_message: message,
        context: history.map((msg) => ({
          role: msg.sender === "bot" ? "assistant" : "user",
          text: msg.text,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply?.text || "No response from AI.";
  } catch (error) {
    console.error("Error fetching DeepSeek response:", error);
    return "Sorry, I couldn't process that request. Try again later.";
  }
};
