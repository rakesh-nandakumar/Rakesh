import { useState, useCallback } from "react";

export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "info",
    duration: 5000,
  });

  const showToast = useCallback((message, type = "info", duration = 5000) => {
    setToast({
      isVisible: true,
      message,
      type,
      duration,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const showSuccess = useCallback(
    (message, duration = 5000) => {
      showToast(message, "success", duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (message, duration = 5000) => {
      showToast(message, "error", duration);
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message, duration = 5000) => {
      showToast(message, "warning", duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message, duration = 5000) => {
      showToast(message, "info", duration);
    },
    [showToast]
  );

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
