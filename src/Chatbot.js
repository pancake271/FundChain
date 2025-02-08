import React, { useState } from "react";
import { fetchChatResponse } from "./deepseekService"; // Import API handler
import "./Chatbot.css"; // Import CSS

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    const botResponse = await fetchChatResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);

    setLoading(false);
    setInput(""); // Clear input field
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>💬 Chat</button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbot-message bot">Typing...</div>}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
