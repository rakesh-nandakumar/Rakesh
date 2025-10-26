import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    src: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "gallery",
  }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
