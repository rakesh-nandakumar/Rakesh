import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema(
  {
    navigation: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    ],
    ctaButton: {
      label: { type: String, required: true },
      href: { type: String, required: true },
      target: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    collection: "header",
  }
);

export default mongoose.models.Header || mongoose.model("Header", HeaderSchema);
