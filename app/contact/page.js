"use client";

import aboutData from "@/data/about.json";
import FeatherInit from "@/components/FeatherInit";
import Image from "next/image";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { EMAILJS_CONFIG, RECAPTCHA_CONFIG } from "@/lib/config";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import ClientOnly from "@/components/ClientOnly";

export default function ContactSection() {
  const { name, title, profileImage, contact } = aboutData;
  const formRef = useRef();
  const recaptchaRef = useRef();
  const { errors, validateForm, clearFieldError } = useFormValidation();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationRules = {
    name: { required: true, minLength: 2 },
    email: { email: true },
    phone: { phone: true },
    subject: { required: true, minLength: 3 },
    message: { required: true, minLength: 10 },
    requireContactMethod: true,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    })); // Clear field error when user starts typing
    if (errors[name]) {
      clearFieldError(name);
    }
    // Clear contact method errors when user types in either email or phone
    if (name === "email" || name === "phone") {
      if (errors.email && errors.phone) {
        // If both fields have the same contact method error, clear both
        const emailHasContactError = errors.email.includes(
          "Please provide at least one contact method"
        );
        const phoneHasContactError = errors.phone.includes(
          "Please provide at least one contact method"
        );

        if (emailHasContactError && phoneHasContactError) {
          clearFieldError("email");
          clearFieldError("phone");
        }
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const isFormValid = validateForm(formData, validationRules);
    if (!isFormValid) {
      // Don't show toast for validation errors, the inline validation will handle it
      return;
    }

    // Verify reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      showError("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        name: name,
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.userId
      );

      showSuccess(
        "Thank you! Your message has been sent successfully. I'll get back to you soon."
      );

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      showError(
        "Sorry, there was an error sending your message. Please try again or contact me directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FeatherInit />
      <div className="mt-20 rn-contact-area rn-section-gap" id="contacts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <span className="subtitle">Let&apos;s Get In Touch</span>
                <h2 className="title">Contact With Me</h2>
              </div>
            </div>
          </div>
          <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
            <div className="col-lg-5">
              <div className="contact-about-area">
                <div className="thumbnail">
                  <Image
                    src="/images/contact1.png"
                    alt={`${name} - Contact Image`}
                    width={400}
                    height={400}
                    priority
                    className="w-100"
                  />
                </div>
                <div className="title-area">
                  <h4 className="title">{name}</h4>
                  <span>{title[0]}</span>
                </div>
                <div className="description">
                  <p>
                    I am available for freelance work. Connect with me via phone
                    or email.
                  </p>
                  <span className="phone">
                    Phone: <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </span>
                  <span className="mail">
                    Email:
                    <a href={`mailto:${contact.email}`}> {contact.email}</a>
                  </span>
                </div>
                <div>
                  <div className="name mb-4 font-bold">FIND WITH ME</div>
                  <div className="social-platforms">
                    {contact.linkedin && (
                      <div className="social-platform-item d-flex align-items-center mb-3">
                        <div className="social-icon-box me-3">
                          <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i data-feather="linkedin" />
                          </a>
                        </div>
                        <div className="social-platform-info">
                          <div className="platform-name font-bold">
                            LinkedIn
                          </div>
                          <div className="platform-link">
                            <a
                              href={contact.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              linkedin.com/in/rakesh-nandakumar
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {contact.github && (
                      <div className="social-platform-item d-flex align-items-center mb-3">
                        <div className="social-icon-box me-3">
                          <a
                            href={contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i data-feather="github" />
                          </a>
                        </div>
                        <div className="social-platform-info">
                          <div className="platform-name font-bold">GitHub</div>
                          <div className="platform-link">
                            <a
                              href={contact.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              github.com/Rakesh4584
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {contact.portfolio && (
                      <div className="social-platform-item d-flex align-items-center mb-3">
                        <div className="social-icon-box me-3">
                          <a
                            href={contact.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i data-feather="external-link" />
                          </a>
                        </div>
                        <div className="social-platform-info">
                          <div className="platform-name font-bold">
                            Portfolio
                          </div>
                          <div className="platform-link">
                            <a
                              href={contact.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              rakesh-nandakumar.netlify.app
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {contact.instagram && (
                      <div className="social-platform-item d-flex align-items-center mb-3">
                        <div className="social-icon-box me-3">
                          <a
                            href={contact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i data-feather="instagram" />
                          </a>
                        </div>
                        <div className="social-platform-info">
                          <div className="platform-name font-bold">
                            Instagram
                          </div>
                          <div className="platform-link">
                            <a
                              href={contact.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              @rakesh_nandakumar
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {contact.facebook && (
                      <div className="social-platform-item d-flex align-items-center mb-3">
                        <div className="social-icon-box me-3">
                          <a
                            href={contact.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i data-feather="facebook" />
                          </a>
                        </div>
                        <div className="social-platform-info">
                          <div className="platform-name font-bold">
                            Facebook
                          </div>
                          <div className="platform-link">
                            <a
                              href={contact.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              facebook.com/rakesh.nandakumar
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div data-aos-delay={600} className="col-lg-7 contact-input">
              <div className="contact-form-wrapper">
                <div className="introduce">
                  <form
                    ref={formRef}
                    className="rnt-contact-form rwt-dynamic-form row"
                    onSubmit={handleSubmit}
                  >
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="contact-name">
                          Your Name <span className="text-danger">*</span>
                        </label>
                        <input
                          className={`form-control form-control-lg ${
                            errors.name
                              ? "is-invalid"
                              : formData.name
                              ? "is-valid"
                              : ""
                          }`}
                          name="name"
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder=""
                        />
                        {errors.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="contact-phone">
                          Phone Number
                          <small className="text-muted"> (Optional)</small>
                        </label>
                        <input
                          className={`form-control ${
                            errors.phone
                              ? "is-invalid"
                              : formData.phone && formData.phone.length > 0
                              ? "is-valid"
                              : ""
                          }`}
                          name="phone"
                          id="contact-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder=""
                        />
                        {errors.phone && (
                          <div className="invalid-feedback d-block">
                            {errors.phone[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="contact-email">
                          Email
                          <small className="text-muted">
                            (Optional if phone is provided)
                          </small>
                        </label>
                        <input
                          className={`form-control form-control-sm ${
                            errors.email
                              ? "is-invalid"
                              : formData.email &&
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                  formData.email
                                )
                              ? "is-valid"
                              : ""
                          }`}
                          id="contact-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder=""
                        />
                        {errors.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="subject">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input
                          className={`form-control form-control-sm ${
                            errors.subject
                              ? "is-invalid"
                              : formData.subject
                              ? "is-valid"
                              : ""
                          }`}
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder=""
                        />
                        {errors.subject && (
                          <div className="invalid-feedback d-block">
                            {errors.subject[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="contact-message">
                          Your Message <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="message"
                          id="contact-message"
                          cols={30}
                          rows={10}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project, requirements, or any questions you have..."
                          className={`form-control ${
                            errors.message
                              ? "is-invalid"
                              : formData.message
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.message && (
                          <div className="invalid-feedback d-block">
                            {errors.message[0]}
                          </div>
                        )}
                        <small className="form-text text-muted">
                          {formData.message.length}/10 minimum characters
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-12 lg:h-1/7"></div>
                    {/* reCAPTCHA */}
                    <div className="mt-auto">
                      <div className="col-lg-12">
                        <div className="form-group d-flex justify-content-center">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_CONFIG.siteKey}
                            theme="light"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`rn-btn ${isSubmitting ? "loading" : ""}`}
                          style={{
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                          }}
                        >
                          <span>
                            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                          </span>
                          {isSubmitting && (
                            <div
                              className="spinner-border spinner-border-sm ms-2"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ section pushed to bottom with additional margin */}
        <div
          id="questions"
          className="rn-questions-area rn-section-gap"
          style={{ marginTop: "20px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={100}
                  data-aos-once="true"
                  className="section-title text-center aos-init aos-animate"
                >
                  <h2 className="title">Frequently Asked Questions</h2>
                </div>
              </div>
            </div>
            <div className="row mt--10">
              <div className="col-12 mt_experience">
                {[
                  {
                    question: "What services do you offer?",
                    answer:
                      "I offer a range of services including web application development, mobile app development, cloud solutions, business applications, data modeling, IoT solutions, desktop applications, and technical consultation.",
                  },
                  {
                    question: "What is your typical project timeline?",
                    answer:
                      "Project timelines vary depending on scope and complexity. Small projects might take 2-4 weeks, while larger projects can span several months. I always provide a detailed timeline during the project planning phase.",
                  },
                  {
                    question: "How do you handle project pricing?",
                    answer:
                      "I offer both fixed-price quotes for well-defined projects and hourly rates for ongoing work or projects with evolving requirements. The pricing model is discussed and agreed upon before project initiation.",
                  },
                  {
                    question: "Do you offer ongoing maintenance and support?",
                    answer:
                      "Yes, I provide ongoing maintenance and support packages for completed projects. This ensures your application continues to run smoothly and remains up-to-date with the latest security patches and features.",
                  },
                  {
                    question: "Can you work with existing codebases?",
                    answer:
                      "Absolutely. I have extensive experience working with existing codebases, performing code audits, implementing new features, and refactoring legacy code to improve performance and maintainability.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-duration={500}
                    data-aos-delay={100 + index * 100}
                    data-aos-once="true"
                    className="experience-style-two aos-init aos-animate"
                  >
                    <div className="experience-left">
                      <div className="experience-center">
                        <h4 className="experience-title">{item.question}</h4>
                        <p className="disc">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ClientOnly>
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </ClientOnly>
    </>
  );
}
