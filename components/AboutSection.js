"use client";

import Image from "next/image";
import { useProfile } from "@/hooks/useSupabaseData";
import { resolveAssetUrl } from "@/lib/fileStorage";

export default function AboutSection() {
  const { profile: aboutData, isLoading } = useProfile();

  if (isLoading || !aboutData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { name, shortBio, longBio = "", profileImage, cvLink } = aboutData;

  // Convert **text** to <strong>text</strong>
  const formatBio = (text) => {
    return text?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") || "";
  };

  // Split longBio into paragraphs for better display
  const bioParagraphs = (longBio || "").split("\n\n");

  return (
    <div id="about" className="rn-about-area rn-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={100}
              data-aos-once="true"
              className="image-area aos-init aos-animate"
            >
              <div className="thumbnail">
                <Image
                  src={resolveAssetUrl(profileImage)}
                  alt={`${name} - Profile Image`}
                  width={400}
                  height={400}
                  priority
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration={1000}
            data-aos-delay={100}
            data-aos-once="true"
            className="col-lg-7 mt_sm--30 aos-init aos-animate"
          >
            <div className="contant">
              <div className="section-title text-left">
                <span className="subtitle">
                  Visit my portfolio &amp; Hire me
                </span>
                <h2 className="title">About Me</h2>
              </div>
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="discription"
                  dangerouslySetInnerHTML={{ __html: formatBio(paragraph) }}
                />
              ))}
              <a className="rn-btn" href={cvLink} download>
                <span>DOWNLOAD MY CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
