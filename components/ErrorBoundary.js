"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // You can also log the error to an error reporting service here
    if (typeof window !== "undefined") {
      // Handle client-side errors
      window.addEventListener("error", this.handleError);
      window.addEventListener(
        "unhandledrejection",
        this.handlePromiseRejection
      );
    }
  }

  handleError = (event) => {
    console.error("Global JavaScript Error:", event.error);
    // Prevent the error from crashing the app
    event.preventDefault();
  };

  handlePromiseRejection = (event) => {
    console.error("Unhandled Promise Rejection:", event.reason);
    // Prevent the error from crashing the app
    event.preventDefault();
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("error", this.handleError);
      window.addEventListener(
        "unhandledrejection",
        this.handlePromiseRejection
      );
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("error", this.handleError);
      window.removeEventListener(
        "unhandledrejection",
        this.handlePromiseRejection
      );
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>Error details</summary>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
