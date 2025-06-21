"use client";

import Link from 'next/link';
import aboutData from '@/data/about.json';
import { useTheme } from '@/contexts/ThemeContext';
import FeatherIcon from './FeatherIcon';

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const { name, title, contact, shortBio } = aboutData;
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'Cloud Solutions',
    'Technical Consulting',
    'API Development'
  ];

  return (
    <footer className="rn-footer-area rn-section-gap section-separator">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row mb--60">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 col-12 mb_md--40 mb_sm--40">
            <div className="footer-widget">
              <div className="logo mb--30">
                <Link href="/">
                  <h3 className="footer-logo-text">{name}</h3>
                </Link>
              </div>
              <p className="description text-2xl">{shortBio}</p>

              {/* Social Links */}
              <div className="social-icon-inner mt--30">
                <ul className="social-icons d-flex liststyle" style={{ gap: '40px' }}>
                  {contact.linkedin && (
                    <li>
                      <Link                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                      >
                        <FeatherIcon name="linkedin" size={20} />
                      </Link>
                    </li>
                  )}
                  {contact.github && (
                    <li>                      <Link
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <FeatherIcon name="github" size={20} />
                      </Link>
                    </li>
                  )}
                  {contact.instagram && (
                    <li>                      <Link
                        href={contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Profile"
                      >
                        <FeatherIcon name="instagram" size={20} />
                      </Link>
                    </li>
                  )}
                  {contact.facebook && (
                    <li>                      <Link
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook Profile"
                      >
                        <FeatherIcon name="facebook" size={20} />
                      </Link>
                    </li>
                  )}
                  {contact.portfolio && (
                    <li>                      <Link
                        href={contact.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Portfolio Website"
                      >
                        <FeatherIcon name="external-link" size={20} />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6 mb_md--40 mb_sm--40">
            <div className="footer-widget">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-link mt--20">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 col-6 mb_md--40 mb_sm--40">
            <div className="footer-widget">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-link mt--20">
                {services.map((service, index) => (
                  <li key={index}>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 col-12">
            <div className="footer-widget">
              <h4 className="footer-title">Get In Touch</h4>
              <div className="footer-contact mt--20">                {contact.email && (
                  <div className="contact-item mb--15">
                    <div className="contact-icon">
                      <FeatherIcon name="mail" size={20} />
                    </div>
                    <div className="contact-content">
                      <Link href={`mailto:${contact.email}`}>
                        {contact.email}
                      </Link>
                    </div>
                  </div>
                )}                {contact.phone && (
                  <div className="contact-item mb--15">
                    <div className="contact-icon">
                      <FeatherIcon name="phone" size={20} />
                    </div>
                    <div className="contact-content">
                      <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
                    </div>
                  </div>
                )}                {contact.address && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FeatherIcon name="map-pin" size={20} />
                    </div>
                    <div className="contact-content">
                      <span>{contact.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row">
          <div className="col-lg-12">
            <div id="footer-area" className="footer-area text-center pt--40">
              <div className="footer-bottom d-md-flex justify-content-between align-items-center">
                <div className="footer-left">
                  <p className="description mb_md--20">
                    © {currentYear} {name}. All rights reserved.
                  </p>
                </div>
                <div className="footer-right">
                  <p className="description">
                    {title[0]} | {title[1]} | {title[2]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
