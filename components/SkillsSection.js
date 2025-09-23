import React from "react";
import Image from "next/image";
import aboutData from "../data/about.json";
import "../styles/SkillsSection.css";

const SkillsSection = () => {
  // Get primary skills from about.json techStack
  const primarySkills = aboutData.techStack;

  return (
    <div className="rn-skill-area rn-section-gap section-separator">
      <div className="inner slide">
        <div className="section-title text-center">
          <span className="subtitle">My Technical Expertise</span>
          <h2 className="title">Skills &amp; Technologies</h2>
        </div>
        <div className="skill-share-inner pt--100">
          <ul className="skill-share liststyle skills-grid">
            {primarySkills.map((skill, index) => (
              <div className="rn-blog skill-card" key={index}>
                <li className="skill-icon">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className={skill.darkMode ? "dark-mode-icon" : ""}
                    style={{ objectFit: "contain" }}
                  />
                </li>
                <div className="skill-content">
                  <h6 className="skill-name">
                    {skill.name}
                  </h6>
                  <p className="skill-description">{skill.description}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
