"use client";

import React from "react";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";

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
        <div className="error-page-inner rn-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner text-center">
                  <div className="section-title text-center">
                    <h2 className="title">Something went wrong.</h2>
                    <p className="subtitle mt-5">
                      Oops! Something went wrong. Don&apos;t worry, it happens
                      to the best of us. Let&apos;s get you back on track!
                    </p>
                    <details
                      style={{
                        whiteSpace: "pre-wrap",
                        color: "gray",
                      }}
                    >
                      <summary
                        style={{
                          color: "var(--color-primary)",
                        }}
                      >
                        Error details
                      </summary>
                      {this.state.error && this.state.error.toString()}
                    </details>
                  </div>

                  <div className="error-actions mt-5">
                    <Link
                      href="/"
                      className="rn-btn mr-3"
                      aria-label="Return to homepage"
                    >
                      Back to Home
                    </Link>

                    <Link
                      href="/contact"
                      className="rn-btn btn-outline"
                      aria-label="Contact for help"
                    >
                      Report Issue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
