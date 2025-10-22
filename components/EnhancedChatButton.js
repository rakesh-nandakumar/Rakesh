/**
 * Enhanced AI Chat Component using Client-Side RAG
 *
 * Features:
 * - Client-side semantic search and retrieval
 * - Token-efficient prompts
 * - OpenAI API integration
 * - localStorage caching
 * - "More Details" expansion
 * - Cost monitoring
 */

"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Settings,
  RefreshCw,
  Info,
} from "react-feather";
import "../styles/ChatButton.css";

// Import the RAG library (will be loaded dynamically)
let ClientRAG = null;

const EnhancedChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [ragInstance, setRagInstance] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load RAG library and initialize
  useEffect(() => {
    const loadRAG = async () => {
      try {
        // Dynamically import the RAG class
        const module = await import("@/lib/client-rag.js");
        ClientRAG = module.default || module;

        // Create instance
        const rag = new ClientRAG();

        // Check if API key exists
        const existingKey = rag.getApiKey();
        if (existingKey) {
          setApiKey(existingKey);
        }

        setRagInstance(rag);
      } catch (err) {
        console.error("Failed to load RAG:", err);
        setError("Failed to load AI system. Please refresh the page.");
      }
    };

    loadRAG();
  }, []);

  // Initialize RAG system
  const initializeRAG = async () => {
    if (!ragInstance) return;

    setIsInitializing(true);
    setError(null);

    try {
      await ragInstance.initialize();
      setIsInitialized(true);

      // Show welcome message
      setMessages([
        {
          role: "assistant",
          content: `Hi! I'm Rakesh's AI assistant. I can help you learn about his background, experience, projects, skills, and services. What would you like to know?`,
          timestamp: Date.now(),
        },
      ]);

      // Get stats
      updateStats();
    } catch (err) {
      console.error("Initialization error:", err);
      setError(`Failed to initialize: ${err.message}`);
    } finally {
      setIsInitializing(false);
    }
  };

  // Update statistics
  const updateStats = () => {
    if (!ragInstance) return;

    const stats = ragInstance.getUsageStats();
    setStats(stats);
  };

  // Handle API key save
  const handleSaveApiKey = () => {
    if (!ragInstance || !apiKey.trim()) return;

    ragInstance.setApiKey(apiKey.trim());
    setShowSettings(false);

    // Initialize if not already done
    if (!isInitialized) {
      initializeRAG();
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isInitialized) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setError(null);

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp: Date.now(),
      },
    ]);

    setIsLoading(true);

    try {
      // Call RAG system
      const result = await ragInstance.chat(userMessage);

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.answer,
          retrievedItems: result.retrievedItems,
          usage: result.usage,
          timestamp: Date.now(),
        },
      ]);

      // Update stats
      updateStats();
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
          isError: true,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fetching more details
  const handleFetchDetails = async (itemId, itemType) => {
    setIsLoading(true);
    try {
      const details = await ragInstance.fetchFullDetails(itemId, itemType);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Here are the full details:\n\n${JSON.stringify(
            details,
            null,
            2
          )}`,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setError(`Failed to fetch details: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clearing cache
  const handleClearCache = () => {
    if (!ragInstance) return;

    ragInstance.clearCache();
    ragInstance.clearEmbeddingsCache();
    setIsInitialized(false);
    setMessages([]);
    updateStats();
    alert("Cache cleared! Please reinitialize the system.");
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && isInitialized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isInitialized]);

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
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
              <h3>AI Assistant</h3>
              <p className="chat-subtitle">
                {isInitialized
                  ? "Ask me anything about Rakesh"
                  : "Setup required"}
              </p>
            </div>
            <div className="chat-header-actions">
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Settings"
                className="icon-button"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={handleClearCache}
                title="Clear Cache"
                className="icon-button"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="chat-settings">
              <h4>Settings</h4>
              <div className="setting-group">
                <label>OpenAI API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="api-key-input"
                />
                <button onClick={handleSaveApiKey} className="btn-primary">
                  Save & Initialize
                </button>
                <p className="help-text">
                  Get your API key from{" "}
                  <a
                    href="https://platform.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenAI Platform
                  </a>
                </p>
              </div>

              {stats && (
                <div className="stats-group">
                  <h5>Usage Statistics</h5>
                  <div className="stats-grid">
                    <div>Cached chats: {stats.cacheCount}</div>
                    <div>Embeddings: {stats.embeddingsCount}</div>
                    <div>Cache size: {stats.cacheSize}</div>
                    <div>Total: {stats.totalSize}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="chat-messages">
            {!isInitialized && !isInitializing && (
              <div className="chat-welcome">
                <Info size={48} />
                <h3>Welcome!</h3>
                <p>
                  To use the AI assistant, please set your OpenAI API key in
                  Settings.
                </p>
                <button
                  onClick={() => setShowSettings(true)}
                  className="btn-primary"
                >
                  Configure Now
                </button>
              </div>
            )}

            {isInitializing && (
              <div className="chat-loading">
                <div className="spinner"></div>
                <p>Initializing AI system...</p>
                <p className="help-text">
                  This may take a few moments on first load
                </p>
              </div>
            )}

            {isInitialized &&
              messages.map((message, index) => (
                <div key={index} className={`message message-${message.role}`}>
                  <div className="message-content">
                    <p style={{ whiteSpace: "pre-wrap" }}>{message.content}</p>

                    {message.retrievedItems &&
                      message.retrievedItems.length > 0 && (
                        <div className="retrieved-items">
                          <details>
                            <summary>
                              📚 Sources ({message.retrievedItems.length})
                            </summary>
                            <ul>
                              {message.retrievedItems.map((item, idx) => (
                                <li key={idx}>
                                  <strong>[{item.type.toUpperCase()}]</strong>{" "}
                                  {item.id}
                                  <span className="similarity-score">
                                    {(item.score * 100).toFixed(0)}% match
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleFetchDetails(item.id, item.type)
                                    }
                                    className="btn-link"
                                  >
                                    View Full Details
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}

                    {message.usage && (
                      <div className="message-meta">
                        <small>
                          Tokens: {message.usage.total_tokens} | Cost: ~$
                          {(
                            (message.usage.total_tokens / 1000) *
                            0.0005
                          ).toFixed(4)}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {isLoading && (
              <div className="message message-assistant">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
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
              onKeyPress={handleKeyPress}
              placeholder={
                isInitialized ? "Ask me anything..." : "Configure API key first"
              }
              disabled={!isInitialized || isLoading}
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

      <style jsx>{`
        .chat-button {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .chat-window {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 420px;
          max-width: calc(100vw - 48px);
          height: 600px;
          max-height: calc(100vh - 120px);
          background: var(--color-bg);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 999;
          overflow: hidden;
        }

        .chat-header {
          padding: 16px 20px;
          background: var(--color-primary);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .chat-subtitle {
          margin: 4px 0 0 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .chat-header-actions {
          display: flex;
          gap: 8px;
        }

        .icon-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .icon-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chat-settings {
          padding: 16px 20px;
          background: var(--color-bg-alt);
          border-bottom: 1px solid var(--color-border);
        }

        .chat-settings h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
        }

        .setting-group {
          margin-bottom: 16px;
        }

        .setting-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .api-key-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 8px;
          background: var(--color-bg);
          color: var(--color-text);
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: opacity 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .help-text {
          margin: 8px 0 0 0;
          font-size: 11px;
          opacity: 0.7;
        }

        .help-text a {
          color: var(--color-primary);
          text-decoration: none;
        }

        .stats-group {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-border);
        }

        .stats-group h5 {
          margin: 0 0 8px 0;
          font-size: 12px;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 11px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-welcome {
          text-align: center;
          padding: 40px 20px;
          color: var(--color-text-muted);
        }

        .chat-welcome svg {
          opacity: 0.5;
          margin-bottom: 16px;
        }

        .chat-welcome h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }

        .chat-welcome p {
          margin: 0 0 20px 0;
          font-size: 14px;
        }

        .chat-loading {
          text-align: center;
          padding: 40px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 16px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .message {
          display: flex;
          gap: 8px;
        }

        .message-user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
        }

        .message-user .message-content {
          background: var(--color-primary);
          color: white;
        }

        .message-assistant .message-content {
          background: var(--color-bg-alt);
          color: var(--color-text);
        }

        .retrieved-items {
          margin-top: 12px;
          font-size: 12px;
        }

        .retrieved-items summary {
          cursor: pointer;
          padding: 6px 0;
          font-weight: 500;
        }

        .retrieved-items ul {
          margin: 8px 0 0 0;
          padding: 0 0 0 20px;
          list-style: none;
        }

        .retrieved-items li {
          padding: 4px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .similarity-score {
          color: var(--color-primary);
          font-weight: 500;
          font-size: 11px;
        }

        .btn-link {
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          font-size: 11px;
          text-decoration: underline;
          padding: 0;
        }

        .message-meta {
          margin-top: 8px;
          opacity: 0.6;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: var(--color-text-muted);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-10px);
          }
        }

        .chat-error {
          background: #fee;
          color: #c00;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
        }

        .chat-input-container {
          padding: 16px;
          background: var(--color-bg);
          border-top: 1px solid var(--color-border);
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .chat-input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          font-size: 14px;
          resize: none;
          min-height: 40px;
          max-height: 120px;
          background: var(--color-bg);
          color: var(--color-text);
        }

        .send-button {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--color-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }

        .send-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .send-button:not(:disabled):hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .chat-window {
            bottom: 80px;
            right: 16px;
            left: 16px;
            width: auto;
          }

          .chat-button {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedChatButton;
