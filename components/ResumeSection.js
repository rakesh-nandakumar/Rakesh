"use client";

import timelineData from "../data/timeline.json";

export default function ResumeSection() {
  // Filter timeline data by category
  // Category 1 = Work Experience, Category 2 = Education
  const experienceItems = timelineData.timeline.filter(
    (item) => item.category === 1
  );
  const educationItems = timelineData.timeline.filter(
    (item) => item.category === 2
  );

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
                      {experienceItems.map((exp, index) => (
                        <div key={index} className="resume-single-list mt--30">
                          <div className="inner psudo-after-none">
                            <div className="heading">
                              <div className="title">
                                <h4>{exp.title}</h4>
                                <span>{exp.time}</span>
                              </div>
                              <div className="date-of-time">
                                <span>{exp.time}</span>
                              </div>
                            </div>
                            <p className="description">
                              {exp["long-description"]}
                            </p>
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
                      {educationItems.map((edu, index) => (
                        <div key={index} className="resume-single-list mt--30">
                          <div className="inner psudo-after-none">
                            <div className="heading">
                              <div className="title">
                                <h4>{edu.title}</h4>
                                <span>{edu["short-description"]}</span>
                              </div>
                              <div className="date-of-time">
                                <span>{edu.status || "Completed"}</span>
                              </div>
                            </div>
                            <p className="description">
                              {edu["long-description"]}
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
