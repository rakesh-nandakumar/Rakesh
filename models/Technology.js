import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    darkMode: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "technologies",
  }
);

export default mongoose.models.Technology ||
  mongoose.model("Technology", TechnologySchema);
