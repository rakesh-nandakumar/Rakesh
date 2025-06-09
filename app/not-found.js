import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Return to Rakesh Nandakumar's portfolio homepage to explore my work and services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="error-page-inner rn-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner text-center">
              <div className="section-title text-center">
                <h2 className="title">404</h2>
                <h2 className="title">Page Not Found</h2>{" "}
                <span className="subtitle mt-5">
                  The page you&apos;re looking for doesn&apos;t exist.
                </span>
              </div>
              <Link href="/" className="rn-btn mt-5">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
