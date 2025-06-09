import Link from "next/link";

export default function CTASection() {
  return (
    <div className="rn-cta rn-section-gap section-separator">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner text-center">
              <div className="section-title text-center">
                <img
                  src="/avatar.png"
                  alt="inbio logo"
                  className="mx-auto d-block"
                  style={{ width: "100px"}}
                />
                <span className="subtitle theme-gradient">
                  Ready to bring your ideas to life?
                </span>
                <h2
                  className="title mb_sm--0 mb-1"
                  style={{ fontSize: "4.5rem" }}
                >
                  Turn Your Vision Into Reality
                </h2>
                <p className="after-title">
                  Let's collaborate on your next project and create something
                  amazing together.
                </p>
              </div>
              <div className="footer-btn mt--35">
                <a
                  className="rn-btn btn-large"
                  target="_blank"
                  href="https://1.envato.market/inbio-djangoflask"
                >
                  <span>GET IN TOUCH</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
