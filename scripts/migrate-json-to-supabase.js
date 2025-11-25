/**
 * Migration Script: JSON data -> Supabase tables
 * Run AFTER creating tables via supabase_schema.sql.
 * Uses service role key for full access (DO NOT ship to client).
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing Supabase env vars for migration.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

function readJson(name) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "data", name), "utf8")
  );
}

async function upsert(table, rows, matchCols) {
  if (!rows.length) return { count: 0 };
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: matchCols });
  if (error) throw new Error(`${table} upsert failed: ${error.message}`);
  return { count: rows.length };
}

async function migrateBlogs() {
  const blogs = readJson("blogs.json");
  const rows = blogs.map((b) => ({
    slug: b.slug,
    image: b.image,
    category: b.category,
    title: b.title,
    excerpt: b.excerpt,
    read_time: b.readTime,
    publish_date: b.publishDate,
    tags: b.tags || [],
    content: b.content,
    featured: !!b.featured,
  }));
  return upsert("blogs", rows, "slug");
}

async function migratePortfolio() {
  const portfolio = readJson("portfolio.json");
  const rows = portfolio.map((p) => ({
    image: p.image,
    category: p.category,
    title: p.title,
    short_description: p.shortDescription,
    long_description: p.longDescription,
    key_features: p.keyFeatures || [],
    technologies: p.technologies || [],
    featured: !!p.featured,
    status: p.status,
    live_link: p.liveLink,
    type: p.type,
  }));
  return upsert("portfolio_projects", rows, "title");
}

async function migrateTechnologies() {
  const tech = readJson("technologies.json");
  const rows = tech.map((t) => ({
    name: t.name,
    icon: t.icon,
    dark_mode: !!t.darkMode,
    description: t.description,
  }));
  return upsert("technologies", rows, "name");
}

async function migrateServices() {
  const svc = readJson("services.json");
  const rows = svc.services.map((s) => ({
    title: s.title,
    icon: s.icon,
    description: s.description,
  }));
  return upsert("services", rows, "title");
}

async function migrateGallery() {
  let rows = [];
  try {
    const gallery = readJson("gallery.json");
    rows = gallery.map((g) => ({
      src: g.src,
      title: g.title,
      description: g.description,
      date: g.date,
      location: g.location,
      category: g.category,
    }));
  } catch {
    console.warn("gallery.json not found or invalid; skipping");
  }
  if (!rows.length) return { count: 0 };
  return upsert("gallery_items", rows, "title");
}

async function migrateAbout() {
  const about = readJson("about.json");
  const row = {
    name: about.name,
    titles: about.title || [],
    profile_image: about.profileImage,
    avatar_image: about.avatarImage,
    hero_image: about.heroImage,
    cv_link: about.cvLink,
    short_bio: about.shortBio,
    long_bio: about.longBio,
    contact: about.contact || {},
  };
  return upsert("about_profile", [row], "name");
}

async function migrateTimeline() {
  const timeline = readJson("timeline.json");
  const rows = (timeline.timeline || []).map((t) => ({
    category: t.category,
    time: t.time,
    title: t.title,
    short_description: t["short-description"],
    long_description: t["long-description"],
    technologies: t.technologies || [],
    links: t.links || [],
    status: t.status,
  }));
  return upsert("timeline_items", rows, "title");
}

async function migrateHeader() {
  const header = readJson("header.json");
  const rows = header.navigation.map((n, idx) => ({
    label: n.label,
    href: n.href,
    position: idx,
  }));
  return upsert("header_navigation", rows, "label");
}

async function migrateSiteConfig() {
  const cfg = readJson("site-config.json");
  return upsert("site_config", [{ config: cfg }], "id");
}

async function main() {
  console.log("🚀 Starting JSON -> Supabase migration\n");
  const tasks = [
    ["blogs", migrateBlogs],
    ["portfolio_projects", migratePortfolio],
    ["technologies", migrateTechnologies],
    ["services", migrateServices],
    ["gallery_items", migrateGallery],
    ["about_profile", migrateAbout],
    ["timeline_items", migrateTimeline],
    ["header_navigation", migrateHeader],
    ["site_config", migrateSiteConfig],
  ];

  for (const [label, fn] of tasks) {
    try {
      const res = await fn();
      console.log(`✓ Migrated ${label} (${res.count})`);
    } catch (e) {
      console.error(`✗ Failed ${label}:`, e.message);
    }
  }

  console.log("\n✅ Migration complete");
}

main();
