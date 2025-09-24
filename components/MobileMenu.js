"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Menu } from "react-feather";
import { useState, useEffect } from "react";

export default function MobileMenu({ headerData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (href) => {
    closeMobileMenu();
    router.push(href);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".popup-mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button in Header Right */}
      <div
        className="hamberger-menu d-block d-xl-none"
        onClick={toggleMobileMenu}
        style={{
          padding: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "40px",
          height: "40px",
          marginLeft: "8px",
        }}
      >
        <Menu
          id="menuBtn"
          className="feather-menu humberger-menu mr-10"
          size={24}
          style={{
            color: "var(--color-body)",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`popup-mobile-menu ${isMobileMenuOpen ? "menu-open" : ""}`}
      >
        <div className="menu-overlay" onClick={closeMobileMenu}></div>
        <div className="inner">
          <div className="menu-top">
            <div className="menu-header">
              <Link href="/" className="logo" onClick={closeMobileMenu}>
                <Image
                  src="/avatar.png"
                  alt="Personal Portfolio"
                  width={50}
                  height={50}
                  className="object-cover rounded-full"
                />
              </Link>
              <div className="close-button">
                <button
                  className="close-menu-activation close"
                  onClick={closeMobileMenu}
                >
                  <X className="feather feather-x" />
                </button>
              </div>
            </div>
            <p className="discription">
              Personal portfolio showcasing my work and expertise. Fully
              customizable and modern.
            </p>
          </div>
          <div className="content">
            <nav className="mainmenu-nav">
              <ul className="primary-menu nav nav-pills">
                {headerData.navigation.map((item, index) => (
                  <li key={index} className="nav-item">
                    <a
                      href={item.href}
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Share Area */}
            <div className="social-share-style-1 mt--40">
              <span className="title">find with me</span>
              <ul className="social-share d-flex liststyle">
                <li className="facebook">
                  <a href="#" aria-label="Facebook">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </li>
                <li className="instagram">
                  <a href="#" aria-label="Instagram">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-instagram"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </li>
                <li className="linkedin">
                  <a href="#" aria-label="LinkedIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mobile-menu-bottom">
              <a
                className="rn-btn mobile-cta-btn"
                target={headerData?.ctaButton?.target || "_blank"}
                href={headerData?.ctaButton?.href || "#"}
                onClick={(e) => {
                  closeMobileMenu();
                }}
              >
                <span>{headerData?.ctaButton?.label || "Download CV"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .popup-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .popup-mobile-menu.menu-open {
          opacity: 1;
          visibility: visible;
        }

        .menu-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .inner {
          position: relative;
          background: var(--color-white);
          height: 100vh;
          width: 300px;
          padding: 30px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          z-index: 10001;
        }

        .popup-mobile-menu.menu-open .inner {
          transform: translateX(0);
        }

        .menu-top {
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e5e5;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .close-button {
          cursor: pointer;
        }

        .close-menu-activation {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          color: var(--color-body);
        }

        .discription {
          font-size: 14px;
          color: var(--color-subtitle);
          line-height: 1.5;
          margin: 0;
        }

        .content {
          display: flex;
          flex-direction: column;
          height: calc(100% - 120px);
          position: relative;
          z-index: 10001;
        }

        .primary-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
          position: relative;
          z-index: 10002;
        }

        .primary-menu .nav-item {
          margin-bottom: 15px;
        }

        .primary-menu .nav-link {
          display: block;
          padding: 12px 0;
          font-size: 16px;
          font-weight: 500;
          color: var(--color-body);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          z-index: 10002;
          cursor: pointer;
          pointer-events: auto;
        }

        .primary-menu .nav-link:hover,
        .primary-menu .nav-link.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }

        .social-share-style-1 {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
        }

        .social-share-style-1 .title {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-body);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
          display: block;
        }

        .social-share {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 10px;
        }

        .social-share li a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #f8f9fa;
          border-radius: 6px;
          color: var(--color-body);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-share li a:hover {
          background: var(--color-primary);
          color: white;
          transform: translateY(-2px);
        }

        .mobile-menu-bottom {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
        }

        .mobile-cta-btn {
          width: 100%;
          text-align: center;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          background: var(--color-primary);
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .mobile-cta-btn:hover {
          background: #e55a2b;
          transform: translateY(-2px);
        }

        .hamberger-trigger {
          cursor: pointer;
        }

        .hamburger-menu {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .hamburger-menu span {
          width: 25px;
          height: 3px;
          background-color: var(--color-body);
          margin: 3px 0;
          transition: 0.3s;
        }

        .hamberger-menu {
          cursor: pointer;
          position: relative;
          z-index: 999;
        }

        .feather-menu {
          transition: all 0.3s ease;
        }

        .feather-menu:hover {
          color: var(--color-primary);
        }

        /* Ensure mobile menu button is always visible */
        @media (max-width: 1199px) {
          .hamberger-menu {
            position: relative;
            right: 0;
            margin-left: auto;
            flex-shrink: 0;
          }
        }

        @media (max-width: 575px) {
          .hamberger-menu {
            margin-left: 4px;
            padding: 4px !important;
            min-width: 36px !important;
            height: 36px !important;
          }
        }

        .close-menu {
          cursor: pointer;
        }

        @media (prefers-color-scheme: dark) {
          .inner {
            background: var(--color-dark);
            color: var(--color-white);
          }

          .menu-top {
            border-bottom-color: #333;
          }

          .social-share-style-1 {
            border-top-color: #333;
          }

          .mobile-menu-bottom {
            border-top-color: #333;
          }

          .hamburger-menu span {
            background-color: var(--color-white);
          }

          .close-menu-activation {
            color: var(--color-white);
          }

          .social-share li a {
            background: #333;
            color: var(--color-white);
          }

          .social-share li a:hover {
            background: var(--color-primary);
          }
        }
      `}</style>
    </>
  );
}
