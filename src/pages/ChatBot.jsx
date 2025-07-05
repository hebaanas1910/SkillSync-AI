import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your AI Career Assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Error fetching response. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full shadow-xl"
      >
        🤖 Chat
      </button>

      {open && (
        <div className="mt-2 w-80 h-[400px] rounded-xl shadow-2xl backdrop-blur-md bg-gradient-to-br from-purple-900/70 to-black/80 border border-purple-500 flex flex-col overflow-hidden animate-fade-in">
          {/* Chat Area */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2 custom-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-purple-600 self-end text-white"
                    : "bg-gray-700 self-start text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex border-t border-purple-600">
            <input
              className="flex-1 bg-gray-800 p-2 text-white outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 px-3 text-white hover:bg-purple-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
