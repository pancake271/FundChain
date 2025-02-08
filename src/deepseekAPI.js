const API_URL = "https://api.deepseek.com/v1/chat/completions"; // DeepSeek API Endpoint
const API_KEY = "sk-3be3d152a9bc47f582ce2def83fc9e43"; // Replace with your actual API key

export const fetchDeepSeekResponse = async (message, history = []) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          ...history.map((msg) => ({
            role: msg.sender === "bot" ? "assistant" : "user",
            content: msg.text,
          })),
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "No response from AI.";
  } catch (error) {
    console.error("Error fetching DeepSeek response:", error);
    return "Sorry, I couldn't process that request. Try again later.";
  }
};
