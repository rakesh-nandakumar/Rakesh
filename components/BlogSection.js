import BlogCard from "./BlogCard";
import blogsData from "../data/blogs.json";
import Link from "next/link";

const BlogSection = () => {
  // Get only the first 3 blogs for display, or filter featured blogs
  const displayBlogs = blogsData.slice(0, 3);

  return (
    <>
      {/* Start News Area */}
      <div className="rn-blog-area rn-section-gap section-separator" id="blog">
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
            {displayBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} delay={100 + index * 50} />
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12 text-center mt--50">
              <Link href="/blogs" className="rn-btn border-button btn-small">
                Show More Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End News Area */}
    </>
  );
};

export default BlogSection;
