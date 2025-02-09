import axios from "axios";

const API_URL = "https://deepseek-r1.p.rapidapi.com/";
const API_KEY = "020e238ed1msh7378254369d2f1bp1f904cjsna9b192265eed"; // Replace with your actual API key

export const fetchChatResponse = async (message) => {
  const data = {
    model: "deepseek-r1",
    messages: [{ role: "user", content: message }],
  };

  const headers = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "deepseek-r1.p.rapidapi.com",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
