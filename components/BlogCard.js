import { Clock, ArrowUpRight } from "react-feather";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog, delay = 100 }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration={500}
      data-aos-delay={delay}
      data-aos-once="true"
      className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 mt--30"
    >
      <div className="rn-blog">
        <div className="inner">
          <div className="thumbnail">
            <Link href={`/blogs/${blog.id}`}>
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={250}
                style={{ objectFit: "cover" }}
              />
            </Link>
          </div>
          <div className="content">
            <div className="category-info">
              <div className="category-list">
                <Link href={`/blogs/${blog.id}`}>{blog.category}</Link>
              </div>
              <div className="meta">
                <span className="d-flex gap-2">
                  <Clock size={16} /> {blog.readTime}
                </span>
              </div>
            </div>
            <h4 className="title">
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h4>
            <p className="short-description">{blog.excerpt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
