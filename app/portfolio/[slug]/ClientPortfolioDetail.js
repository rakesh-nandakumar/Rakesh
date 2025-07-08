"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Share2 } from "react-feather";

export default function ClientPortfolioDetail({ project, type = "share" }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  if (type === "share") {
    return (
      <button onClick={handleShare} className="action-button tertiary">
        <Share2 size={16} />
        Share
      </button>
    );
  }

  if (type === "image") {
    return (
      <div className="image-container">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          className={`project-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={() => setImageLoaded(true)}
          priority
          style={{ width: "100%", height: "auto" }}
        />
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="placeholder-spinner"></div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
