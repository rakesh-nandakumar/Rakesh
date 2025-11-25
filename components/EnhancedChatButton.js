/**
 * AI Chat Assistant with Server-Side RAG
 * Updated: 2025-11-14 - New Supabase-based RAG system
 *
 * Features:
 * - Server-side RAG context retrieval from Supabase
 * - Admin-configurable manifest via /admin/rag
 * - Real-time context updates without redeploy
 * - Fetches API key from server automatically
 * - Token-efficient prompts
 * - Conversational interface with Google Gemini integration
 * - localStorage caching and simple settings panel
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  RefreshCw,
  Settings,
  Info,
} from "react-feather";
import "../styles/ChatButton.css";

const EnhancedChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && isInitialized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isInitialized]);

  // Initialize RAG system (try to fetch API key from server)
  const initializeRAG = async (manualKey) => {
    if (isInitializing) return;
    setIsInitializing(true);
    setError(null);

    try {
      // Get API key from server
      let key = manualKey;

      if (!key) {
        const resp = await fetch("/api/gemini-key");
        if (resp.ok) {
          const data = await resp.json();
          key = data.apiKey || "";
        }
      }

      if (!key) {
        setError(
          "API key not configured. Please set GEMINI_API_KEY in your environment variables."
        );
        setIsInitializing(false);
        return;
      }

      setApiKey(key);
      setIsInitialized(true);

      // Welcome message
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm Rakesh's AI assistant. I can help you learn about his background, experience, projects, skills, and services. What would you like to know?",
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error("Failed to initialize RAG:", err);
      setError(err?.message || "Initialization failed");
    } finally {
      setIsInitializing(false);
    }
  };

  // Try auto-initialize on mount
  useEffect(() => {
    initializeRAG().catch((e) =>
      console.error("[EnhancedChatButton] initialization error", e)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setError(null);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage, timestamp: Date.now() },
    ]);

    if (!isInitialized || !apiKey) {
      setError("AI system not initialized. Open Settings to configure.");
      return;
    }

    setIsLoading(true);
    try {
      // Get RAG context from server
      const ragResponse = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage, maxTokens: 2000 }),
      });

      if (!ragResponse.ok) {
        throw new Error("Failed to retrieve context");
      }

      const { context } = await ragResponse.json();

      // Send to Gemini with context (with retry and improved error reporting)
      let chatData = null;
      const maxAttempts = 2;
      let lastError = null;
      const payload = {
        message: userMessage,
        context,
        conversationHistory: messages
          .filter((m) => m.role !== "system")
          .slice(-4)
          .map((m) => ({ text: m.content, isBot: m.role === "assistant" })),
      };

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const chatResponse = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!chatResponse.ok) {
            // Try to parse error body for better message
            const text = await chatResponse.text();
            let parsed;
            try {
              parsed = JSON.parse(text);
            } catch (e) {
              parsed = null;
            }
            const serverMsg =
              parsed?.error ||
              parsed?.message ||
              text ||
              chatResponse.statusText;
            lastError = new Error(
              `Chat API error (status ${chatResponse.status}): ${serverMsg}`
            );
            // small delay before retry
            await new Promise((r) => setTimeout(r, 700 * attempt));
            continue;
          }

          // parse JSON response
          chatData = await chatResponse.json();
          break;
        } catch (e) {
          lastError = e;
          // transient network error, retry after delay
          await new Promise((r) => setTimeout(r, 700 * attempt));
        }
      }

      if (!chatData) {
        throw lastError || new Error("Chat request failed");
      }

      const answer = chatData.answer || chatData.response || "No response";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err?.message || "Chat failed");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${
            err?.message || "unknown"
          }`,
          isError: true,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) return;
    // reinitialize with provided key
    await initializeRAG(apiKey.trim());
    setShowSettings(false);
  };

  const handleClearCache = async () => {
    try {
      // Clear server-side RAG cache
      await fetch("/api/rag-cache-clear", { method: "POST" });
      setIsInitialized(false);
      setMessages([]);
      alert("Cache cleared! Please reinitialize the system.");
    } catch (error) {
      console.error("Failed to clear cache:", error);
      alert("Failed to clear cache. Please try again.");
    }
  };

  const handleFetchDetails = async (itemId, itemType) => {
    // This function is no longer needed with the new RAG system
    // Context is automatically fetched for each query
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Details are now automatically included in responses based on your questions.",
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-button"
        onClick={() => {
          setIsOpen((s) => !s);
          // auto-initialize when opening
          if (!isInitialized && !isInitializing) {
            initializeRAG().catch(() => {});
          }
        }}
        aria-label="Open AI Chat"
        title="Chat with AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div>
              <h3 style={{ color: "var(--color-primary)" }}>AI Assistant</h3>
              <p className="chat-subtitle">
                {isInitialized
                  ? "Ask me anything about Rakesh"
                  : isInitializing
                  ? "Initializing..."
                  : "Setup required"}
              </p>
            </div>

            <div className="chat-header-actions">
              <button
                onClick={handleClearCache}
                title="Clear Cache & Rebuild"
                className="icon-button"
              >
                <RefreshCw size={18} />
              </button>

              {/* <button
                onClick={() => setShowSettings((s) => !s)}
                title="Settings"
                className="icon-button"
              >
                <Settings size={18} />
              </button> */}
              {/* close button */}

              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="icon-button"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="chat-settings">
              <h4 color={{ color: "var(--color-primary)" }}>Settings</h4>
              <div className="setting-group">
                <label>Google Gemini API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key..."
                  className="api-key-input"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="rn-btn no-shadow btn-theme btn-small"
                >
                  Save & Initialize
                </button>
                <p className="help-text">
                  Get your API key from{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              {stats && (
                <div className="stats-group">
                  <h5>Usage Statistics</h5>
                  <div className="stats-grid">
                    <div>Knowledge chunks: {stats.knowledgeChunks ?? "-"}</div>
                    <div>Cached queries: {stats.cachedQueries ?? "-"}</div>
                    <div>Cache size KB: {stats.cacheSizeKB ?? "-"}</div>
                    <div>Other: {stats.totalSize ?? "-"}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="chat-messages">
            {!isInitialized && !isInitializing && (
              <div className="chat-welcome">
                <Info size={48} className="mx-auto" />
                <h3 style={{ color: "var(--color-primary)" }}>Welcome!</h3>
                <p>
                  To use the AI assistant, please set your Google Gemini API key
                  in Settings.
                </p>
                <button
                  onClick={() => setShowSettings(true)}
                  className="rn-btn no-shadow btn-theme btn-small"
                >
                  Configure Now
                </button>
              </div>
            )}

            {isInitializing && (
              <div className="chat-loading">
                <div className="spinner" />
                <p>Initializing AI system...</p>
                <p className="help-text">
                  This may take a few moments on first load
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`message message-${message.role}`}>
                <div className="message-content">
                  <p style={{ whiteSpace: "pre-wrap" }}>{message.content}</p>
                  {/* show time */}
                  <div
                    className="message-timestamp"
                    style={{
                      fontSize: "0.6em",
                      color: "#888",
                      marginTop: "4px",
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message message-assistant">
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {error && <div className="chat-error">⚠️ {error}</div>}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isInitialized ? "Ask me anything..." : "Configure API key first"
              }
              disabled={!isInitialized || isLoading || isInitializing}
              rows={1}
              className="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!isInitialized || isLoading || !inputValue.trim()}
              className="send-button"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedChatButton;
