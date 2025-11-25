"use client";

import React from "react";
import Link from "next/link";
import { useProfile } from "@/hooks/useSupabaseData";

export default function HeroSection() {
  const { profile: aboutData, isLoading } = useProfile();

  // Convert **text** to <strong>text</strong>
  const formatBio = (text) => {
    return text?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") || "";
  };

  // Show loading state
  if (isLoading || !aboutData) {
    return (
      <div
        className="rn-slider-area hero-section-responsive"
        id="heroSection"
        style={{
          backgroundColor: "#000",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="slide slider-style-1">
          <div className="container px-3 px-md-4">
            <div
              className="row align-items-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="col-12 text-center">
                <p className="text-white">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { name, title, shortBio, heroImage, cvLink } = aboutData;
  return (
    <div
      className="rn-slider-area hero-section-responsive"
      id="heroSection"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="slide slider-style-1">
        <div className="container px-3 px-md-4">
          <div
            className="row align-items-center"
            style={{
              minHeight: "100vh",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <div className="col-lg-7 col-md-10 col-12">
              <div className="content">
                <div className="inner pe-lg-5">
                  <span className="subtitle text-white">Hey There !</span>
                  <h1 className="title text-white">
                    I&apos;m <span>{name}</span>
                    <br />
                    <span className="header-caption" id="page-top">
                      {/* type headline start */}
                      <span className="cd-headline clip is-full-width">
                        <span>a </span>
                        {/* ROTATING TEXT */}
                        <span className="cd-words-wrapper ms-3">
                          {title.map((roleTitle, index) => (
                            <b
                              key={index}
                              className={
                                index === 0 ? "is-visible" : "is-hidden"
                              }
                            >
                              {roleTitle}.
                            </b>
                          ))}
                        </span>
                      </span>
                      {/* type headline end */}
                    </span>
                  </h1>
                  <div>
                    <p
                      className="description text-white mb-4"
                      dangerouslySetInnerHTML={{ __html: formatBio(shortBio) }}
                    />
                  </div>
                  {/* Call to Action Buttons */}
                  <div className="hero-cta-buttons pt-15 d-flex flex-column flex-sm-row gap-3">
                    <Link
                      href={cvLink}
                      className="rn-btn btn-small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download CV
                    </Link>
                    <Link
                      href="/about"
                      className="rn-btn no-shadow btn-theme btn-small"
                      style={{ border: "1px solid var(--color-primary)" }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        .hero-section-responsive {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url(${heroImage});
        }

        @media (max-width: 768px) {
          .hero-section-responsive {
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
              ),
              url("/hero-mobile.jpg") !important;
            background-position: center center;
            background-size: cover;
          }
        }

        @media (max-width: 576px) {
          .hero-section-responsive {
            background-position: center top;
          }

          .hero-section-responsive .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .hero-section-responsive .title {
            font-size: 2.5rem;
            line-height: 1.2;
          }

          .hero-section-responsive .subtitle {
            font-size: 1rem;
          }

          .hero-section-responsive .description {
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }
      `}</style> */}
    </div>
  );
}
