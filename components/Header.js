import Image from "next/image";
import Link from "next/link";
import headerData from "../data/header.json";
import siteConfig from "../data/site-config.json";
import MobileMenu from "./MobileMenu";
// COMMENTED OUT - Theme toggle functionality disabled
// import ThemeToggle from "./ThemeToggle";

export default function Header() {
  // Filter navigation items based on site-config
  const filteredNavigation = headerData.navigation.filter((item) => {
    const href = item.href.toLowerCase();

    // Always show Home, About, and Contact
    if (href === "/" || href === "/about" || href === "/contact") {
      return true;
    }

    // Check site config for other pages
    if (href === "/portfolio" && !siteConfig.ProjectsEnabled) {
      return false;
    }
    if (href === "/blogs" && !siteConfig.BlogEnabled) {
      return false;
    }
    if (href === "/templates" && !siteConfig.TemplatesEnabled) {
      return false;
    }

    return true;
  });

  return (
    <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
      <div className="header-wrapper rn-popup-mobile-menu m--0 row align-items-center">
        {/* Start Header Left */}
        <div className="col-lg-2 col-6">
          <div className="header-left">
            <div className="logo md:ml-3">
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
              className="mainmenu-nav navbar-example2 d-none d-xl-block"
            >
              <ul className="primary-menu nav nav-pills">
                {filteredNavigation.map((item, index) => (
                  <li key={index} className="nav-item">
                    <Link className="nav-link" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Start Header Right  */}
            <div
              className="header-right"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                paddingRight: "15px",
              }}
            >
              {/* COMMENTED OUT - Theme toggle functionality disabled */}
              {/* <div className="theme-toggle-container">
                <ThemeToggle />
              </div> */}
              <a
                className="rn-btn d-none d-sm-inline-block"
                target={headerData?.ctaButton?.target || "_blank"}
                href={headerData?.ctaButton?.href || "#"}
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  padding: "8px 16px",
                }}
              >
                <span>{headerData?.ctaButton?.label || "Download CV"}</span>
              </a>
              {/* Mobile Menu Component */}
              <MobileMenu
                headerData={headerData}
                siteConfig={siteConfig}
                filteredNavigation={filteredNavigation}
              />
            </div>
          </div>
        </div>

        {/* End Header Center */}
      </div>
    </header>
  );
}
