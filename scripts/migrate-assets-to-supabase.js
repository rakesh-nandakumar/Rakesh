/**
 * Asset Migration Script: Local files → Supabase Storage
 * Uploads all files from /public (except /assets) to Supabase Storage
 * Updates database records with new Supabase URLs
 * Run AFTER setting up Supabase Storage buckets
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import mime from "mime-types";

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

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const BUCKET_NAME = "portfolio";

// Files to skip (keep local)
const SKIP_FILES = [
  "sw.js",
  "manifest.json",
  "robots.txt",
  "favicon.ico",
  "icon-192x192.png",
  "icon-512x512.png",
  ".gitkeep",
];

// Directories to skip
const SKIP_DIRS = ["assets"];

/**
 * Get all files in public directory (except skip list)
 */
async function getFilesToMigrate() {
  const allFiles = await glob("**/*", {
    cwd: PUBLIC_DIR,
    nodir: true,
    dot: false,
  });

  return allFiles.filter((file) => {
    // Skip files in SKIP_FILES
    if (SKIP_FILES.includes(path.basename(file))) return false;

    // Skip directories in SKIP_DIRS
    const firstDir = file.split(path.sep)[0];
    if (SKIP_DIRS.includes(firstDir)) return false;

    return true;
  });
}

/**
 * Upload file to Supabase Storage
 */
async function uploadFile(relativePath) {
  const filePath = path.join(PUBLIC_DIR, relativePath);
  const fileBuffer = fs.readFileSync(filePath);

  // Normalize path for Supabase (forward slashes)
  const storagePath = relativePath.replace(/\\/g, "/");

  // Detect MIME type
  const mimeType = mime.lookup(filePath) || "application/octet-stream";

  console.log(`  📤 Uploading: ${storagePath}`);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType: mimeType,
      upsert: true, // Overwrite if exists
    });

  if (error) {
    throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

  return { path: storagePath, publicUrl };
}

/**
 * Update database records with new Supabase URLs
 */
async function updateDatabaseReferences(migrations) {
  console.log("\n🔄 Updating database references...");

  // Create mapping: old path -> new URL
  const urlMap = {};
  for (const { path: storagePath, publicUrl } of migrations) {
    // Map both /path and path formats
    urlMap[`/${storagePath}`] = publicUrl;
    urlMap[storagePath] = publicUrl;
  }

  // Update profiles table
  console.log("  📝 Updating profiles...");
  const { data: profiles } = await supabase.from("profiles").select("*");

  for (const profile of profiles || []) {
    const updates = {};

    if (profile.profile_image && urlMap[profile.profile_image]) {
      updates.profile_image = urlMap[profile.profile_image];
    }
    if (profile.avatar_image && urlMap[profile.avatar_image]) {
      updates.avatar_image = urlMap[profile.avatar_image];
    }
    if (profile.hero_image && urlMap[profile.hero_image]) {
      updates.hero_image = urlMap[profile.hero_image];
    }
    if (profile.contact_image && urlMap[profile.contact_image]) {
      updates.contact_image = urlMap[profile.contact_image];
    }
    if (profile.cv_link && urlMap[profile.cv_link]) {
      updates.cv_link = urlMap[profile.cv_link];
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("profiles").update(updates).eq("id", profile.id);
      console.log(`    ✓ Updated profile: ${profile.name}`);
    }
  }

  // Update portfolios table
  console.log("  📝 Updating portfolios...");
  const { data: portfolios } = await supabase.from("portfolios").select("*");

  for (const portfolio of portfolios || []) {
    const updates = {};

    if (portfolio.image && urlMap[portfolio.image]) {
      updates.image = urlMap[portfolio.image];
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("portfolios").update(updates).eq("id", portfolio.id);
      console.log(`    ✓ Updated portfolio: ${portfolio.title}`);
    }
  }

  // Update blogs table
  console.log("  📝 Updating blogs...");
  const { data: blogs } = await supabase.from("blogs").select("*");

  for (const blog of blogs || []) {
    const updates = {};

    if (blog.image && urlMap[blog.image]) {
      updates.image = urlMap[blog.image];
    }

    // Update image references in markdown content
    if (blog.content) {
      let newContent = blog.content;
      for (const [oldPath, newUrl] of Object.entries(urlMap)) {
        newContent = newContent.replace(
          new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          newUrl
        );
      }
      if (newContent !== blog.content) {
        updates.content = newContent;
      }
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("blogs").update(updates).eq("id", blog.id);
      console.log(`    ✓ Updated blog: ${blog.title}`);
    }
  }

  // Update galleries table
  console.log("  📝 Updating galleries...");
  const { data: galleries } = await supabase.from("galleries").select("*");

  for (const gallery of galleries || []) {
    const updates = {};

    if (gallery.src && urlMap[gallery.src]) {
      updates.src = urlMap[gallery.src];
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("galleries").update(updates).eq("id", gallery.id);
      console.log(`    ✓ Updated gallery: ${gallery.title}`);
    }
  }

  // Update technologies table
  console.log("  📝 Updating technologies...");
  const { data: technologies } = await supabase
    .from("technologies")
    .select("*");

  for (const tech of technologies || []) {
    const updates = {};

    if (tech.icon && urlMap[tech.icon]) {
      updates.icon = urlMap[tech.icon];
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("technologies").update(updates).eq("id", tech.id);
      console.log(`    ✓ Updated technology: ${tech.name}`);
    }
  }

  // Update services table
  console.log("  📝 Updating services...");
  const { data: services } = await supabase.from("services").select("*");

  for (const service of services || []) {
    const updates = {};

    if (service.icon && urlMap[service.icon]) {
      updates.icon = urlMap[service.icon];
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("services").update(updates).eq("id", service.id);
      console.log(`    ✓ Updated service: ${service.title}`);
    }
  }

  // Update contact_types table
  console.log("  📝 Updating contact_types...");
  const { data: contactTypes } = await supabase
    .from("contact_types")
    .select("*");

  for (const contactType of contactTypes || []) {
    const updates = {};

    if (contactType.icon && urlMap[contactType.icon]) {
      updates.icon = urlMap[contactType.icon];
    }

    if (Object.keys(updates).length > 0) {
      await supabase
        .from("contact_types")
        .update(updates)
        .eq("id", contactType.id);
      console.log(`    ✓ Updated contact_type: ${contactType.name}`);
    }
  }

  console.log("✅ Database references updated!");
}

