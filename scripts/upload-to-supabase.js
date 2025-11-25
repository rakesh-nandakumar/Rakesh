/**
 * Supabase Asset Upload Script
 * Uploads all assets referenced in JSON files to Supabase Storage
 * Run this script once to populate your Supabase storage bucket
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin operations
const BUCKET_NAME = "portfolio";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Extract all image paths from JSON files
 */
function extractImagePathsFromJson() {
  const dataDir = path.join(process.cwd(), "data");
  const imagePaths = new Set();

  const imageFields = [
    "image",
    "icon",
    "src",
    "profileImage",
    "heroImage",
    "avatarImage",
    "contactImage",
    "cvLink",
    "cv",
    "resume",
    "pdf",
  ];

  // Helper to recursively find image paths
  function findImagePaths(obj, collected = new Set()) {
    if (!obj) return collected;

    if (Array.isArray(obj)) {
      obj.forEach((item) => findImagePaths(item, collected));
    } else if (typeof obj === "object") {
      Object.entries(obj).forEach(([key, value]) => {
        if (imageFields.includes(key) && typeof value === "string") {
          // Only collect local paths (not external URLs)
          if (value.startsWith("/") && !value.startsWith("http")) {
            collected.add(value);
          }
        } else if (typeof value === "object") {
          findImagePaths(value, collected);
        }
      });
    }

    return collected;
  }

  // Read all JSON files in data directory
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

  files.forEach((file) => {
    try {
      const filePath = path.join(dataDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
      findImagePaths(content, imagePaths);
      console.log(`✓ Scanned ${file}`);
    } catch (error) {
      console.error(`✗ Error reading ${file}:`, error.message);
    }
  });

  return Array.from(imagePaths);
}

/**
 * Check if bucket exists, create if not
 */
async function ensureBucketExists() {
  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("❌ Error listing buckets:", error.message);
    throw error;
  }

  const bucketExists = buckets.some((b) => b.name === BUCKET_NAME);

  if (!bucketExists) {
    console.log(`📦 Creating bucket: ${BUCKET_NAME}`);
    const { data, error: createError } = await supabase.storage.createBucket(
      BUCKET_NAME,
      {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/gif",
          "image/svg+xml",
          "image/webp",
          "application/pdf",
        ],
      }
    );

    if (createError) {
      console.error("❌ Error creating bucket:", createError.message);
      throw createError;
    }

    console.log("✓ Bucket created successfully");
  } else {
    console.log("✓ Bucket already exists");
  }
}

/**
 * Upload a single file to Supabase
 */
async function uploadFile(localPath) {
  const publicDir = path.join(process.cwd(), "public");
  const fullPath = path.join(
    publicDir,
    localPath.startsWith("/") ? localPath.substring(1) : localPath
  );

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${localPath}`);
    return { success: false, path: localPath, error: "File not found" };
  }

  try {
    // Read file
    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = localPath.startsWith("/")
      ? localPath.substring(1)
      : localPath;

    // Determine content type
    const ext = path.extname(fullPath).toLowerCase();
    const contentTypeMap = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".pdf": "application/pdf",
    };
    const contentType = contentTypeMap[ext] || "application/octet-stream";

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType,
        upsert: true, // Overwrite if exists
      });

    if (error) {
      console.log(`❌ Failed: ${localPath} - ${error.message}`);
      return { success: false, path: localPath, error: error.message };
    }

    console.log(`✓ Uploaded: ${localPath}`);
    return { success: true, path: localPath, data };
  } catch (error) {
    console.log(`❌ Error uploading ${localPath}:`, error.message);
    return { success: false, path: localPath, error: error.message };
  }
}

/**
 * Main upload function
 */
async function uploadAllAssets() {
  console.log("\n🚀 Starting Supabase Asset Upload\n");
  console.log("═".repeat(50));

  // Step 1: Extract image paths from JSON
  console.log("\n📋 Step 1: Scanning JSON files for asset references...\n");
  const imagePaths = extractImagePathsFromJson();
  console.log(`\n✓ Found ${imagePaths.length} unique asset references\n`);

  if (imagePaths.length === 0) {
    console.log("No assets to upload. Exiting.");
    return;
  }

  // Step 2: Ensure bucket exists
  console.log("═".repeat(50));
  console.log("\n📦 Step 2: Checking Supabase bucket...\n");
  await ensureBucketExists();

  // Step 3: Upload files
  console.log("\n═".repeat(50));
  console.log("\n📤 Step 3: Uploading files...\n");

  const results = [];
  for (const imagePath of imagePaths) {
    const result = await uploadFile(imagePath);
    results.push(result);

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Summary
  console.log("\n═".repeat(50));
  console.log("\n📊 Upload Summary:\n");

  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(`✓ Successful: ${successful}`);
  console.log(`✗ Failed: ${failed}`);

  if (failed > 0) {
    console.log("\n❌ Failed uploads:");
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`   - ${r.path}: ${r.error}`);
      });
  }

  console.log("\n═".repeat(50));
  console.log(
    `\n✅ Upload complete! Set FILE_STORAGE_MODE=supabase in .env to use Supabase storage.\n`
  );
}

// Run the script
uploadAllAssets().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
