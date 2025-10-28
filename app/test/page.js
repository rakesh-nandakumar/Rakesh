import ContactSection from "@/components/ContactSection";
import LoadingIndicator from "@/components/LoadingIndicator";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Loading Indicator Showcase */}
      <div
        className="rn-section-gap section-separator"
        style={{ background: "var(--color-background)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb--50">
                <h2 className="title">Loading Indicators Showcase</h2>
                <p className="description">
                  Unified loading components with beautiful gradient animations
                </p>
              </div>
            </div>
          </div>

          {/* Spinner Variant */}
          <div className="row mb--60">
            <div className="col-lg-12">
              <h3 className="title mb--30">Spinner Variant</h3>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Small</h5>
                <LoadingIndicator
                  size="small"
                  message="Loading"
                  variant="spinner"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Medium</h5>
                <LoadingIndicator
                  size="medium"
                  message="Loading content"
                  variant="spinner"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Large</h5>
                <LoadingIndicator
                  size="large"
                  message="Loading page"
                  variant="spinner"
                />
              </div>
            </div>
          </div>

          {/* Pulse Variant */}
          <div className="row mb--60">
            <div className="col-lg-12">
              <h3 className="title mb--30">Pulse Variant</h3>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Small</h5>
                <LoadingIndicator
                  size="small"
                  message="Loading"
                  variant="pulse"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Medium</h5>
                <LoadingIndicator
                  size="medium"
                  message="Loading content"
                  variant="pulse"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Large</h5>
                <LoadingIndicator
                  size="large"
                  message="Loading page"
                  variant="pulse"
                />
              </div>
            </div>
          </div>

          {/* Dots Variant */}
          <div className="row mb--60">
            <div className="col-lg-12">
              <h3 className="title mb--30">Dots Variant</h3>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Small</h5>
                <LoadingIndicator
                  size="small"
                  message="Loading"
                  variant="dots"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Medium</h5>
                <LoadingIndicator
                  size="medium"
                  message="Loading content"
                  variant="dots"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="text-center p-4"
                style={{
                  background: "var(--color-lightn)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb--30">Large</h5>
                <LoadingIndicator
                  size="large"
                  message="Loading page"
                  variant="dots"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="main-page-wrapper">
        {/* Start Slider Area */}
        <div id="home" className="rn-slider-area">
          <div className="slide slider-style-1">
            <div className="container">
              <div className="row row--30 align-items-center">
                <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--30">
                  <div className="content">
                    <div className="inner">
                      <span className="subtitle">Welcome to my world</span>
                      <h1 className="title">
                        Hi, I’m <span>Jone Lee</span>
                        <br />
                        <span className="header-caption" id="page-top">
                          {/* type headline start*/}
                          <span className="cd-headline clip is-full-width">
                            <span>a </span>
                            {/* ROTATING TEXT */}
                            <span className="cd-words-wrapper">
                              <b className="is-visible">Developer.</b>
                              <b className="is-hidden">Professional Coder.</b>
                              <b className="is-hidden">Developer.</b>
                            </span>
                          </span>
                          {/* type headline end */}
                        </span>
                      </h1>
                      <div>
                        <p className="description">
                          I use animation as a third dimension by which to
                          simplify experiences and kuiding thro each and every
                          interaction. I’m not adding motion just to spruce
                          things up, but doing it in ways that.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12">
                        <div className="social-share-inner-left">
                          <span className="title">find with me</span>
                          <ul className="social-share d-flex liststyle">
                            <li className="facebook">
                              <a href="#">
                                <i data-feather="facebook" />
                              </a>
                            </li>
                            <li className="instagram">
                              <a href="#">
                                <i data-feather="instagram" />
                              </a>
                            </li>
                            <li className="linkedin">
                              <a href="#">
                                <i data-feather="linkedin" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12 mt_mobile--30">
                        <div className="skill-share-inner">
                          <span className="title">best skill on</span>
                          <ul className="skill-share d-flex liststyle">
                            <li>
                              <img
                                src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/icons-01.png"
                                alt="Icons Images"
                              />
                            </li>
                            <li>
                              <img
                                src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/icons-02.png"
                                alt="Icons Images"
                              />
                            </li>
                            <li>
                              <img
                                src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/icons-03.png"
                                alt="Icons Images"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 order-lg-2 col-lg-5">
                  <div className="thumbnail">
                    <div className="inner">
                      <img
                        src="https://inbio.pixcelsthemes.com/inbio/assets/images/slider/banner-01.png"
                        alt="Personal Portfolio Images"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Slider Area */}
        {/* Start Service Area */}
        <div
          className="rn-service-area rn-section-gap section-separator"
          id="features"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="section-title text-left"
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={100}
                  data-aos-once="true"
                >
                  <span className="subtitle">Features</span>
                  <h2 className="title">What I Do</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt_md--10 mt_sm--10">
              {/* Start Single Service */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={100}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <i data-feather="menu" />
                    </div>
                    <div className="content">
                      <h4 className="title">
                        <a href="#">Business Stratagy</a>
                      </h4>
                      <p className="description">
                        I throw myself down among the tall grass by the stream
                        as I lie close to the earth.
                      </p>
                      <a className="read-more-button" href="#">
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <a className="over-link" href="#" />
                </div>
              </div>
              {/* End SIngle Service */}
              {/* Start Single Service */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={300}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <i data-feather="book-open" />
                    </div>
                    <div className="content">
                      <h4 className="title">
                        <a href="#">App Development</a>
                      </h4>
                      <p className="description">
                        It uses a dictionary of over 200 Latin words, combined
                        with a handful of model sentence.
                      </p>
                      <a className="read-more-button" href="#">
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <a className="over-link" href="#" />
                </div>
              </div>
              {/* End SIngle Service */}
              {/* Start Single Service */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <i data-feather="tv" />
                    </div>
                    <div className="content">
                      <h4 className="title">
                        <a href="#">App Development</a>
                      </h4>
                      <p className="description">
                        I throw myself down among the tall grass by the stream
                        as I lie close to the earth.
                      </p>
                      <a className="read-more-button" href="#">
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <a className="over-link" href="#" />
                </div>
              </div>
              {/* End SIngle Service */}
              {/* Start Single Service */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={100}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <i data-feather="twitch" />
                    </div>
                    <div className="content">
                      <h4 className="title">
                        <a href="#">Mobile App</a>
                      </h4>
                      <p className="description">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority.
                      </p>
                      <a className="read-more-button" href="#">
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <a className="over-link" href="#" />
                </div>
              </div>
              {/* End SIngle Service */}
              {/* Start Single Service */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={300}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <i data-feather="wifi" />
                    </div>
                    <div className="content">
                      <h4 className="title">
                        <a href="#">CEO Marketing</a>
                      </h4>
                      <p className="description">
                        always free from repetition, injected humour, or
                        non-characteristic words etc.
                      </p>
                      <a className="read-more-button" href="#">
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <a className="over-link" href="#" />
                </div>
              </div>
              {/* End SIngle Service */}
              {/* Start Single Service */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={500}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div className="rn-service">
                  <div className="inner">
                    <div className="icon">
                      <i data-feather="slack" />
                    </div>
                    <div className="content">
                      <h4 className="title">
                        <a href="#">Personal Portfolio April</a>
                      </h4>
                      <p className="description">
                        It uses a dictionary of over 200 Latin words, combined
                        with a handful of model sentence.
                      </p>
                      <a className="read-more-button" href="#">
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <a className="over-link" href="#" />
                </div>
              </div>
              {/* End SIngle Service */}
            </div>
          </div>
        </div>
        {/* End Service Area  */}
        {/* Start Portfolio Area */}
        <div
          className="rn-portfolio-area rn-section-gap section-separator"
          id="portfolio"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">
                    Visit my portfolio and keep your feedback
                  </span>
                  <h2 className="title">My Portfolio</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
              {/* Start Single Portfolio */}
              <div
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div
                  className="rn-portfolio"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-01.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Development</a>
                        </div>
                        <div className="meta">
                          <span>
                            <a href="javascript:void(0)">
                              <i className="feather-heart" />
                            </a>
                            600
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          The services provide for design
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Portfolio */}
              {/* Start Single Portfolio */}
              <div
                data-aos="fade-up"
                data-aos-delay={300}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div
                  className="rn-portfolio"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-02.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Application</a>
                        </div>
                        <div className="meta">
                          <span>
                            <a href="javascript:void(0)">
                              <i className="feather-heart" />
                            </a>
                            750
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          Mobile app landing design &amp; app maintain
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Portfolio */}
              {/* Start Single Portfolio */}
              <div
                data-aos="fade-up"
                data-aos-delay={500}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div
                  className="rn-portfolio"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-03.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Photoshop</a>
                        </div>
                        <div className="meta">
                          <span>
                            <a href="javascript:void(0)">
                              <i className="feather-heart" />
                            </a>
                            630
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          Logo design creativity &amp; Application
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Portfolio */}
              {/* Start Single Portfolio */}
              <div
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div
                  className="rn-portfolio"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-04.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Figma</a>
                        </div>
                        <div className="meta">
                          <span>
                            <a href="javascript:void(0)">
                              <i className="feather-heart" />
                            </a>
                            360
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          Mobile app landing design &amp; Services
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Portfolio */}
              {/* Start Single Portfolio */}
              <div
                data-aos="fade-up"
                data-aos-delay={300}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div
                  className="rn-portfolio"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-05.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Web Design</a>
                        </div>
                        <div className="meta">
                          <span>
                            <a href="javascript:void(0)">
                              <i className="feather-heart" />
                            </a>
                            280
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          Design for tecnology &amp; services
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Portfolio */}
              {/* Start Single Portfolio */}
              <div
                data-aos="fade-up"
                data-aos-delay={500}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
              >
                <div
                  className="rn-portfolio"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-06.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Web Design</a>
                        </div>
                        <div className="meta">
                          <span>
                            <a href="javascript:void(0)">
                              <i className="feather-heart" />
                            </a>
                            690
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          App for tecnology &amp; services
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Portfolio */}
            </div>
          </div>
        </div>
        {/* End portfolio Area */}
        {/* Start Resume Area */}
        <div
          className="rn-resume-area rn-section-gap section-separator"
          id="resume"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">7+ Years of Experience</span>
                  <h2 className="title">My Resume</h2>
                </div>
              </div>
            </div>
            <div className="row mt--45">
              <div className="col-lg-12">
                <ul
                  className="rn-nav-list nav nav-tabs"
                  id="myTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="education-tab"
                      data-bs-toggle="tab"
                      href="#education"
                      role="tab"
                      aria-controls="education"
                      aria-selected="true"
                    >
                      education
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="professional-tab"
                      data-bs-toggle="tab"
                      href="#professional"
                      role="tab"
                      aria-controls="professional"
                      aria-selected="false"
                    >
                      professional Skills
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="experience-tab"
                      data-bs-toggle="tab"
                      href="#experience"
                      role="tab"
                      aria-controls="experience"
                      aria-selected="false"
                    >
                      experience
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="interview-tab"
                      data-bs-toggle="tab"
                      href="#interview"
                      role="tab"
                      aria-controls="interview"
                      aria-selected="false"
                    >
                      interview
                    </a>
                  </li>
                </ul>
                {/* Start Tab Content Wrapper  */}
                <div className="rn-nav-content tab-content" id="myTabContents">
                  {/* Start Single Tab  */}
                  <div
                    className="tab-pane show active fade single-tab-area"
                    id="education"
                    role="tabpanel"
                    aria-labelledby="education-tab"
                  >
                    <div className="personal-experience-inner mt--40">
                      <div className="row">
                        {/* Start Skill List Area  */}
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="content">
                            <span className="subtitle">2007 - 2010</span>
                            <h4 className="maintitle">Education Quality</h4>
                            <div className="experience-list">
                              {/* Start Single List  */}
                              <div className="resume-single-list">
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Personal Portfolio April Fools</h4>
                                      <span>
                                        University of DVI (1997 - 2001)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.30/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    The education should be very interactual. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div className="resume-single-list">
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4> Examples Of Personal Portfolio</h4>
                                      <span>
                                        College of Studies (2000 - 2002)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.50/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Maecenas finibus nec sem ut imperdiet. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div className="resume-single-list">
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Tips For Personal Portfolio</h4>
                                      <span>
                                        University of Studies (1997 - 2001)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.80/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    If you are going to use a passage. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                            </div>
                          </div>
                        </div>
                        {/* End Skill List Area  */}
                        {/* Start Skill List Area 2nd  */}
                        <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                          <div className="content">
                            <span className="subtitle">2007 - 2010</span>
                            <h4 className="maintitle">Job Experience</h4>
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
                                    Contrary to popular belief. Ut tincidunt est
                                    ac dolor aliquam sodales. Phasellus sed
                                    mauris hendrerit, laoreet sem in, lobortis
                                    mauris hendrerit ante.
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
                                      <span>
                                        Job at Parv Infotech (2008 - 2016)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.95/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Generate Lorem Ipsum which looks. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
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
                                        Works at Plugin Development (2016 -
                                        2020)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>5.00/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Maecenas finibus nec sem ut imperdiet. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
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
                  {/* End Single Tab  */}
                  {/* Start Single Tab  */}
                  <div
                    className="tab-pane fade "
                    id="professional"
                    role="tabpanel"
                    aria-labelledby="professional-tab"
                  >
                    <div className="personal-experience-inner mt--40">
                      <div className="row row--40">
                        {/* Start Single Progressbar  */}
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="progress-wrapper">
                            <div className="content">
                              <span className="subtitle">Features</span>
                              <h4 className="maintitle">Design Skill</h4>
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">
                                  PHOTOSHOT
                                </h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.5s"
                                    data-wow-delay=".3s"
                                    role="progressbar"
                                    style={{ width: "100%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">100%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">FIGMA</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.6s"
                                    data-wow-delay=".4s"
                                    role="progressbar"
                                    style={{ width: "95%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">95%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">ADOBE XD</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.7s"
                                    data-wow-delay=".5s"
                                    role="progressbar"
                                    style={{ width: "60%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">60%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">
                                  ADOBE ILLUSTRATOR
                                </h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.8s"
                                    data-wow-delay=".6s"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">70%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">DESIGN</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.9s"
                                    data-wow-delay=".7s"
                                    role="progressbar"
                                    style={{ width: "90%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">90%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                            </div>
                          </div>
                        </div>
                        {/* End Single Progressbar  */}
                        {/* Start Single Progressbar  */}
                        <div className="col-lg-6 col-md-6 col-12 mt_sm--60">
                          <div className="progress-wrapper">
                            <div className="content">
                              <span className="subtitle">Features</span>
                              <h4 className="maintitle">Development Skill</h4>
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">HTML</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.5s"
                                    data-wow-delay=".3s"
                                    role="progressbar"
                                    style={{ width: "85%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">85%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">CSS</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.6s"
                                    data-wow-delay=".4s"
                                    role="progressbar"
                                    style={{ width: "80%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">80%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">
                                  JAVASCRIPT
                                </h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.7s"
                                    data-wow-delay=".5s"
                                    role="progressbar"
                                    style={{ width: "90%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">90%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">SOFTWARE</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.8s"
                                    data-wow-delay=".6s"
                                    role="progressbar"
                                    style={{ width: "75%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">75%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                              {/* Start Single Progress Charts */}
                              <div className="progress-charts">
                                <h6 className="heading heading-h6">PLUGIN</h6>
                                <div className="progress">
                                  <div
                                    className="progress-bar wow fadeInLeft"
                                    data-wow-duration="0.9s"
                                    data-wow-delay=".7s"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={85}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <span className="percent-label">70%</span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Progress Charts */}
                            </div>
                          </div>
                        </div>
                        {/* End Single Progressbar  */}
                      </div>
                    </div>
                  </div>
                  {/* End Single Tab  */}
                  {/* Start Single Tab  */}
                  <div
                    className="tab-pane fade"
                    id="experience"
                    role="tabpanel"
                    aria-labelledby="experience-tab"
                  >
                    <div className="personal-experience-inner mt--40">
                      <div className="row">
                        {/* Start Skill List Area  */}
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="content">
                            <span className="subtitle">2007 - 2010</span>
                            <h4 className="maintitle">Education Quality</h4>
                            <div className="experience-list">
                              {/* Start Single List  */}
                              <div className="resume-single-list">
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Personal Portfolio April Fools</h4>
                                      <span>
                                        University of DVI (1997 - 2001)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.30/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    The education should be very interactual. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div className="resume-single-list">
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4> Examples Of Personal Portfolio</h4>
                                      <span>
                                        College of Studies (2000 - 2002)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.50/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Maecenas finibus nec sem ut imperdiet. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div className="resume-single-list">
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Tips For Personal Portfolio</h4>
                                      <span>
                                        University of Studies (1997 - 2001)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.80/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    If you are going to use a passage. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                            </div>
                          </div>
                        </div>
                        {/* End Skill List Area  */}
                        {/* Start Skill List Area 2nd  */}
                        <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                          <div className="content">
                            <span className="subtitle">2007 - 2010</span>
                            <h4 className="maintitle">Job Experience</h4>
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
                                    Contrary to popular belief. Ut tincidunt est
                                    ac dolor aliquam sodales. Phasellus sed
                                    mauris hendrerit, laoreet sem in, lobortis
                                    mauris hendrerit ante.
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
                                      <span>
                                        Job at Parv Infotech (2008 - 2016)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.95/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Generate Lorem Ipsum which looks. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
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
                                        Works at Plugin Development (2016 -
                                        2020)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>5.00/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Maecenas finibus nec sem ut imperdiet. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
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
                  {/* End Single Tab  */}
                  {/* Start Single Tab  */}
                  <div
                    className="tab-pane fade"
                    id="interview"
                    role="tabpanel"
                    aria-labelledby="interview-tab"
                  >
                    <div className="personal-experience-inner mt--40">
                      <div className="row">
                        {/* Start Skill List Area  */}
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="content">
                            <span className="subtitle">2007 - 2010</span>
                            <h4 className="maintitle">Company Experience</h4>
                            <div className="experience-list">
                              {/* Start Single List  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={500}
                                data-aos-delay={300}
                                data-aos-once="true"
                                className="resume-single-list"
                              >
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Personal Portfolio April Fools</h4>
                                      <span>
                                        University of DVI (1997 - 2001)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.30/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    The education should be very interactual. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={500}
                                data-aos-delay={500}
                                data-aos-once="true"
                                className="resume-single-list"
                              >
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4> Examples Of Personal Portfolio</h4>
                                      <span>
                                        College of Studies (2000 - 2002)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.50/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Maecenas finibus nec sem ut imperdiet. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={500}
                                data-aos-delay={700}
                                data-aos-once="true"
                                className="resume-single-list"
                              >
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Tips For Personal Portfolio</h4>
                                      <span>
                                        University of Studies (1997 - 2001)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.80/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    If you are going to use a passage. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                            </div>
                          </div>
                        </div>
                        {/* End Skill List Area  */}
                        {/* Start Skill List Area 2nd  */}
                        <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                          <div className="content">
                            <span className="subtitle">2007 - 2010</span>
                            <h4 className="maintitle">Job Experience</h4>
                            <div className="experience-list">
                              {/* Start Single List  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={500}
                                data-aos-delay={500}
                                data-aos-once="true"
                                className="resume-single-list"
                              >
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
                                    Contrary to popular belief. Ut tincidunt est
                                    ac dolor aliquam sodales. Phasellus sed
                                    mauris hendrerit, laoreet sem in, lobortis
                                    mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={500}
                                data-aos-delay={700}
                                data-aos-once="true"
                                className="resume-single-list"
                              >
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>The Personal Portfolio Mystery</h4>
                                      <span>
                                        Job at Parv Infotech (2008 - 2016)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>4.95/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Generate Lorem Ipsum which looks. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
                                  </p>
                                </div>
                              </div>
                              {/* End Single List  */}
                              {/* Start Single List  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={500}
                                data-aos-delay={900}
                                data-aos-once="true"
                                className="resume-single-list"
                              >
                                <div className="inner">
                                  <div className="heading">
                                    <div className="title">
                                      <h4>Diploma in Computer Science</h4>
                                      <span>
                                        Works at Plugin Development (2016 -
                                        2020)
                                      </span>
                                    </div>
                                    <div className="date-of-time">
                                      <span>5.00/5</span>
                                    </div>
                                  </div>
                                  <p className="description">
                                    Maecenas finibus nec sem ut imperdiet. Ut
                                    tincidunt est ac dolor aliquam sodales.
                                    Phasellus sed mauris hendrerit, laoreet sem
                                    in, lobortis mauris hendrerit ante.
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
                  {/* End Single Tab  */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Resume Area */}
        {/* Start Testimonia Area  */}
        <div
          className="rn-testimonial-area rn-section-gap section-separator"
          id="testimonial"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">What Clients Say</span>
                  <h2 className="title">Testimonial</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="testimonial-activation testimonial-pb mb--30">
                  {/* Start Single testiminail */}
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <img
                            src="https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--1st.png"
                            alt="Testimonial-image"
                          />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">Parv Infotech</span>
                          <h3 className="title">Nevine Acotanza</h3>
                          <span className="designation">
                            Chief Operating Officer
                          </span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Android App Development</h3>
                            <span className="date">
                              via Upwork - Mar 4, 2015 - Aug 30, 2021
                            </span>
                          </div>
                          <div className="rating">
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                          </div>
                        </div>
                        <div className="seperator" />
                        <p className="discription">
                          Maecenas finibus nec sem ut imperdiet. Ut tincidunt
                          est ac dolor aliquam sodales. Phasellus sed mauris
                          hendrerit, laoreet sem in, lobortis mauris hendrerit
                          ante. Ut tincidunt est ac dolor aliquam sodales
                          phasellus smauris .
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*End Single testiminail */}
                  {/* Start Single testiminail */}
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <img
                            src="https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--2nd.png"
                            alt="Testimonial-image"
                          />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">
                            Bound - Trolola
                          </span>
                          <h3 className="title">Jone Duone Joe</h3>
                          <span className="designation">Operating Officer</span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Web App Development</h3>
                            <span className="date">
                              Upwork - Mar 4, 2016 - Aug 30, 2021
                            </span>
                          </div>
                          <div className="rating">
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                          </div>
                        </div>
                        <div className="seperator" />
                        <p className="discription">
                          Important fact to nec sem ut imperdiet. Ut tincidunt
                          est ac dolor aliquam sodales. Phasellus sed mauris
                          hendrerit, laoreet sem in, lobortis mauris hendrerit
                          ante. Ut tincidunt est ac dolor aliquam sodales
                          phasellus smauris .
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*End Single testiminail */}
                  {/* Start Single testiminail */}
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <img
                            src="https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--3rd.png"
                            alt="Testimonial-image"
                          />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">Glassfisom</span>
                          <h3 className="title">Nevine Dhawan</h3>
                          <span className="designation">CEO Of Officer</span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Android App Design</h3>
                            <span className="date">
                              Fiver - Mar 4, 2015 - Aug 30, 2021
                            </span>
                          </div>
                          <div className="rating">
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                          </div>
                        </div>
                        <div className="seperator" />
                        <p className="discription">
                          No more question for design. Ut tincidunt est ac dolor
                          aliquam sodales. Phasellus sed mauris hendrerit,
                          laoreet sem in, lobortis mauris hendrerit ante. Ut
                          tincidunt est ac dolor aliquam sodales phasellus
                          smauris .
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*End Single testiminail */}
                  {/* Start Single testiminail */}
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <img
                            src="https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--4th.png"
                            alt="Testimonial-image"
                          />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">NCD - Design</span>
                          <h3 className="title">Mevine Thoda</h3>
                          <span className="designation">Marketing Officer</span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">CEO - Marketing</h3>
                            <span className="date">
                              Thoda Department - Mar 4, 2018 - Aug 30, 2021
                            </span>
                          </div>
                          <div className="rating">
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                          </div>
                        </div>
                        <div className="seperator" />
                        <p className="discription">
                          Marcent Of Vanice and treatment. Ut tincidunt est ac
                          dolor aliquam sodales. Phasellus sed mauris hendrerit,
                          laoreet sem in, lobortis mauris hendrerit ante. Ut
                          tincidunt est ac dolor aliquam sodales phasellus
                          smauris .
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*End Single testiminail */}
                  {/* Start Single testiminail */}
                  <div className="testimonial mt--50 mt_md--40 mt_sm--40">
                    <div className="inner">
                      <div className="card-info">
                        <div className="card-thumbnail">
                          <img
                            src="https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--5th.png"
                            alt="Testimonial-image"
                          />
                        </div>
                        <div className="card-content">
                          <span className="subtitle mt--10">Default name</span>
                          <h3 className="title">Davei Luace</h3>
                          <span className="designation">
                            Chief Operating Manager
                          </span>
                        </div>
                      </div>
                      <div className="card-description">
                        <div className="title-area">
                          <div className="title-info">
                            <h3 className="title">Android App Development</h3>
                            <span className="date">
                              via Upwork - Mar 4, 2015 - Aug 30, 2021
                            </span>
                          </div>
                          <div className="rating">
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                            <img
                              src="https://inbio.pixcelsthemes.com/inbio/assets/images/icons/rating.png"
                              alt="rating-image"
                            />
                          </div>
                        </div>
                        <div className="seperator" />
                        <p className="discription">
                          When managment is so important. Ut tincidunt est ac
                          dolor aliquam sodales. Phasellus sed mauris hendrerit,
                          laoreet sem in, lobortis mauris hendrerit ante. Ut
                          tincidunt est ac dolor aliquam sodales phasellus
                          smauris .
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*End Single testiminail */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Testimonia Area  */}
        {/* Start Client Area */}
        <div
          className="rn-client-area rn-section-gap section-separator"
          id="clients"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span className="subtitle">Popular Clients</span>
                  <h2 className="title">Awesome Clients</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt--50 mt_md--40 mt_sm--40">
              <div className="col-lg-4">
                <div className="d-flex flex-wrap align-content-start h-100">
                  <div className="position-sticky clients-wrapper sticky-top rbt-sticky-top-adjust">
                    <ul
                      className="nav tab-navigation-button flex-column nav-pills me-3"
                      id="v-pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="v-pills-home-tab"
                          data-bs-toggle="tab"
                          href="#v-pills-Javascript"
                          role="tab"
                          aria-selected="true"
                        >
                          JavaScript
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="v-pills-profile-tab"
                          data-bs-toggle="tab"
                          href="#v-pills-Design"
                          role="tab"
                          aria-selected="true"
                        >
                          Product Design
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="v-pills-wordpress-tab"
                          data-bs-toggle="tab"
                          href="#v-pills-Wordpress"
                          role="tab"
                          aria-selected="true"
                        >
                          Wordpress
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="v-pills-settings-tabs"
                          data-bs-toggle="tab"
                          href="#v-pills-settings"
                          role="tab"
                          aria-selected="true"
                        >
                          HTML to React
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="v-pills-laravel-tabs"
                          data-bs-toggle="tab"
                          href="#v-pills-laravel"
                          role="tab"
                          aria-selected="true"
                        >
                          React To Laravel
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="v-pills-python-tabs"
                          data-bs-toggle="tab"
                          href="#v-pills-python"
                          role="tab"
                          aria-selected="true"
                        >
                          Python
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="tab-area">
                  <div className="d-flex align-items-start">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div
                        className="tab-pane fade"
                        id="v-pills-Javascript"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                      >
                        <div className="client-card">
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smiths Marth</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Add Dev</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client4.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jone Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Adon Smith</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smitha Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Sultana Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jannat</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Mila Dus</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade show active"
                        id="v-pills-Design"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                      >
                        <div className="client-card">
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smiths Marth</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Add Dev</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client4.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jone Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Adon Smith</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smitha Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Sultana Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jannat</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Mila Dus</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-Wordpress"
                        role="tabpanel"
                        aria-labelledby="v-pills-wordpress-tab"
                      >
                        <div className="client-card">
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smiths Marth</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Add Dev</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client4.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jone Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Adon Smith</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smitha Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Sultana Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jannat</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Mila Dus</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-settings"
                        role="tabpanel"
                        aria-labelledby="v-pills-settings-tabs"
                      >
                        <div className="client-card">
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smiths Marth</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Add Dev</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client4.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jone Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Adon Smith</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smitha Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Sultana Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jannat</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Mila Dus</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-laravel"
                        role="tabpanel"
                        aria-labelledby="v-pills-laravel-tabs"
                      >
                        <div className="client-card">
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smiths Marth</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Add Dev</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client4.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jone Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Adon Smith</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smitha Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Sultana Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jannat</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Mila Dus</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-python"
                        role="tabpanel"
                        aria-labelledby="v-pills-python-tabs"
                      >
                        <div className="client-card">
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smiths Marth</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Add Dev</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client4.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jone Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">John Due</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Adon Smith</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Smitha Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client2.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Sultana Mila</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Jannat</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client5.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Mila Dus</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client1.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                          {/* Start Single Brand  */}
                          <div className="main-content">
                            <div className="inner text-center">
                              <div className="thumbnail">
                                <a href="#">
                                  <img
                                    src="https://inbio.pixcelsthemes.com/inbio/assets/images/client/png/client3.png"
                                    alt="Client-image"
                                  />
                                </a>
                              </div>
                              <div className="seperator" />
                              <div className="client-name">
                                <span>
                                  <a href="#">Marth Smiths</a>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Brand  */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End client section */}
        {/* Pricing Area */}
        <div
          className="rn-pricing-area rn-section-gap section-separator"
          id="pricing"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-xl-5 mb_md--40 mb_sm--40 small-margin-pricing">
                <div className="d-block d-lg-flex text-center d-lg-left section-flex flex-wrap align-content-start h-100">
                  <div className="position-sticky sticky-top rbt-sticky-top-adjust">
                    <div className="section-title text-left">
                      <span className="subtitle text-center text-lg-left">
                        Pricing
                      </span>
                      <h2 className="title text-center text-lg-left">
                        My Pricing
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-xl-7">
                {/* Pricing Area */}
                <div className="navigation-wrapper">
                  <ul className="nav " id="myTab" role="tablist">
                    <li className="nav-item ">
                      <a
                        className="nav-style"
                        id="test-tab"
                        data-bs-toggle="tab"
                        href="#test"
                        role="tab"
                        aria-controls="test"
                        aria-selected="false"
                      >
                        Static
                      </a>
                    </li>
                    <li className="nav-item  recommended">
                      <a
                        className="nav-style active"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="true"
                      >
                        Standard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-style"
                        id="contact-tab"
                        data-bs-toggle="tab"
                        href="#contact"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Premium
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade "
                      id="test"
                      role="tabpanel"
                      aria-labelledby="test-tab"
                    >
                      {/* Pricing Start */}
                      <div className="rn-pricing">
                        <div className="pricing-header">
                          <div className="header-left">
                            <h2 className="title">Make Your Single Page</h2>
                            <span>Elementor</span>
                          </div>
                          <div className="header-right">
                            <span>$30.00</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <p className="description">
                            All the Lorem Ipsum generators on the Internet tend
                            to repeat predefined chunks as necessary
                          </p>
                          <div className="check-wrapper">
                            <div className="left-area">
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>1 Page with Elementor</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Customization</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Responsive Design</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Content Upload</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Customization</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>2 Plugins/Extensions</p>
                              </div>
                            </div>
                            <div className="right-area">
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>multipage Elementor</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Figma</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>MAintaine Design</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Content Upload</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design With XD</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>8 Plugins/Extensions</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pricing-footer">
                          <a href="#" className="rn-btn d-block">
                            <span>ORDER NOW</span>
                            <i data-feather="arrow-right" />
                          </a>
                          <div className="time-line">
                            <div className="single-cmt d-flex">
                              <i data-feather="clock" />
                              <span>2 Days Delivery</span>
                            </div>
                            <div className="single-cmt d-flex">
                              <i data-feather="activity" />
                              <span>Unlimited Revission</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End */}
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      {/* Pricing Start */}
                      <div className="rn-pricing">
                        <div className="pricing-header">
                          <div className="header-left">
                            <h2 className="title">Design Make this Page</h2>
                            <span>Elementor</span>
                          </div>
                          <div className="header-right">
                            <span>$50.00</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <p className="description">
                            Making this the first true generator on the
                            Internet. It uses a dictionary &amp; plugin
                            Development.
                          </p>
                          <div className="check-wrapper">
                            <div className="left-area">
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>1 Page with Elementor</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Customization</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Responsive Design</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Content Upload</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Customization</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>2 Plugins/Extensions</p>
                              </div>
                            </div>
                            <div className="right-area">
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>multipage Elementor</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Figma</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>MAintaine Design</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Content Upload</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design With XD</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>8 Plugins/Extensions</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pricing-footer">
                          <a href="#" className="rn-btn d-block">
                            <span>ORDER NOW</span>
                            <i data-feather="arrow-right" />
                          </a>
                          <div className="time-line d-flex">
                            <div className="single-cmt d-flex">
                              <i data-feather="clock" />
                              <span>2 Days Delivery</span>
                            </div>
                            <div className="single-cmt d-flex">
                              <i data-feather="activity" />
                              <span>Unlimited Revission</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End */}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                    >
                      {/* Pricing Start */}
                      <div className="rn-pricing">
                        <div className="pricing-header">
                          <div className="header-left">
                            <h2 className="title">
                              Customize Your Single Page
                            </h2>
                            <span>Elementor</span>
                          </div>
                          <div className="header-right">
                            <span>$90.00</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <p className="description">
                            I will install your desire theme and made like Theme
                            demo and customize your single page( homepage)
                          </p>
                          <div className="check-wrapper">
                            <div className="left-area">
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>1 Page with Elementor</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Customization</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Responsive Design</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Content Upload</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Customization</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>2 Plugins/Extensions</p>
                              </div>
                            </div>
                            <div className="right-area">
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>multipage Elementor</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design Figma</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>MAintaine Design</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Content Upload</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>Design With XD</p>
                              </div>
                              <div className="check d-flex">
                                <i data-feather="check" />
                                <p>8 Plugins/Extensions</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pricing-footer">
                          <a href="#" className="rn-btn d-block">
                            <span>ORDER NOW</span>
                            <i data-feather="arrow-right" />
                          </a>
                          <div className="time-line d-flex">
                            <div className="single-cmt d-flex">
                              <i data-feather="clock" />
                              <span>2 Days Delivery</span>
                            </div>
                            <div className="single-cmt d-flex">
                              <i data-feather="activity" />
                              <span>Unlimited Revission</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End */}
                    </div>
                  </div>
                </div>
                {/* End */}
              </div>
            </div>
          </div>
        </div>
        {/* pricing area */}
        {/* Start News Area */}
        <div
          className="rn-blog-area rn-section-gap section-separator"
          id="blog"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={100}
                  data-aos-once="true"
                  className="section-title text-center"
                >
                  <span className="subtitle">
                    Visit my blog and keep your feedback
                  </span>
                  <h2 className="title">My Blog</h2>
                </div>
              </div>
            </div>
            <div className="row row--25 mt--30 mt_md--10 mt_sm--10">
              {/* Start Single blog */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={100}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 mt--30"
              >
                <div
                  className="rn-blog"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenters"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/blog/blog-01.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Canada</a>
                        </div>
                        <div className="meta">
                          <span>
                            <i className="feather-clock" /> 2 min read
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          T-shirt design is the part of design
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single blog */}
              {/* Start Single blog */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={150}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 mt--30"
              >
                <div
                  className="rn-blog"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenters"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/blog/blog-02.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Development</a>
                        </div>
                        <div className="meta">
                          <span>
                            <i className="feather-clock" /> 2 hour read
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          The services provide for design
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single blog */}
              {/* Start Single blog */}
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={200}
                data-aos-once="true"
                className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 mt--30"
              >
                <div
                  className="rn-blog"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenters"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <a href="javascript:void(0)">
                        <img
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/blog/blog-03.jpg"
                          alt="Personal Portfolio Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="category-info">
                        <div className="category-list">
                          <a href="javascript:void(0)">Application</a>
                        </div>
                        <div className="meta">
                          <span>
                            <i className="feather-clock" /> 5 min read
                          </span>
                        </div>
                      </div>
                      <h4 className="title">
                        <a href="javascript:void(0)">
                          Mobile app landing design &amp; app maintain
                          <i className="feather-arrow-up-right" />
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single blog */}
            </div>
          </div>
        </div>
        {/* ENd Mews Area */}
        {/* Start Contact section */}
        <div
          className="rn-contact-area rn-section-gap section-separator"
          id="contacts"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="subtitle">Contact</span>
                  <h2 className="title">Contact With Me</h2>
                </div>
              </div>
            </div>
            <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
              <div className="col-lg-5">
                <div className="contact-about-area">
                  <div className="thumbnail">
                    <img
                      src="https://inbio.pixcelsthemes.com/inbio/assets/images/contact/contact1.png"
                      alt="contact-img"
                    />
                  </div>
                  <div className="title-area">
                    <h4 className="title">Nevine Acotanza</h4>
                    <span>Chief Operating Officer</span>
                  </div>
                  <div className="description">
                    <p>
                      I am available for freelance work. Connect with me via and
                      call in to my account.
                    </p>
                    <span className="phone">
                      Phone: <a href="tel:01941043264">+01234567890</a>
                    </span>
                    <span className="mail">
                      Email:
                      <a href="mailto:admin@example.com">admin@example.com</a>
                    </span>
                  </div>
                  <div className="social-area">
                    <div className="name">FIND WITH ME</div>
                    <div className="social-icone">
                      <a href="#">
                        <i data-feather="facebook" />
                      </a>
                      <a href="#">
                        <i data-feather="linkedin" />
                      </a>
                      <a href="#">
                        <i data-feather="instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div data-aos-delay={600} className="col-lg-7 contact-input">
                <div className="contact-form-wrapper">
                  <div className="introduce">
                    <form
                      className="rnt-contact-form rwt-dynamic-form row"
                      id="contact-form"
                      method="POST"
                      action="https://inbio.pixcelsthemes.com/inbio/mail.php"
                    >
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="contact-name">Your Name</label>
                          <input
                            className="form-control form-control-lg"
                            name="contact-name"
                            id="contact-name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="contact-phone">Phone Number</label>
                          <input
                            className="form-control"
                            name="contact-phone"
                            id="contact-phone"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="contact-email">Email</label>
                          <input
                            className="form-control form-control-sm"
                            id="contact-email"
                            name="contact-email"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="subject">subject</label>
                          <input
                            className="form-control form-control-sm"
                            id="subject"
                            name="subject"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="contact-message">Your Message</label>
                          <textarea
                            name="contact-message"
                            id="contact-message"
                            cols={30}
                            rows={10}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button
                          name="submit"
                          type="submit"
                          id="submit"
                          className="rn-btn"
                        >
                          <span>SEND MESSAGE</span>
                          <i data-feather="arrow-right" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Contuct section */}
        {/* Modal Portfolio Body area Start */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i data-feather="x" />
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="portfolio-popup-thumbnail">
                      <div className="image">
                        <img
                          className="w-100"
                          src="https://inbio.pixcelsthemes.com/inbio/assets/images/portfolio/portfolio-04.jpg"
                          alt="slide"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="text-content">
                      <h3>
                        <span>Featured - Design</span> App Design Development.
                      </h3>
                      <p className="mb--30">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cupiditate distinctio assumenda explicabo veniam
                        temporibus eligendi.
                      </p>
                      <p>
                        Consectetur adipisicing elit. Cupiditate distinctio
                        assumenda. dolorum alias suscipit rerum maiores aliquam
                        earum odit, nihil culpa quas iusto hic minus!
                      </p>
                      <div className="button-group mt--20">
                        <a href="#" className="rn-btn thumbs-icon">
                          <span>LIKE THIS</span>
                          <i data-feather="thumbs-up" />
                        </a>
                        <a href="#" className="rn-btn">
                          <span>VIEW PROJECT</span>
                          <i data-feather="chevron-right" />
                        </a>
                      </div>
                    </div>
                    {/* End of .text-content */}
                  </div>
                </div>
                {/* End of .row Body*/}
              </div>
            </div>
          </div>
        </div>
        {/* End Modal Portfolio area */}
        {/* Modal Blog Body area Start */}
        <div
          className="modal fade"
          id="exampleModalCenters"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-news"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i data-feather="x" />
                  </span>
                </button>
              </div>
              {/* End of .modal-header */}
              <div className="modal-body">
                <img
                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/blog/blog-big-01.jpg"
                  alt="news modal"
                  className="img-fluid modal-feat-img"
                />
                <div className="news-details">
                  <span className="date">2 May, 2021</span>
                  <h2 className="title">
                    Digital Marketo to Their New Office.
                  </h2>
                  <p>
                    Nobis eleifend option congue nihil imperdiet doming id quod
                    mazim placerat facer possim assum. Typi non habent
                    claritatem insitam; est usus legentis in iis qui facit eorum
                    claritatem. Investigationes demonstraverunt lectores legere
                    me lius quod ii legunt saepius. Claritas est etiam processus
                    dynamicus, qui sequitur mutationem consuetudium lectorum.
                  </p>
                  <h4>Nobis eleifend option conguenes.</h4>
                  <p>
                    Mauris tempor, orci id pellentesque convallis, massa mi
                    congue eros, sed posuere massa nunc quis dui. Integer ornare
                    varius mi, in vehicula orci scelerisque sed. Fusce a massa
                    nisi. Curabitur sit amet suscipit nisl. Sed eget nisl
                    laoreet, suscipit enim nec, viverra eros. Nunc imperdiet
                    risus leo, in rutrum erat dignissim id.
                  </p>
                  <p>
                    Ut rhoncus vestibulum facilisis. Duis et lorem vitae ligula
                    cursus venenatis. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Nunc
                    vitae nisi tortor. Morbi leo nulla, posuere vel lectus a,
                    egestas posuere lacus. Fusce eleifend hendrerit bibendum.
                    Morbi nec efficitur ex.
                  </p>
                  <h4>Mauris tempor, orci id pellentesque.</h4>
                  <p>
                    Nulla non ligula vel nisi blandit egestas vel eget leo.
                    Praesent fringilla dapibus dignissim. Pellentesque quis quam
                    enim. Vestibulum ultrices, leo id suscipit efficitur, odio
                    lorem rhoncus dolor, a facilisis neque mi ut ex. Quisque
                    tempor urna a nisi pretium, a pretium massa tristique.
                    Nullam in aliquam diam. Maecenas at nibh gravida, ornare
                    eros non, commodo ligula. Sed efficitur sollicitudin auctor.
                    Quisque nec imperdiet purus, in ornare odio. Quisque odio
                    felis, vestibulum et.
                  </p>
                </div>
                {/* Comment Section Area Start */}
                <div className="comment-inner">
                  <h3 className="title mb--40 mt--50">Leave a Reply</h3>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-12">
                        <div className="rnform-group">
                          <input type="text" placeholder="Name" />
                        </div>
                        <div className="rnform-group">
                          <input type="email" placeholder="Email" />
                        </div>
                        <div className="rnform-group">
                          <input type="text" placeholder="Website" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-12">
                        <div className="rnform-group">
                          <textarea placeholder="Comment" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <a className="rn-btn" href="#">
                          <span>SUBMIT NOW</span>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Comment Section End */}
              </div>
              {/* End of .modal-body */}
            </div>
          </div>
        </div>
        {/* End Modal Blog area */}
        {/* Back to  top Start */}
        <div className="backto-top">
          <div>
            <i data-feather="arrow-up" />
          </div>
        </div>
        {/* Back to top end */}
        {/* Start Right Demo  */}
        <div className="rn-right-demo">
          <button className="demo-button">
            <span className="text">Demos</span>
          </button>
        </div>
        {/* End Right Demo  */}
        {/* Start Modal Area  */}
        <div className="demo-modal-area">
          <div className="wrapper">
            <div className="close-icon">
              <button className="demo-close-btn">
                <span className="feather-x" />
              </button>
            </div>
            <div className="rn-modal-inner">
              <div className="demo-top text-center">
                <h4 className="title">InBio</h4>
                <p className="subtitle">
                  Its a personal portfolio template. You can built any personal
                  website easily.
                </p>
              </div>
              <ul
                className="popuptab-area nav nav-tabs"
                id="popuptab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active demo-dark"
                    id="demodark-tab"
                    data-bs-toggle="tab"
                    href="#demodark"
                    role="tab"
                    aria-controls="demodark"
                    aria-selected="true"
                  >
                    Dark Demo
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link demo-light"
                    id="demolight-tab"
                    data-bs-toggle="tab"
                    href="#demolight"
                    role="tab"
                    aria-controls="demolight"
                    aria-selected="false"
                  >
                    Light Demo
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="popuptabContent">
                <div
                  className="tab-pane show active"
                  id="demodark"
                  role="tabpanel"
                  aria-labelledby="demodark-tab"
                >
                  <div className="content">
                    <div className="row">
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="index.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/main-demo.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="index.html">Main Demo</a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-2">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-technician.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/index-technician.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-technician.html">
                                  Technician
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-2">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-model.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-model-v2.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-model.html">
                                  Model
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-1">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-consulting.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-consulting.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-consulting.html">
                                  Consulting
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-1">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/fashion-designer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/fashion-designer.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/fashion-designer.html">
                                  Fashion Designer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-developer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/developer.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-developer.html">
                                  Developer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/instructor-fitness.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/instructor-fitness.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/instructor-fitness.html">
                                  Fitness Instructor
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-1">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-web-Developer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-model.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-web-Developer.html">
                                  Web Developer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-designer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-video.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-designer.html">
                                  Designer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-content-writer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/text-rotet.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-content-writer.html">
                                  Content Writter
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-instructor.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/index-boxed.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-instructor.html">
                                  Instructor
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-freelancer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-sticky.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-freelancer.html">
                                  Freelancer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-photographer.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/index-bg-image.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-photographer.html">
                                  Photographer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-politician.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/front-end.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-politician.html">
                                  Politician
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo coming-soon">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="#">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/coming-soon.png"
                                  alt="Personal Portfolio"
                                />
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="#">Accountant</a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane"
                  id="demolight"
                  role="tabpanel"
                  aria-labelledby="demolight-tab"
                >
                  <div className="content">
                    <div className="row">
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/main-demo-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-white-version.html">
                                  Main Demo
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-2">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-technician-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/index-technician-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-technician-white-version.html">
                                  Technician
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-2">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-model-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-model-v2-white.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-model-white-version.html">
                                  Model
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-1">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-consulting-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-consulting-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-consulting-white-version.html">
                                  Consulting
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-1">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/fashion-designer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/fashion-designer-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/fashion-designer-white-version.html">
                                  Fashion Designer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-developer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/developer-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-developer-white-version.html">
                                  Developer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/instructor-fitness-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/instructor-fitness-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/instructor-fitness-white-version.html">
                                  Fitness Instructor
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner badge-1">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-web-developer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-model-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-web-developer-white-version.html">
                                  Web Developer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-designer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-video-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-designer-white-version.html">
                                  Designer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-content-writer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/text-rotet-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-content-writer-white-version.html">
                                  Content Writter
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-instructor-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/index-boxed-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-instructor-white-version.html">
                                  Instructor
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-freelancer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/home-sticky-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-freelancer-white-version.html">
                                  Freelancer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/home-photographer-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/index-bg-image-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/home-photographer-white-version.html">
                                  Photographer
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="https://inbio.pixcelsthemes.com/inbio/index-politician-white-version.html">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/front-end-white-version.png"
                                  alt="Personal Portfolio"
                                />
                                <span className="overlay-content">
                                  <span className="overlay-text">
                                    View Demo
                                    <i className="feather-external-link" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="https://inbio.pixcelsthemes.com/inbio/index-politician-white-version.html">
                                  Politician
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                      {/* Start Single Content  */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-demo coming-soon">
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="#">
                                <img
                                  className="w-100"
                                  src="https://inbio.pixcelsthemes.com/inbio/assets/images/demo/coming-soon.png"
                                  alt="Personal Portfolio"
                                />
                              </a>
                            </div>
                            <div className="inner">
                              <h3 className="title">
                                <a href="#">Accountant</a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Content  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Modal Area  */}
      </main>
    </>
  );
}