/**
 * Create backup of public directory structure
 */
function createBackup() {
  const backupPath = path.join(__dirname, "..", "backup", "public-backup.json");
  const publicFiles = fs
    .readdirSync(PUBLIC_DIR, { withFileTypes: true })
    .map((dirent) => ({
      name: dirent.name,
      isDirectory: dirent.isDirectory(),
    }));

  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify(publicFiles, null, 2));
  console.log(`📦 Backup created: ${backupPath}`);
}

/**
 * Main migration function
 */
async function main() {
  console.log("🚀 Starting asset migration to Supabase Storage\n");

  // Step 1: Create backup
  console.log("📦 Creating backup...");
  createBackup();

  // Step 2: Check if bucket exists
  console.log("\n🔍 Checking Supabase Storage bucket...");
  const { data: buckets, error: bucketError } =
    await supabase.storage.listBuckets();

  if (bucketError) {
    console.error("❌ Failed to list buckets:", bucketError.message);
    process.exit(1);
  }

  const bucketExists = buckets.some((b) => b.name === BUCKET_NAME);

  if (!bucketExists) {
    console.log(`  📁 Creating bucket: ${BUCKET_NAME}`);
    const { error: createError } = await supabase.storage.createBucket(
      BUCKET_NAME,
      {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: [
          "image/*",
          "application/pdf",
          "image/svg+xml",
          "text/*",
        ],
      }
    );

    if (createError) {
      console.error("❌ Failed to create bucket:", createError.message);
      process.exit(1);
    }
  } else {
    console.log(`  ✓ Bucket exists: ${BUCKET_NAME}`);
  }

  // Step 3: Get files to migrate
  console.log("\n📂 Scanning files to migrate...");
  const files = await getFilesToMigrate();
  console.log(`  Found ${files.length} files to migrate\n`);

  // Step 4: Upload files
  console.log("📤 Uploading files to Supabase Storage...");
  const migrations = [];

  for (const file of files) {
    try {
      const result = await uploadFile(file);
      migrations.push(result);
      console.log(`    ✓ ${file} → ${result.publicUrl}`);
    } catch (error) {
      console.error(`    ✗ Failed to upload ${file}:`, error.message);
    }
  }

  console.log(`\n✅ Uploaded ${migrations.length}/${files.length} files`);

  // Step 5: Update database references
  await updateDatabaseReferences(migrations);

  // Step 6: Generate report
  console.log("\n📊 Migration Summary:");
  console.log(`  - Files migrated: ${migrations.length}`);
  console.log(`  - Bucket: ${BUCKET_NAME}`);
  console.log(`  - Supabase URL: ${SUPABASE_URL}`);
  console.log("\n🔍 Next steps:");
  console.log("  1. Verify files in Supabase Storage dashboard");
  console.log("  2. Test website to ensure all images load correctly");
  console.log("  3. Once verified, delete migrated files from /public:");
  console.log(
    "     Run: node scripts/cleanup-migrated-assets.js (creates this next)"
  );
  console.log(
    "  4. Keep only /public/assets, sw.js, manifest.json, robots.txt, favicon.ico"
  );

  // Save migration report
  const reportPath = path.join(
    __dirname,
    "..",
    "backup",
    "migration-report.json"
  );
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        totalFiles: files.length,
        migratedFiles: migrations.length,
        bucket: BUCKET_NAME,
        migrations: migrations,
      },
      null,
      2
    )
  );
  console.log(`\n📝 Report saved: ${reportPath}`);
}

main().catch(console.error);
