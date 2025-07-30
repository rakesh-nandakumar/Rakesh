"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/ChatButton.css";

const ChatButton = () => {
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Rakesh's AI assistant. I can help you learn about his professional background, technical skills, projects, and experience. Feel free to ask me anything about his work or expertise!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages, // Send conversation history for context
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Rate limit exceeded. Please wait a moment before sending another message."
          );
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      let errorText =
        "I apologize, but I'm having trouble responding right now. Please try again in a moment.";

      if (error.message.includes("Rate limit")) {
        errorText = error.message;
      } else if (error.message.includes("Network")) {
        errorText = "Please check your internet connection and try again.";
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        isBot: true,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm Rakesh's AI assistant. I can help you learn about his professional background, technical skills, projects, and experience. Feel free to ask me anything about his work or expertise!",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="chat-btn" onClick={toggleChat}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </div>
      </div>

      {/* Chat Modal/Widget - shown when isOpen is true */}
      {isOpen && (
        <div
          className="modal fade show light-theme"
          tabIndex="-1"
          style={{
            display: "block",
            paddingRight: "15px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(2px)",
          }}
          aria-modal="true"
          role="dialog"
          onClick={toggleChat}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg mobile-chat-modal"
            role="document"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "80vh",
              height: isMobile ? "calc(100vh - 4rem)" : "600px",
              maxWidth: isMobile ? "calc(100vw - 2rem)" : "500px",
              margin: "auto",
            }}
          >
            <div
              className="modal-content"
              style={{
                background: "linear-gradient(145deg, #e2e8ec, #ffffff)",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: isMobile ? "15px 20px" : "10px 20px",
              }}
            >
              <div
                className="modal-header chat-header-responsive"
                style={{
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #dee2e6",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                  gap: "8px",
                  padding: isMobile ? "16px 20px" : "12px 16px",
                }}
              >
                {/* Avatar */}
                <div
                  className="chat-avatar"
                  style={{
                    background: "var(--color-primary)",
                    borderRadius: "50%",
                    width: isMobile ? "44px" : "40px",
                    height: isMobile ? "44px" : "40px",
                    minWidth: isMobile ? "44px" : "40px",
                    minHeight: isMobile ? "44px" : "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: "0",
                    objectFit: "cover",
                    border: "3px solid white",
                    boxShadow: "var(--shadow-white-3)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    style={{
                      width: isMobile ? "20px" : "18px",
                      height: isMobile ? "20px" : "18px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                </div>

                {/* Title and Status */}
                <div
                  className="chat-title-section"
                  style={{ flex: "1", minWidth: "0" }}
                >
                  <h3
                    className="chat-title"
                    style={{
                      color: "#333",
                      fontSize: isMobile ? "18px" : "16px",
                      fontWeight: "600",
                      margin: "0",
                      lineHeight: "1.2",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Rakesh&apos;s AI Assistant
                  </h3>
                  <span
                    className="chat-status"
                    style={{
                      color: "#666",
                      fontSize: isMobile ? "14px" : "12px",
                      lineHeight: "1",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#10b981",
                        borderRadius: "50%",
                        display: "inline-block",
                        flexShrink: "0",
                      }}
                    ></span>
                    Ready to Help
                  </span>
                </div>

                {/* Action Buttons */}
                <div
                  className="chat-header-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: "0",
                  }}
                >
                  <button
                    type="button"
                    className="action-btn-common chat-size"
                    onClick={clearConversation}
                    aria-label="Clear conversation"
                    title="Clear conversation"
                    style={{
                      width: isMobile ? "36px" : "32px",
                      height: isMobile ? "36px" : "32px",
                      minWidth: isMobile ? "36px" : "32px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={isMobile ? "20" : "18"}
                      height={isMobile ? "20" : "18"}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="action-btn-common chat-size"
                    onClick={toggleChat}
                    aria-label="Close"
                    title="Close chat"
                    style={{
                      width: isMobile ? "36px" : "32px",
                      height: isMobile ? "36px" : "32px",
                      minWidth: isMobile ? "36px" : "32px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={isMobile ? "20" : "18"}
                      height={isMobile ? "20" : "18"}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="modal-body"
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "transparent",
                  minHeight: "0",
                  overflow: "hidden",
                }}
              >
                <div
                  className="chat-messages"
                  style={{
                    flex: "1",
                    overflowY: "auto",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    padding: isMobile ? "18px" : "15px",
                    border: "1px solid var(--color-lightn)",
                  }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${
                        message.isBot ? "bot-message" : "user-message"
                      } ${message.isError ? "error-message" : ""}`}
                    >
                      <div className="message-content">
                        <p>{message.text}</p>
                        <span className="message-time">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="chat-message bot-message">
                      <div className="message-content typing">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div
                  className="chat-input-container"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "12px",
                    border: "1px solid var(--color-lightn)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: "0",
                    marginTop: "auto",
                    padding: isMobile ? "10px 12px" : "6px 10px",
                  }}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isMobile
                        ? "Ask about Rakesh..."
                        : "Ask me about Rakesh's experience, skills, or projects..."
                    }
                    className="chat-input"
                    disabled={isLoading}
                    aria-label="Type your message"
                    style={{
                      flex: "1",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      padding: isMobile ? "10px 12px" : "6px 8px",
                      fontSize: isMobile ? "16px" : "14px",
                      color: "#333",
                      minHeight: isMobile ? "24px" : "20px",
                    }}
                  />
                  <button
                    className="send-btn"
                    onClick={sendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: isMobile ? "10px 12px" : "6px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: isLoading || !inputValue.trim() ? "0.5" : "1",
                      transition: "opacity 0.2s",
                      minWidth: isMobile ? "40px" : "32px",
                      height: isMobile ? "40px" : "32px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                      style={{
                        width: isMobile ? "18px" : "16px",
                        height: isMobile ? "18px" : "16px",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;
