import React, { useEffect, useState, useCallback } from "react";

const Toast = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
  isVisible = false,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsShowing(false);
      onClose && onClose();
    }, 300); // Animation duration
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      setIsExiting(false);

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, handleClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="toast-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case "error":
        return (
          <svg
            className="toast-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="toast-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      default:
        return (
          <svg
            className="toast-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        );
    }
  };

  if (!isShowing) return null;

  return (
    <div className={`toast-overlay ${isExiting ? "toast-overlay-exit" : ""}`}>
      <div
        className={`toast toast-${type} ${
          isExiting ? "toast-exit" : "toast-enter"
        }`}
      >
        <div className="toast-content">
          <div className="toast-icon-wrapper">{getIcon()}</div>
          <div className="toast-message">{message}</div>
          <button
            className="toast-close"
            onClick={handleClose}
            aria-label="Close notification"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={`toast-progress toast-progress-${type}`} />
      </div>
    </div>
  );
};

export default Toast;
