import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: false },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    keyFeatures: [
      {
        feature: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    technologies: { type: [String], required: true },
    techStack: {
      frontend: [String],
      backend: [String],
      database: [String],
      infrastructure: [String],
      tools: [String],
    },
    deployment: {
      type: String,
      url: String,
      status: String,
    },
    links: {
      live: String,
      github: String,
      demo: String,
    },
    challenges: [String],
    solutions: [String],
    outcomes: [String],
    testimonial: {
      client: String,
      role: String,
      text: String,
      avatar: String,
    },
    featured: { type: Boolean, default: false },
    order: Number,
  },
  {
    timestamps: true,
    collection: "portfolio",
  }
);

export default mongoose.models.Portfolio ||
  mongoose.model("Portfolio", PortfolioSchema);
