"use client";

import { useTimeline } from "@/hooks/useSupabaseData";

export default function CareerTimeline() {
  const { timeline: timelineData = {}, isLoading } = useTimeline();

  if (isLoading) {
    return <div className="text-center py-10">Loading timeline...</div>;
  }

  // Extract timeline array from the data object
  const timelineItems = timelineData?.timeline || [];
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <span className="subtitle">3+ Years of Experience</span>
            <h2 className="title">My Professional Journey</h2>
          </div>
        </div>
      </div>
      <div className="row mt--45">
        <div className="col-lg-12">
          <div className="personal-experience-inner mt--40">
            <div className="row">
              {/* Start Skill List Area 2nd  */}
              <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                <div className="content">
                  <h4 className="maintitle">Career Timeline</h4>
                  <div className="experience-list">
                    {/* Start Single List  */}
                    <div className="resume-single-list">
                      <div className="inner">
                        <div className="heading">
                          <div className="title">
                            <h4>Diploma in Web Development</h4>
                            <span>BSE In CSE (2004 - 2008)</span>
                          </div>
                          <div className="date-of-time">
                            <span>4.70/5</span>
                          </div>
                        </div>
                        <p className="description">
                          Contrary to popular belief. Ut tincidunt est ac dolor
                          aliquam sodales. Phasellus sed mauris hendrerit,
                          laoreet sem in, lobortis mauris hendrerit ante.
                        </p>
                      </div>
                    </div>
                    {/* End Single List  */}
                    {/* Start Single List  */}
                    <div className="resume-single-list">
                      <div className="inner">
                        <div className="heading">
                          <div className="title">
                            <h4>The Personal Portfolio Mystery</h4>
                            <span>Job at Parv Infotech (2008 - 2016)</span>
                          </div>
                          <div className="date-of-time">
                            <span>4.95/5</span>
                          </div>
                        </div>
                        <p className="description">
                          Generate Lorem Ipsum which looks. Ut tincidunt est ac
                          dolor aliquam sodales. Phasellus sed mauris hendrerit,
                          laoreet sem in, lobortis mauris hendrerit ante.
                        </p>
                      </div>
                    </div>
                    {/* End Single List  */}
                    {/* Start Single List  */}
                    <div className="resume-single-list">
                      <div className="inner">
                        <div className="heading">
                          <div className="title">
                            <h4>Diploma in Computer Science</h4>
                            <span>
                              Works at Plugin Development (2016 - 2020)
                            </span>
                          </div>
                          <div className="date-of-time">
                            <span>5.00/5</span>
                          </div>
                        </div>
                        <p className="description">
                          Maecenas finibus nec sem ut imperdiet. Ut tincidunt
                          est ac dolor aliquam sodales. Phasellus sed mauris
                          hendrerit, laoreet sem in, lobortis mauris hendrerit
                          ante.
                        </p>
                      </div>
                    </div>
                    {/* End Single List  */}
                  </div>
                </div>
              </div>
              {/* End Skill List Area  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
