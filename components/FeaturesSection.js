"use client";

import {
  ArrowRight,
  Globe,
  Smartphone,
  Briefcase,
  BarChart,
  Cpu,
  Users,
} from "react-feather";
import { useServices } from "@/hooks/useSupabaseData";

export default function FeaturesSection() {
  const { services: servicesData = {}, isLoading } = useServices();

  if (isLoading) {
    return <div className="text-center py-10">Loading features...</div>;
  }

  // Extract services array from the data object
  const services = servicesData?.services || [];

  // Map icon names to React Feather components
  const iconMap = {
    globe: Globe,
    smartphone: Smartphone,
    briefcase: Briefcase,
    "bar-chart": BarChart,
    cpu: Cpu,
    users: Users,
  };

  return (
    <div
      className="rn-service-area rn-section-gap section-separator"
      id="features"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="section-title text-left"
              data-aos="fade-up"
              data-aos-duration={500}
              data-aos-delay={100}
              data-aos-once="true"
            >
              <span className="subtitle">Features</span>
              <h2 className="title">What I Do</h2>
            </div>
          </div>
        </div>
        <div className="row row--25 mt_md--10 mt_sm--10">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration={500}
              data-aos-delay={100 + index * 100}
              data-aos-once="true"
              className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
            >
              <div className="rn-service">
                <div className="inner">
                  <div className="icon">
                    {(() => {
                      const IconComponent = iconMap[service.icon];
                      return IconComponent ? <IconComponent size={24} /> : null;
                    })()}
                  </div>
                  <div className="content">
                    <h4 className="title">
                      <a href="#">{service.title}</a>
                    </h4>
                    <p className="description">{service.description}</p>
                  </div>
                </div>
                <a className="over-link" href="#" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
