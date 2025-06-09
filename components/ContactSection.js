export default function ContactSection() {
  return (
    <div
      className="rn-contact-area rn-section-gap section-separator"
      id="contacts"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">
                Ready to bring your ideas to life?
              </span>
              <h2 className="title">Get in Touch</h2>
              <p
                className="description"
                style={{
                  marginTop: "15px",
                  fontSize: "16px",
                  color: "#6c757d",
                }}
              >
                Let&apos;s collaborate on your next project and create something
                amazing together.
              </p>
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
                        required
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
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        className="form-control form-control-sm"
                        id="subject"
                        name="subject"
                        type="text"
                        required
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
                        required
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
  );
}
