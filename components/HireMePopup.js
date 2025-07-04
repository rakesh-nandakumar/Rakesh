"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle, Mail, Phone } from "react-feather";
import { useTheme } from "@/contexts/ThemeContext";

const HireMePopup = ({ showOnMount = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (showOnMount) {
      // Show popup after a short delay when component mounts
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [showOnMount]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleContactClick = (type) => {
    if (type === "email") {
      window.location.href = "mailto:your-email@example.com";
    } else if (type === "phone") {
      window.location.href = "tel:+1234567890";
    } else if (type === "contact") {
      window.location.href = "/contact";
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`hire-me-popup ${isClosing ? "closing" : ""}`}
      role="dialog"
      aria-labelledby="hire-me-title"
      aria-modal="true"
    >
      <div className="hire-me-popup-content">
        <button
          className="hire-me-close"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <X size={16} />
        </button>

        <div className="hire-me-header">
          <div className="hire-me-avatar">
            <img src="/avatar.png" alt="Rakesh Nandakumar" />
          </div>
          <div className="hire-me-greeting">
            <h3 id="hire-me-title">👋 Hi there!</h3>
            <p>Ready to work together?</p>
          </div>
        </div>

        <div className="hire-me-body">
          <p className="hire-me-message">
            I'm available for freelance projects and full-time opportunities.
            Let's discuss how I can help bring your ideas to life!
          </p>

          <div className="hire-me-actions">
            <button
              className="hire-me-btn primary"
              onClick={() => handleContactClick("contact")}
            >
              <MessageCircle size={16} />
              Let's Chat
            </button>
            <button
              className="hire-me-btn secondary"
              onClick={() => handleContactClick("email")}
            >
              <Mail size={16} />
              Email Me
            </button>
          </div>
        </div>

        <div className="hire-me-footer">
          <span className="hire-me-badge">Available for hire</span>
        </div>
      </div>

      <style jsx>{`
        .hire-me-popup {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%) translateX(100%);
          z-index: 1000;
          animation: slideIn 0.4s ease-out forwards;
          max-width: 320px;
          width: 90%;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
        }

        .hire-me-popup.closing {
          animation: slideOut 0.3s ease-in forwards;
        }

        .hire-me-popup-content {
          background: ${theme === "light" ? "#ffffff" : "#1a1a1a"};
          border-radius: 16px;
          border: 1px solid ${theme === "light" ? "#e5e7eb" : "#374151"};
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
        }

        .hire-me-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: ${theme === "light" ? "#f3f4f6" : "#374151"};
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
          color: ${theme === "light" ? "#6b7280" : "#d1d5db"};
        }

        .hire-me-close:hover {
          background: ${theme === "light" ? "#e5e7eb" : "#4b5563"};
          color: ${theme === "light" ? "#374151" : "#f3f4f6"};
          transform: scale(1.1);
        }

        .hire-me-header {
          padding: 24px 24px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%);
          color: white;
          position: relative;
        }

        .hire-me-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            repeat;
          opacity: 0.3;
        }

        .hire-me-avatar {
          position: relative;
          z-index: 2;
        }

        .hire-me-avatar img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.3);
          object-fit: cover;
        }

        .hire-me-greeting {
          position: relative;
          z-index: 2;
        }

        .hire-me-greeting h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 700;
          color: white;
        }

        .hire-me-greeting p {
          margin: 0;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .hire-me-body {
          padding: 20px 24px;
        }

        .hire-me-message {
          font-size: 14px;
          line-height: 1.6;
          color: ${theme === "light" ? "#4b5563" : "#d1d5db"};
          margin: 0 0 20px 0;
        }

        .hire-me-actions {
          display: flex;
          gap: 8px;
          flex-direction: column;
        }

        .hire-me-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          border: none;
          outline: none;
        }

        .hire-me-btn.primary {
          background: var(--color-primary, #ff6b35);
          color: white;
        }

        .hire-me-btn.primary:hover {
          background: #e55a2e;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
        }

        .hire-me-btn.secondary {
          background: ${theme === "light" ? "#f3f4f6" : "#374151"};
          color: ${theme === "light" ? "#374151" : "#f3f4f6"};
          border: 1px solid ${theme === "light" ? "#e5e7eb" : "#4b5563"};
        }

        .hire-me-btn.secondary:hover {
          background: ${theme === "light" ? "#e5e7eb" : "#4b5563"};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .hire-me-footer {
          padding: 16px 24px;
          background: ${theme === "light" ? "#f9fafb" : "#111827"};
          border-top: 1px solid ${theme === "light" ? "#e5e7eb" : "#374151"};
          text-align: center;
        }

        .hire-me-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #10b981;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hire-me-badge::before {
          content: "";
          width: 6px;
          height: 6px;
          background: #34d399;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50%) translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
          to {
            transform: translateY(-50%) translateX(100%);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .hire-me-popup {
            right: 16px;
            top: auto;
            bottom: 20px;
            transform: translateX(100%);
            max-width: 280px;
          }

          .hire-me-popup.closing {
            animation: slideOutMobile 0.3s ease-in forwards;
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        }

        @keyframes slideOutMobile {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hire-me-popup {
            animation: none;
          }
          .hire-me-popup.closing {
            animation: none;
          }
          .hire-me-btn {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HireMePopup;
