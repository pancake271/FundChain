import axios from "axios";

const API_URL = "https://deepseek-v3.p.rapidapi.com/chat";
const API_KEY = "e85cc32515mshab46505b541dccap1c4714jsnf06c5293a40b"; // ⚠️ Replace with your API Key

export const fetchChatResponse = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "deepseek-v3.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.messages[0]?.content || "No response from DeepSeek.";
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return "Error processing request.";
  }
};
