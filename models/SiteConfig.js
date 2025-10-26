import mongoose from "mongoose";

const SiteConfigSchema = new mongoose.Schema(
  {
    ChatAssistantEnabled: { type: Boolean, default: false },
    GalleryEnabled: { type: Boolean, default: false },
    BlogEnabled: { type: Boolean, default: true },
    ProjectsEnabled: { type: Boolean, default: true },
    TemplatesEnabled: { type: Boolean, default: true },
    TechnologiesEnabled: { type: Boolean, default: true },
    TimelineEnabled: { type: Boolean, default: true },
    ServicesEnabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "siteconfig",
  }
);

export default mongoose.models.SiteConfig ||
  mongoose.model("SiteConfig", SiteConfigSchema);
