"use client";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>

      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          flex-direction: column;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0070f3;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        p {
          margin-top: 16px;
          color: #666;
        }
      `}</style>
    </div>
  );
}
