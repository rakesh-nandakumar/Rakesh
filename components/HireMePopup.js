"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "react-feather";
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
    <>
      {/* Modal Backdrop */}
      <div className="hire-popup-backdrop" onClick={handleClose}></div>

      <div
        className={`hire-popup-modal hire-popup-fade hire-popup-show ${
          isClosing ? "hire-popup-closing" : ""
        }`}
        id="hireMeModal"
        tabIndex="-1"
        style={{ display: "block", paddingRight: "15px" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="hire-popup-dialog hire-popup-dialog-centered"
          role="document"
        >
          <div className="hire-popup-content">
            <div className="hire-popup-header">
              <button
                type="button"
                className="action-btn-common ms-auto"
                onClick={handleClose}
              >
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                </span>
              </button>
            </div>
            <div className="hire-popup-body">
              <div className="hire-popup-row hire-popup-align-center">
                <div className="hire-popup-col">
                  <div className="hire-popup-avatar-center">
                    <Image
                      src="/avatar.png"
                      alt="Rakesh Nandakumar"
                      width={80}
                      height={80}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid white",
                        boxShadow: "var(--shadow-white-3)",
                      }}
                    />
                  </div>
                </div>

                <div className="hire-popup-col">
                  <div className="hire-popup-text-content">
                    <h3
                      id="hire-me-title"
                      style={{ color: "var(--color-body-white)" }}
                    >
                      <span>Available for hire</span> Let's work together!
                    </h3>
                    <p className="hire-popup-description">
                      I'm available for freelance projects and full-time
                      opportunities. Let's discuss how I can help bring your
                      ideas to life!
                    </p>
                    <div className="hire-popup-button-group">
                      <button
                        className="hire-popup-btn hire-popup-btn-primary"
                        onClick={() => handleContactClick("contact")}
                      >
                        <span>LET'S CHAT</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Modal Backdrop */
        .hire-popup-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          backdrop-filter: blur(4px);
          z-index: 999;
          opacity: 0;
          animation: backdropFadeIn 0.3s ease forwards;
        }

        @keyframes backdropFadeIn {
          to {
            opacity: 1;
          }
        }

        .hire-popup-modal.hire-popup-fade.hire-popup-show {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%) translateX(100%);
          width: auto;
          height: auto;
          background-color: transparent;
          z-index: 1000;
          animation: hirePopupSlideIn 0.4s ease-out forwards;
          max-width: 400px;
        }

        .hire-popup-modal.hire-popup-fade.hire-popup-show.hire-popup-closing {
          animation: hirePopupSlideOut 0.3s ease-in forwards;
        }

        .hire-popup-dialog {
          position: relative;
          width: 100%;
          margin: 0;
          pointer-events: auto;
        }

        .hire-popup-dialog-centered {
          display: block;
          align-items: unset;
          min-height: auto;
        }

        .hire-popup-content {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          pointer-events: auto;
          background-clip: padding-box;
          background: var(--gradient-box-w);
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 30px;
          border-radius: 16px;
          outline: 0;
          max-width: 400px;
          margin: 0;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
        }

        .hire-popup-header {
          display: flex;
          align-items: center;
          justify-content: center !important;
          padding: 1rem 1.5rem 0;
          border-bottom: none;
        }

        /* Custom styling for hire popup can go here if needed */

        .hire-popup-body {
          position: relative;
          flex: 1 1 auto;
          padding: 1.5rem;
        }

        .hire-popup-row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }

        .hire-popup-align-center {
          align-items: center;
        }

        .hire-popup-col {
          position: relative;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          flex: 0 0 100%;
          max-width: 100%;
        }

        .hire-popup-avatar-center {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .hire-popup-avatar-center img {
          border: 3px solid white !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease;
        }

        .hire-popup-avatar-center img:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
        }

        .hire-popup-avatar-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          background: var(--gradient-red-hover);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .hire-popup-avatar-section::before {
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

        .hire-popup-avatar {
          position: relative;
          z-index: 2;
          width: 80px;
          height: 80px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          overflow: hidden;
        }

        .hire-popup-text-content {
          padding-left: 0;
          text-align: center;
        }

        .hire-popup-text-content h3 {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: var(--p-bold);
          color: var(--color-heading);
          line-height: 1.3;
        }

        .hire-popup-text-content h3 span {
          color: var(--color-primary);
          font-size: 0.95rem;
          font-weight: var(--p-semi-bold);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 0.5rem;
        }

        .hire-popup-text-content p {
          font-size: 1.3rem;
          line-height: 1.6;
          color: var(--color-body);
          margin-bottom: 1rem;
        }

        .hire-popup-description {
          margin-bottom: 1.5rem;
        }

        .hire-popup-button-group {
          display: flex;
          gap: 0.5rem;
          flex-direction: column;
          margin-top: 1rem;
        }

        /* Hire Popup Button Styles */
        .hire-popup-btn {
          cursor: pointer;
          white-space: nowrap;
          width: 100%;
          min-width: 120px;
          box-shadow: var(--shadow-white-3);
          border: none;
          border-radius: 8px;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-flex;
        }

        .hire-popup-btn-primary {
          background: var(--gradient-red-hover);
          color: var(--color-white);
          box-shadow: var(--shadow-white-3);
        }

        .hire-popup-btn-primary:hover {
          background: var(--color-primary);
          transform: translateY(-2px);
        }

        .hire-popup-btn-secondary {
          background: var(--gradient-box-w);
          color: var(--color-heading);
          border-color: var(--color-border);
          box-shadow: var(--shadow-white-3);
        }

        .hire-popup-btn-secondary:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @keyframes hirePopupSlideIn {
          from {
            transform: translateY(-50%) translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
        }

        @keyframes hirePopupSlideOut {
          from {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
          to {
            transform: translateY(-50%) translateX(100%);
            opacity: 0;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .hire-popup-modal.hire-popup-fade.hire-popup-show {
            right: 10px;
            left: 10px;
            transform: translateY(-50%) translateX(100%);
            max-width: calc(100% - 20px);
          }

          .hire-popup-dialog {
            margin: 0.5rem;
          }

          .hire-popup-col {
            flex: 0 0 100%;
            max-width: 100%;
            margin-bottom: 1.5rem;
          }

          .hire-popup-avatar-center {
            justify-content: center;
            margin-bottom: 1.5rem;
          }

          .hire-popup-text-content {
            padding-left: 0;
            text-align: center;
          }

          .hire-popup-text-content h3 {
            font-size: 1.5rem;
          }

          .hire-popup-button-group {
            justify-content: center;
          }

          .hire-popup-avatar-section {
            padding: 1.5rem;
          }

          .hire-popup-avatar {
            width: 100px;
            height: 100px;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hire-popup-modal.hire-popup-fade.hire-popup-show {
            animation: none;
          }
          .hire-popup-modal.hire-popup-fade.hire-popup-show.hire-popup-closing {
            animation: none;
          }
          .hire-popup-btn {
            transition: none;
          }
        }

        /* Theme-specific styles */
        .white-version .hire-popup-backdrop {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(6px);
        }

        .white-version .hire-popup-content {
          background: var(--gradient-box-w);
          border-color: var(--color-light);
          box-shadow: var(--shadow-white-3);
        }

        .white-version .hire-popup-text-content p {
          color: var(--color-body-white);
        }

        .white-version .hire-popup-text-content h3 {
          color: var(--color-heading-wv);
        }

        .white-version .hire-popup-text-content h3 span {
          color: var(--color-primary);
        }

        .white-version .hire-popup-btn-secondary {
          background: var(--color-gray);
          color: var(--color-body-white);
          border-color: var(--color-lighter);
          box-shadow: var(--shadow-white-3);
        }

        .white-version .hire-popup-btn-secondary:hover {
          background: var(--color-light);
          border-color: var(--color-primary);
          color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(255, 1, 79, 0.15);
        }

        /* Dark mode styles */
        body:not(.white-version) .hire-popup-backdrop {
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }

        body:not(.white-version) .hire-popup-content {
          background: var(--background-color-1);
          border-color: var(--color-tertiary);
          box-shadow: var(--shadow-1);
        }

        body:not(.white-version) .hire-popup-text-content p {
          color: var(--color-body);
        }

        body:not(.white-version) .hire-popup-text-content h3 {
          color: var(--color-heading);
        }

        body:not(.white-version) .hire-popup-btn-secondary {
          background: var(--background-color-2);
          color: var(--color-heading);
          border-color: var(--color-tertiary);
        }

        body:not(.white-version) .hire-popup-btn-secondary:hover {
          background: var(--color-tertiary);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
};

export default HireMePopup;
