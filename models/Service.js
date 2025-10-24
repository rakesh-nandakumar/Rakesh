import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    services: [
      {
        title: { type: String, required: true },
        icon: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "services",
  }
);

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
