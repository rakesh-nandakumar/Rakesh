"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function OfflinePage() {
  useEffect(() => {
    document.title = "Offline - You're currently offline";
  }, []);
  return (
    <div className="rn-section-gap" style={{ minHeight: "70vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" style={{ paddingTop: "100px" }}>
              <div style={{ fontSize: "120px", opacity: 0.3 }}>📵</div>
              <h1 className="title" style={{ marginTop: "30px" }}>
                You're Offline
              </h1>
              <p
                className="description"
                style={{ marginTop: "20px", fontSize: "18px" }}
              >
                It looks like you've lost your internet connection.
                <br />
                Don't worry, some content is available offline.
              </p>
              <div style={{ marginTop: "40px" }}>
                <button
                  onClick={() => window.location.reload()}
                  className="rn-btn"
                  style={{ marginRight: "10px" }}
                >
                  Try Again
                </button>
                <Link href="/" className="rn-btn btn-border">
                  Go to Homepage
                </Link>
              </div>
              <div style={{ marginTop: "40px", opacity: 0.7 }}>
                <p className="description">
                  <strong>Available Offline:</strong>
                </p>
                <ul
                  style={{ listStyle: "none", padding: 0, marginTop: "20px" }}
                >
                  <li>🏠 Homepage</li>
                  <li>👤 About Page</li>
                  <li>💼 Portfolio</li>
                  <li>📝 Blogs (previously visited)</li>
                  <li>📧 Contact Page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
