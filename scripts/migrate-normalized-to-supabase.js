/**
 * Normalized Migration Script: JSON data -> Supabase normalized tables
 * Transforms flat JSON structure into properly normalized relational database
 * Run AFTER creating tables via supabase_normalized_schema.sql
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
  console.error("❌ Missing Supabase env vars for migration.");
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

// Helper function for inserts with error handling
async function insert(table, rows) {
  if (!rows || !rows.length) return { count: 0, data: [] };
  const { data, error } = await supabase.from(table).insert(rows).select();
  if (error) throw new Error(`${table} insert failed: ${error.message}`);
  return { count: data.length, data };
}

// ============================================================================
// STEP 1: SEED LOOKUP TABLES
// ============================================================================

async function seedContactTypes() {
  console.log("  🔧 Seeding contact_types...");
  const types = [
    { name: "email", icon: "/icons/email.svg" },
    { name: "phone", icon: "/icons/phone.svg" },
    { name: "address", icon: "/icons/map-pin.svg" },
    { name: "linkedin", icon: "/icons/linkedin.svg" },
    { name: "github", icon: "/icons/github.svg" },
    { name: "portfolio", icon: "/icons/globe.svg" },
    { name: "whatsapp", icon: "/icons/message-circle.svg" },
  ];
  return insert("contact_types", types);
}

async function seedTimelineCategories() {
  console.log("  🔧 Seeding timeline_categories...");
  const categories = [
    { id: 1, name: "Work Experience" },
    { id: 2, name: "Education" },
  ];
  return insert("timeline_categories", categories);
}

// ============================================================================
// STEP 2: MIGRATE PROFILE DATA
// ============================================================================

async function migrateProfile() {
  console.log("  👤 Migrating profile...");
  const about = readJson("about.json");

  // Insert main profile
  const profile = {
    name: about.name,
    short_bio: about.shortBio,
    long_bio: about.longBio,
    profile_image: about.profileImage,
    avatar_image: about.avatarImage,
    hero_image: about.heroImage,
    cv_link: about.cvLink,
    contact_image: about.contactImage,
  };

  const { data: profileData } = await insert("profiles", [profile]);
  const profileId = profileData[0].id;

  // Insert profile titles
  const titles = about.title.map((title) => ({
    profile_id: profileId,
    title: title,
  }));
  await insert("profile_titles", titles);

  // Get contact type IDs
  const { data: contactTypes } = await supabase
    .from("contact_types")
    .select("id, name");
  const typeMap = Object.fromEntries(contactTypes.map((t) => [t.name, t.id]));

  // Insert contacts
  const contacts = Object.entries(about.contact).map(([type, value]) => ({
    profile_id: profileId,
    type_id: typeMap[type],
    value: value,
  }));

  await insert("contacts", contacts);

  return { count: 1 };
}

// ============================================================================
// STEP 3: MIGRATE TIMELINE DATA
// ============================================================================

async function migrateTimeline() {
  console.log("  📅 Migrating timeline...");
  const timeline = readJson("timeline.json");

  let totalCount = 0;

  for (const item of timeline.timeline) {
    // Insert timeline entry
    const timelineEntry = {
      category_id: item.category,
      time: item.time,
      title: item.title,
      short_description: item["short-description"],
      long_description: item["long-description"],
      status: item.status || null,
      description: item.description || null,
    };

    const { data: timelineData } = await insert("timelines", [timelineEntry]);
    const timelineId = timelineData[0].id;
    totalCount++;

    // Insert timeline technologies (deduplicate first)
    if (item.technologies && item.technologies.length > 0) {
      const uniqueTechs = [...new Set(item.technologies)];
      const technologies = uniqueTechs.map((tech) => ({
        timeline_id: timelineId,
        technology: tech,
      }));
      await insert("timeline_technologies", technologies);
    }

    // Insert timeline links
    if (item.links && item.links.length > 0) {
      const links = item.links.flatMap((linkObj) =>
        Object.entries(linkObj).map(([type, url]) => ({
          timeline_id: timelineId,
          type: type,
          url: url,
        }))
      );
      await insert("timeline_links", links);
    }
  }

  return { count: totalCount };
}

// ============================================================================
// STEP 4: MIGRATE TECHNOLOGIES
// ============================================================================

async function migrateTechnologies() {
  console.log("  ⚙️  Migrating technologies...");
  const tech = readJson("technologies.json");

  const technologies = tech.map((t) => ({
    name: t.name,
    icon: t.icon,
    description: t.description || "",
    dark_mode: !!t.darkMode,
  }));

  return insert("technologies", technologies);
}

// ============================================================================
// STEP 5: MIGRATE SERVICES
// ============================================================================

async function migrateServices() {
  console.log("  🛠️  Migrating services...");
  const svc = readJson("services.json");

  const services = svc.services.map((s) => ({
    title: s.title,
    icon: s.icon,
    description: s.description,
  }));

  return insert("services", services);
}

// ============================================================================
// STEP 6: MIGRATE HEADER
// ============================================================================

async function migrateHeader() {
  console.log("  🔝 Migrating header...");
  const header = readJson("header.json");

  // Insert header (single row)
  const { data: headerData } = await insert("headers", [{}]);
  const headerId = headerData[0].id;

  // Insert navigation items
  const navigation = header.navigation.map((n, idx) => ({
    header_id: headerId,
    label: n.label,
    href: n.href,
    sort_order: idx,
  }));
  await insert("header_navigations", navigation);

  // Insert CTA button
  if (header.ctaButton) {
    const cta = [
      {
        header_id: headerId,
        label: header.ctaButton.label,
        href: header.ctaButton.href,
        target: header.ctaButton.target || "_blank",
        sort_order: 0,
      },
    ];
    await insert("header_ctas", cta);
  }

  return { count: 1 };
}

// ============================================================================
// STEP 7: MIGRATE SITE CONFIG
// ============================================================================

async function migrateSiteConfig() {
  console.log("  ⚙️  Migrating site config...");
  const cfg = readJson("site-config.json");

  const configs = Object.entries(cfg).map(([key, value]) => ({
    key: key,
    type: "boolean",
    value_boolean: value,
    value_enum: null,
    enum_options: null,
    description: `Enable/disable ${key} feature`,
  }));

  return insert("site_configs", configs);
}

// ============================================================================
// STEP 8: MIGRATE GALLERY
// ============================================================================

async function migrateGallery() {
  console.log("  🖼️  Migrating gallery...");
  let gallery = [];
  try {
    gallery = readJson("gallery.json");
  } catch {
    console.warn("  ⚠️  gallery.json not found or invalid; skipping");
    return { count: 0 };
  }

  const galleries = gallery.map((g) => ({
    src: g.src,
    title: g.title,
    description: g.description,
    date: g.date ? new Date(g.date).toISOString().split("T")[0] : null,
    location: g.location,
    category: g.category,
  }));

  return insert("galleries", galleries);
}

// ============================================================================
// STEP 9: MIGRATE PORTFOLIOS
// ============================================================================

async function migratePortfolios() {
  console.log("  💼 Migrating portfolios...");
  const portfolio = readJson("portfolio.json");

  let totalCount = 0;

  for (const item of portfolio) {
    // Determine type and status
    let type = "work";
    if (item.category === "Personal") type = "personal";
    else if (item.category === "Freelance") type = "freelance";

    let status = "completed";
    let progress = null;
    if (item.status === "Ongoing") {
      status = "ongoing";
      progress = item.progress || 50;
    }

    // Insert portfolio entry
    const portfolioEntry = {
      image: item.image,
      category: item.category,
      title: item.title,
      short_description: item.shortDescription,
      long_description: item.longDescription,
      featured: !!item.featured,
      status: status,
      progress: progress,
      live_link: item.liveLink,
      github_link: item.githubLink || null,
      type: type,
    };

    const { data: portfolioData } = await insert("portfolios", [
      portfolioEntry,
    ]);
    const portfolioId = portfolioData[0].id;
    totalCount++;

    // Insert key features
    if (item.keyFeatures && item.keyFeatures.length > 0) {
      const features = item.keyFeatures.map((kf) => ({
        portfolio_id: portfolioId,
        feature: kf.feature,
        description: kf.description,
      }));
      await insert("portfolio_key_features", features);
    }

    // Insert technologies (deduplicate first)
    if (item.technologies && item.technologies.length > 0) {
      const uniqueTechs = [...new Set(item.technologies)];
      const technologies = uniqueTechs.map((tech) => ({
        portfolio_id: portfolioId,
        technology: tech,
      }));
      await insert("portfolio_technologies", technologies);
    }
  }

  return { count: totalCount };
}

// ============================================================================
// STEP 10: MIGRATE BLOGS
// ============================================================================

async function migrateBlogs() {
  console.log("  📝 Migrating blogs...");
  const blogs = readJson("blogs.json");

  let totalCount = 0;

  for (const blog of blogs) {
    // Insert blog entry
    const blogEntry = {
      slug: blog.slug,
      image: blog.image,
      category: blog.category,
      title: blog.title,
      excerpt: blog.excerpt,
      read_time: blog.readTime,
      publish_date: blog.publishDate,
      content: blog.content,
      featured: !!blog.featured,
    };

    const { data: blogData } = await insert("blogs", [blogEntry]);
    const blogId = blogData[0].id;
    totalCount++;

    // Insert blog tags (deduplicate first)
    if (blog.tags && blog.tags.length > 0) {
      const uniqueTags = [...new Set(blog.tags)];
      const tags = uniqueTags.map((tag) => ({
        blog_id: blogId,
        tag: tag,
      }));
      await insert("blog_tags", tags);
    }
  }

  return { count: totalCount };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log("🚀 Starting normalized JSON -> Supabase migration\n");
  console.log(
    "📊 This will transform flat JSON into normalized relational structure\n"
  );

  const tasks = [
    [
      "📦 Seeding Lookup Tables",
      async () => {
        console.log("📦 Seeding Lookup Tables...");
        await seedContactTypes();
        await seedTimelineCategories();
        return { count: 2 };
      },
    ],
    ["👤 Profile & Contacts", migrateProfile],
    ["📅 Timeline Entries", migrateTimeline],
    ["⚙️  Technologies", migrateTechnologies],
    ["🛠️  Services", migrateServices],
    ["🔝 Header & Navigation", migrateHeader],
    ["⚙️  Site Configuration", migrateSiteConfig],
    ["🖼️  Gallery Items", migrateGallery],
    ["💼 Portfolio Projects", migratePortfolios],
    ["📝 Blog Posts", migrateBlogs],
  ];

  for (const [label, fn] of tasks) {
    try {
      const res = await fn();
      console.log(`✓ Migrated ${label} (${res.count} records)\n`);
    } catch (e) {
      console.error(`✗ Failed ${label}:`, e.message);
      console.error(`  Full error:`, e);
    }
  }

  console.log("✅ Migration complete!");
  console.log("\n📊 Summary:");
  console.log("  - All JSON data transformed into normalized structure");
  console.log("  - Foreign keys and relationships properly established");
  console.log("  - Junction tables populated for many-to-many relationships");
  console.log("\n🔍 Next steps:");
  console.log("  1. Verify data in Supabase Table Editor");
  console.log("  2. Test API routes to fetch from normalized tables");
  console.log("  3. Update application code to query new structure");
}

main();
