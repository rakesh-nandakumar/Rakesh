import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "react-feather";
import headerData from "../data/header.json";
// COMMENTED OUT - Theme toggle functionality disabled
// import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
      <div className="header-wrapper rn-popup-mobile-menu m--0 row align-items-center">
        {/* Start Header Left */}
        <div className="col-lg-2 col-6">
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/avatar.png"
                  alt="inbio logo"
                  width={50}
                  height={50}
                  className="d-block object-cover rounded-full"
                  style={{
                    minWidth: "50px",
                    minHeight: "50px",
                    maxWidth: "50px",
                    maxHeight: "50px",
                  }}
                />
              </Link>
            </div>
            <div className="title ml-2 my-auto">RAKESH</div>
          </div>
        </div>
        {/* End Header Left */}

        {/* Start Header Center */}
        <div className="col-lg-10 col-6">
          <div className="header-center">
            <nav
              id="sideNav"
              className="mainmenu-nav navbar-example2 d-none d-xl-block onepagenav"
            >
              <ul className="primary-menu nav nav-pills">
                {headerData.navigation.map((item, index) => (
                  <li key={index} className="nav-item">
                    <Link className="nav-link" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Mobile Menu Button */}
            <div className="header-right rn-mobile-menu d-block d-xl-none">
              <div className="hamberger-trigger">
                <div className="hamburger-menu">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>{" "}
            {/* Start Header Right  */}
            <div className="header-right">
              {/* COMMENTED OUT - Theme toggle functionality disabled */}
              {/* <div className="theme-toggle-container">
                <ThemeToggle />
              </div> */}
              <a
                className="rn-btn"
                target={headerData?.ctaButton?.target || "_blank"}
                href={headerData?.ctaButton?.href || "#"}
              >
                <span>{headerData?.ctaButton?.label || "Download CV"}</span>
              </a>
              <div className="hamberger-menu d-block d-xl-none">
                <Menu id="menuBtn" className="feather-menu humberger-menu" />
              </div>
              <div className="close-menu d-block">
                <span className="closeTrigger">
                  <X />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* End Header Center */}
      </div>
    </header>
  );
}
