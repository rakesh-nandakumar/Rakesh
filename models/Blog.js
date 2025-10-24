import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    readTime: { type: String, required: true },
    publishDate: { type: String, required: true },
    tags: { type: [String], required: true },
    content: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
