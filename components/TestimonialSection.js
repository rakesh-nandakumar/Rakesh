const testimonials = [
  {
    id: 1,
    name: "Nevine Acotanza",
    company: "Parv Infotech",
    position: "Chief Operating Officer",
    image:
      "https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--1st.png",
    rating: 5,
    content:
      "Maecenas finibus nec sem ut imperdiet. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante. Ut tincidunt est ac dolor aliquam sodales phasellus mauris.",
  },
  {
    id: 2,
    name: "John Smith",
    company: "Digital Solutions",
    position: "Project Manager",
    image:
      "https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--1st.png",
    rating: 5,
    content:
      "Outstanding work quality and professional approach. The project was delivered on time with exceptional attention to detail. Highly recommend for any development project.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    company: "Creative Agency",
    position: "Design Director",
    image:
      "https://inbio.pixcelsthemes.com/inbio/assets/images/testimonial/final-home--1st.png",
    rating: 5,
    content:
      "Excellent collaboration and technical expertise. The final product exceeded our expectations and the communication throughout the project was seamless.",
  },
];

export default function TestimonialSection() {
  return (
    <div
      className="rn-testimonial-area rn-section-gap section-separator"
      id="testimonial"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">What Clients Say</span>
              <h2 className="title">Testimonial</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="testimonial-activation testimonial-pb mb--30">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial mt--50 mt_md--40 mt_sm--40"
                >
                  <div className="inner">
                    <div className="card-info">
                      <div className="card-thumbnail">
                        <img src={testimonial.image} alt="Testimonial-image" />
                      </div>
                      <div className="card-content">
                        <span className="subtitle mt--10">
                          {testimonial.company}
                        </span>
                        <h3 className="title">{testimonial.name}</h3>
                        <span className="designation">
                          {testimonial.position}
                        </span>
                      </div>
                    </div>
                    <div className="card-description">
                      <div className="title-area">
                        <div className="title-wrapper">
                          <span className="title">
                            {Array.from(
                              { length: testimonial.rating },
                              (_, i) => (
                                <i key={i} className="feather-star" />
                              )
                            )}
                          </span>
                          <span className="sub-title">Great Quality!</span>
                        </div>
                        <div className="quote-icon">
                          <i className="feather-quote" />
                        </div>
                      </div>
                      <p className="description">{testimonial.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
