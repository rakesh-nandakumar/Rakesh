import mongoose from "mongoose";

const TimelineSchema = new mongoose.Schema(
  {
    category: {
      type: Map,
      of: Number,
      required: true,
    },
    timeline: [
      {
        category: { type: Number, required: true },
        time: { type: String, required: false },
        title: { type: String, required: true },
        "short-description": { type: String, required: true },
        "long-description": { type: String, required: false },
        technologies: { type: [String], required: false },
        links: [{ type: Map, of: String }],
        status: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
    collection: "timeline",
  }
);

export default mongoose.models.Timeline ||
  mongoose.model("Timeline", TimelineSchema);
