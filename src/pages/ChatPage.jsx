import React, { useState } from "react";
import ChatSidebar from "../Components/ChatSidebar/ChatSidebar";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  CHAT_COMPLETIONS_ENDPOINT,
  App_Base_URL,
} from "../constants/apiRoutes";

const offlineReplies = [
  "I’m answering from the offline knowledge pack, so details may be limited.",
  "Here’s a mock insight generated while the chat API is offline.",
  "Static mode is active, but you can still explore key workflows.",
];

const buildOfflineResponse = (prompt) => {
  const template =
    offlineReplies[Math.floor(Math.random() * offlineReplies.length)];
  return `${template}\n\n(You asked: "${prompt}")`;
};

const ChatPage = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [chatData, setChatData] = useState({});
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const isApiKeyConfigured = Boolean(OPENROUTER_API_KEY);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };

    const currentMessages = chatData[currentSessionId] || [];
    const updatedMessages = [...currentMessages, userMessage];

    setChatData((prev) => ({
      ...prev,
      [currentSessionId]: updatedMessages,
    }));

    setUserInput("");
    setLoading(true);

    try {
      if (!isApiKeyConfigured) {
        const offlineMessage = {
          sender: "bot",
          text: buildOfflineResponse(userInput),
        };
        setChatData((prev) => ({
          ...prev,
          [currentSessionId]: [...updatedMessages, offlineMessage],
        }));
        return;
      }

      const res = await axios.post(
        CHAT_COMPLETIONS_ENDPOINT,
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": App_Base_URL,
            "X-Title": "demo app",
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = res.data.choices[0].message.content;
      const botMessage = { sender: "bot", text: botReply };

      setChatData((prev) => ({
        ...prev,
        [currentSessionId]: [...updatedMessages, botMessage],
      }));

      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId && !s.title
            ? { ...s, title: userInput.slice(0, 20) }
            : s
        )
      );
    } catch (error) {
      console.error("Chat API error:", error);
      const fallbackText =
        error?.response?.data?.choices?.[0]?.message?.content ||
        buildOfflineResponse(userInput);
      setChatData((prev) => ({
        ...prev,
        [currentSessionId]: [
          ...updatedMessages,
          { sender: "bot", text: fallbackText },
        ],
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    const newId = uuidv4();
    setSessions((prev) => [...prev, { id: newId, title: "" }]);
    setCurrentSessionId(newId);
    setChatData((prev) => ({
      ...prev,
      [newId]: [],
    }));
  };

  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  const currentMessages = chatData[currentSessionId] || [];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, borderRight: "1px solid #ddd", p: 2 }}>
        <ChatSidebar
          sessions={sessions}
          currentId={currentSessionId}
          onSelect={handleSelectSession}
          onNewChat={handleNewChat}
        />
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1, p: 4, maxWidth: 900, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          AI Assistant
        </Typography>

        {!isApiKeyConfigured && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No OpenRouter API key detected. We’ll answer using offline mock data
            until you add <code>VITE_OPENROUTER_API_KEY</code> to your .env file.
          </Alert>
        )}

        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            minHeight: 300,
            mb: 2,
            backgroundColor: "#f9f9f9",
            overflowY: "auto",
          }}
        >
          {currentMessages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "75%",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            </Box>
          ))}
          {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={loading || !userInput.trim()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
