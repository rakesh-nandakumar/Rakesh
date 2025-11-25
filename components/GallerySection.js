"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "react-feather";
import { useGallery } from "@/hooks/useSupabaseData";
import { resolveAssetUrl } from "@/lib/fileStorage";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [closeButtonStyle, setCloseButtonStyle] = useState({});

  const { gallery = [], isLoading } = useGallery();

  // Support both array and { galleryImages: [] } shapes from DB
  const galleryImages = Array.isArray(gallery)
    ? gallery
    : gallery.galleryImages || [];

  // Dynamic close button sizing based on modal size
  useEffect(() => {
    if (selectedImage) {
      const updateButtonSize = () => {
        const modal = document.querySelector(".modal-dialog");
        if (modal) {
          const modalRect = modal.getBoundingClientRect();

          // Add null check for modalRect
          if (
            !modalRect ||
            typeof modalRect.width === "undefined" ||
            typeof modalRect.height === "undefined"
          ) {
            return;
          }

          const modalWidth = modalRect.width;
          const modalHeight = modalRect.height;

          // Calculate button size based on modal dimensions
          let buttonSize = Math.min(modalWidth * 0.08, modalHeight * 0.08);
          buttonSize = Math.max(28, Math.min(45, buttonSize)); // Clamp between 28px and 45px

          // Calculate position based on button size
          const position = Math.max(3, buttonSize * 0.15);

          setCloseButtonStyle({
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            top: `${position}px`,
            right: `${position}px`,
          });
        }
      };

      // Update immediately and on resize
      updateButtonSize();
      window.addEventListener("resize", updateButtonSize);

      // Cleanup
      return () => window.removeEventListener("resize", updateButtonSize);
    }
  }, [selectedImage]);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % galleryImages.length
        : (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const getCategoryColor = (category) => {
    const colors = {
      education: "bg-blue-500",
      career: "bg-green-500",
      team: "bg-purple-500",
      speaking: "bg-orange-500",
      achievement: "bg-yellow-500",
      mentoring: "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading gallery...</div>;
  }

  return (
    <>
      <style jsx>{`
        .modal-close-btn {
          position: absolute !important;
          top: 8px !important;
          right: 8px !important;
          z-index: 1001 !important;
          width: 40px !important;
          height: 40px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          background: var(--background-color-1) !important;
          box-shadow: var(--shadow-1) !important;
        }

        /* Light mode styles */
        :global(.white-version) .modal-close-btn {
          background: var(--gradient-box-w) !important;
          box-shadow: var(--shadow-white-3) !important;
          opacity: 1 !important;
        }

        .modal-dialog {
          max-width: 95vw !important;
          max-height: 95vh !important;
          width: auto !important;
          height: auto !important;
          position: relative !important;
        }

        .portfolio-single .row {
          min-height: auto !important;
        }

        .portfolio-single img {
          max-width: 100% !important;
          max-height: 70vh !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
        }

        /* Small modal adjustments */
        .modal-dialog[style*="width"] .modal-close-btn {
          top: 5px !important;
          right: 5px !important;
          width: 35px !important;
          height: 35px !important;
        }

        @media (max-width: 768px) {
          .modal-close-btn {
            width: 35px !important;
            height: 35px !important;
            top: 5px !important;
            right: 5px !important;
          }

          .modal-dialog {
            max-width: 98vw !important;
            max-height: 98vh !important;
          }

          .portfolio-single img {
            max-height: 60vh !important;
          }
        }

        @media (max-width: 480px) {
          .modal-close-btn {
            width: 32px !important;
            height: 32px !important;
            top: 3px !important;
            right: 3px !important;
          }

          .portfolio-single img {
            max-height: 50vh !important;
          }
        }

        /* For very small modals */
        @media (max-width: 400px) {
          .modal-close-btn {
            width: 28px !important;
            height: 28px !important;
            top: 2px !important;
            right: 2px !important;
          }
        } /* Ensure button stays within modal bounds */
        .modal-dialog .modal-close-btn {
          max-width: 10% !important;
          max-height: 10% !important;
        }

        /* Modal content styling */
        .image-details {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--background-color-3);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: var(--transition);
        }

        :global(.white-version) .detail-item {
          background: #f8f9fa;
          border-color: #e9ecef;
        }

        .detail-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-1);
        }

        :global(.white-version) .detail-item:hover {
          box-shadow: var(--shadow-white-3);
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .detail-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-body);
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        :global(.white-version) .detail-label {
          color: #666;
          opacity: 0.8;
        }

        .detail-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-heading);
        }

        :global(.white-version) .detail-value {
          color: #333;
        }

        .category-badge-modal {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
          color: white;
          display: inline-block;
          margin-left: auto;
        }

        /* Responsive modal content */
        @media (max-width: 768px) {
          .image-details {
            margin-top: 1.5rem;
            gap: 0.75rem;
          }

          .detail-item {
            padding: 0.5rem;
            gap: 0.5rem;
          }

          .detail-label {
            font-size: 0.7rem;
          }

          .detail-value {
            font-size: 0.85rem;
          }

          .category-badge-modal {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
      <div className="rn-gallery-area rn-section-gap section-separator">
        <div className="inner slide">
          <div className="section-title text-center">
            <span className="subtitle">My Professional Journey</span>
            <h2 className="title">Gallery &amp; Highlights</h2>
          </div>
          <div className="gallery-area-inner pt--100">
            {/* Gallery Grid */}
            <div className="gallery-grid masonry-grid">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="gallery-item"
                  onClick={() => openModal(image, index)}
                >
                  <div className="image-container">
                    <img
                      src={resolveAssetUrl(image.src)}
                      alt={image.title}
                      className="gallery-image"
                      style={{
                        objectFit: "cover",
                        height: "auto",
                        width: "100%",
                      }}
                    />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <h3 className="image-title">{image.title}</h3>
                        <div className="image-meta">
                          <span className="meta-item">
                            <Calendar size={14} />
                            {image.date}
                          </span>
                          <span className="meta-item">
                            <MapPin size={14} />
                            {image.location}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`category-badge ${getCategoryColor(
                          image.category
                        )}`}
                      >
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal */}
            {selectedImage && (
              <div
                className="modal fade show"
                id="exampleModalCenters"
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                style={{ display: "block" }}
                onClick={closeModal}
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-news"
                  role="document"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "95vh",
                    width: "auto",
                    height: "auto",
                    position: "relative",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    style={{
                      position: "absolute",
                      transition: "var(--transition)",
                      width: closeButtonStyle.width || "40px",
                      height: closeButtonStyle.height || "40px",
                      borderRadius: "50%",
                      top: closeButtonStyle.top || "8px",
                      right: closeButtonStyle.right || "8px",
                      transform: "none",
                      background: "var(--background-color-1)",
                      opacity: 1,
                      zIndex: 1001,
                      boxShadow: "var(--shadow-1)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="modal-close-btn"
                  >
                    <X size={20} />
                  </button>
                  <div
                    id="portfolio"
                    className="rn-project-area portfolio-style-two"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <div className="container">
                      <div
                        data-aos="fade-up"
                        data-aos-duration={1000}
                        data-aos-delay={300}
                        data-aos-once="true"
                        id="carouselExampleControls"
                        className="carousel slide aos-init aos-animate"
                        data-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <div className="portfolio-single">
                              <div className="row direction justify-content-center">
                                <div className="col-lg-5">
                                  <div className="inner text-center text-lg-start">
                                    <span
                                      className={`category-badge-modal ${getCategoryColor(
                                        selectedImage.category
                                      )}`}
                                      style={{
                                        marginBottom: "1rem",
                                        display: "inline-block",
                                      }}
                                    >
                                      {selectedImage.category}
                                    </span>
                                    <h5 className="title">
                                      {selectedImage.title}
                                    </h5>
                                    <p className="discription">
                                      {selectedImage.description}
                                    </p>
                                    <div className="image-details">
                                      <div className="detail-item">
                                        <Calendar size={18} />
                                        <div className="detail-content">
                                          <span className="detail-label">
                                            Date
                                          </span>
                                          <span className="detail-value">
                                            {selectedImage.date}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="detail-item">
                                        <MapPin size={18} />
                                        <div className="detail-content">
                                          <span className="detail-label">
                                            Location
                                          </span>
                                          <span className="detail-value">
                                            {selectedImage.location}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-7 col-xl-7 d-flex justify-content-center align-items-center">
                                  <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="mx-auto"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "70vh",
                                      width: "auto",
                                      height: "auto",
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* End Single Item  */}
                        </div>
                        <button
                          className="carousel-control-prev"
                          role="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="prev"
                          onClick={() => navigateImage("prev")}
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          className="carousel-control-next"
                          role="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="next"
                          onClick={() => navigateImage("next")}
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GallerySection;
