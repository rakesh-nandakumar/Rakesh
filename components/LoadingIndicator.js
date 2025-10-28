"use client";

import React from "react";
import "../styles/LoadingIndicator.css";

/**
 * Unified loading indicator component used across the application
 * Features a unique animated design with gradient colors
 *
 * @param {Object} props
 * @param {string} props.size - Size variant: 'small', 'medium', 'large' (default: 'medium')
 * @param {string} props.message - Optional loading message to display
 * @param {boolean} props.fullScreen - Whether to show as fullscreen overlay (default: false)
 * @param {string} props.variant - Style variant: 'spinner', 'pulse', 'dots' (default: 'spinner')
 */
export default function LoadingIndicator({
  size = "medium",
  message = "Loading...",
  fullScreen = false,
  variant = "spinner",
}) {
  const sizeClass = `loading-${size}`;
  const variantClass = `loading-${variant}`;

  const content = (
    <div
      className={`loading-container ${fullScreen ? "loading-fullscreen" : ""}`}
    >
      <div className={`loading-indicator ${sizeClass} ${variantClass}`}>
        {variant === "spinner" && (
          <div className="spinner-wrapper">
            <div className="spinner-ring spinner-ring-1"></div>
            <div className="spinner-ring spinner-ring-2"></div>
            <div className="spinner-ring spinner-ring-3"></div>
            <div className="spinner-core"></div>
          </div>
        )}

        {variant === "pulse" && (
          <div className="pulse-wrapper">
            <div className="pulse-circle pulse-circle-1"></div>
            <div className="pulse-circle pulse-circle-2"></div>
            <div className="pulse-circle pulse-circle-3"></div>
          </div>
        )}

        {variant === "dots" && (
          <div className="dots-wrapper">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
          </div>
        )}
      </div>

      {message && (
        <div className="loading-message">
          <span className="message-text">{message}</span>
          <span className="message-dots">
            <span className="dot-animate">.</span>
            <span className="dot-animate">.</span>
            <span className="dot-animate">.</span>
          </span>
        </div>
      )}
    </div>
  );

  return content;
}
