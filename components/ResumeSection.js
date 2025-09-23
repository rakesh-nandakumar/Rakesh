"use client";

import aboutData from "../data/about.json";

const resumeData = {
  education: aboutData.education,
  experience: aboutData.experience,
};

export default function ResumeSection() {

  return (
    <div
      className="rn-resume-area rn-section-gap section-separator"
      id="resume"
    >
      <div className="container">
        <div className="personal-experience-inner">
          <div className="row">
            <div className="personal-experience-inner">
              {" "}
              <div className="row m--0">
                {" "}
                {/* Start Experience List Area  */}
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="content">
                    <span className="subtitle ps-4">Experience</span>
                    <h4 className="maintitle ps-4">Job Experience</h4>
                    <div className="experience-list padding-none border-none">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="resume-single-list mt--30">
                          <div className="inner psudo-after-none">
                            <div className="heading">
                              <div className="title">
                                <h4>{exp.title}</h4>
                                <span>{exp.company}</span>
                              </div>
                              <div className="date-of-time">
                                <span>{exp.year}</span>
                              </div>
                            </div>
                            <p className="description">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* End Experience List Area  */}
                {/* Start Education List Area  */}
                <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                  <div className="content">
                    <span className="subtitle ps-4">Education</span>
                    <h4 className="maintitle ps-4">Education Quality</h4>
                    <div className="experience-list padding-none border-none">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="resume-single-list mt--30">
                          <div className="inner psudo-after-none">
                            <div className="heading">
                              <div className="title">
                                <h4>{edu.degree}</h4>
                                <span>
                                  {edu.institution}{" "}
                                  {edu.year && `(${edu.year})`}
                                </span>
                              </div>
                              <div className="date-of-time">
                                <span>{edu.year || "Completed"}</span>
                              </div>
                            </div>
                            <p className="description">
                              {edu.description ||
                                `Specialized degree in ${edu.degree} from ${edu.institution}.`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* End Education List Area  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
