import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "./ParticlesBackground";

export default function CTASection() {
  return (
    <div
      className="rn-cta section-separator"
      style={{
        position: "relative",
        boxShadow: "var(--shadow-white-3)",
      }}
    >
      <ParticlesBackground>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner text-center">
                <div className="section-title text-center">
                  <Image
                    src="/avatar.png"
                    alt="inbio logo"
                    width={110}
                    height={110}
                    className="mx-auto d-block my-20 p-2.5"
                    style={{
                      borderRadius: "50%",
                      // background: "var(--gradient-box-w)",
                      boxShadow: "var(--shadow-white-3)",
                    }}
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
                  <Link href="/contact" className="rn-btn btn-large mb-20">
                    <span>GET IN TOUCH</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParticlesBackground>
    </div>
  );
}
