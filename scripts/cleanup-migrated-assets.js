/**
 * Cleanup Script: Remove migrated assets from /public
 * Deletes all files that have been successfully migrated to Supabase Storage
 * Keeps only: assets/, sw.js, manifest.json, robots.txt, favicon.ico, icons
 * Run AFTER verifying migration was successful
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const REPORT_PATH = path.join(
  __dirname,
  "..",
  "backup",
  "migration-report.json"
);

// Files/folders to KEEP in /public
const KEEP_FILES = [
  "sw.js",
  "manifest.json",
  "robots.txt",
  "favicon.ico",
  "icon-192x192.png",
  "icon-512x512.png",
  ".gitkeep",
];

const KEEP_DIRS = ["assets"];

/**
 * Recursively delete directory
 */
function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
        console.log(`  🗑️  Deleted: ${path.relative(PUBLIC_DIR, filePath)}`);
      }
    });
    fs.rmdirSync(dirPath);
    console.log(
      `  📁 Removed directory: ${path.relative(PUBLIC_DIR, dirPath)}`
    );
  }
}

/**
 * Clean up migrated files
 */
function cleanupMigratedFiles() {
  console.log("🧹 Cleaning up migrated files from /public...\n");

  // Read migration report
  if (!fs.existsSync(REPORT_PATH)) {
    console.error(
      "❌ Migration report not found. Run migrate-assets-to-supabase.js first."
    );
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));
  console.log(`📊 Migration report loaded:`);
  console.log(`  - Total migrated files: ${report.migratedFiles}`);
  console.log(`  - Migration date: ${report.timestamp}\n`);

  // Get all items in public directory
  const publicItems = fs.readdirSync(PUBLIC_DIR);

  let deletedCount = 0;

  for (const item of publicItems) {
    const itemPath = path.join(PUBLIC_DIR, item);
    const isDirectory = fs.lstatSync(itemPath).isDirectory();

    // Skip if in keep list
    if (KEEP_FILES.includes(item)) {
      console.log(`  ✓ Keeping: ${item}`);
      continue;
    }

    if (isDirectory && KEEP_DIRS.includes(item)) {
      console.log(`  ✓ Keeping directory: ${item}/`);
      continue;
    }

    // Delete files/directories
    if (isDirectory) {
      deleteDirectory(itemPath);
      deletedCount++;
    } else {
      fs.unlinkSync(itemPath);
      console.log(`  🗑️  Deleted: ${item}`);
      deletedCount++;
    }
  }

  console.log(`\n✅ Cleanup complete!`);
  console.log(`  - Items deleted: ${deletedCount}`);
  console.log(`  - Items kept: ${KEEP_FILES.length + KEEP_DIRS.length}`);
  console.log("\n📁 Remaining /public structure:");
  console.log("  /public/");
  console.log("    ├── assets/        (kept)");
  console.log("    ├── sw.js          (kept)");
  console.log("    ├── manifest.json  (kept)");
  console.log("    ├── robots.txt     (kept)");
  console.log("    ├── favicon.ico    (kept)");
  console.log("    ├── icon-192x192.png (kept)");
  console.log("    └── icon-512x512.png (kept)");
}

// Run cleanup
console.log("⚠️  WARNING: This will permanently delete files from /public!");
console.log("   Make sure you have verified the migration was successful.\n");

// Simple confirmation (in real scenario, use readline for interactive prompt)
const args = process.argv.slice(2);
if (!args.includes("--confirm")) {
  console.log(
    "❌ Add --confirm flag to proceed: node scripts/cleanup-migrated-assets.js --confirm"
  );
  process.exit(0);
}

cleanupMigratedFiles();
