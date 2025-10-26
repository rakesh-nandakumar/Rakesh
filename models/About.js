import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: [String], required: true },
    profileImage: { type: String, required: true },
    heroImage: { type: String, required: true },
    cvLink: { type: String, required: true },
    shortBio: { type: String, required: true },
    longBio: { type: String, required: true },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      linkedin: { type: String, required: true },
      github: { type: String, required: true },
      portfolio: { type: String, required: true },
      whatsapp: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    collection: "about",
  }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);
