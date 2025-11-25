/**
 * File Storage Test Script
 * Verifies the file storage system is working correctly
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getStorageMode,
  isSupabaseConfigured,
  resolveAssetUrl,
} from "../lib/fileStorage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = "portfolio";

console.log("\n🧪 File Storage System Test\n");
console.log("═".repeat(50));

// Test 1: Environment Configuration
console.log("\n📋 Test 1: Environment Configuration\n");

const storageMode = getStorageMode();
console.log(`✓ Storage Mode: ${storageMode}`);

if (supabaseUrl) {
  console.log(`✓ Supabase URL: ${supabaseUrl}`);
} else {
  console.log("⚠️  Supabase URL not configured");
}

if (supabaseKey) {
  console.log(`✓ Service Role Key: ${supabaseKey.substring(0, 20)}...`);
} else {
  console.log("⚠️  Service Role Key not configured");
}

const isConfigured = isSupabaseConfigured();
console.log(
  `${isConfigured ? "✓" : "⚠️ "} Supabase ${
    isConfigured ? "configured" : "not configured"
  }`
);

// Test 2: URL Resolution
console.log("\n═".repeat(50));
console.log("\n🔗 Test 2: URL Resolution\n");

const testPaths = [
  "/blogs/test.png",
  "/projects/sample.jpg",
  "/tech-icons/react.svg",
  "/profileImg.png",
];

testPaths.forEach((testPath) => {
  const resolved = resolveAssetUrl(testPath);
  console.log(`\nOriginal: ${testPath}`);
  console.log(`Resolved: ${resolved}`);

  if (storageMode === "supabase") {
    if (resolved.includes("supabase")) {
      console.log("✓ Correctly resolved to Supabase");
    } else {
      console.log("✗ Should resolve to Supabase but didn't");
    }
  } else {
    if (resolved === testPath) {
      console.log("✓ Correctly using system path");
    } else {
      console.log("✗ System mode but path was modified");
    }
  }
});

// Test 3: Supabase Connectivity (if configured)
if (isConfigured) {
  console.log("\n═".repeat(50));
  console.log("\n🌐 Test 3: Supabase Connectivity\n");

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.log("✗ Failed to connect to Supabase:", error.message);
    } else {
      console.log(`✓ Successfully connected to Supabase`);
      console.log(`✓ Found ${buckets.length} storage buckets`);

      const portfolioBucket = buckets.find((b) => b.name === BUCKET_NAME);
      if (portfolioBucket) {
        console.log(`✓ Portfolio assets bucket exists`);

        // List files in bucket
        const { data: files, error: listError } = await supabase.storage
          .from(BUCKET_NAME)
          .list("", { limit: 10 });

        if (listError) {
          console.log("✗ Failed to list files:", listError.message);
        } else {
          console.log(`✓ Bucket contains ${files.length} top-level items`);

          // Try to get public URL for a test file
          if (files.length > 0) {
            const testFile = files[0].name;
            const { data } = supabase.storage
              .from(BUCKET_NAME)
              .getPublicUrl(testFile);

            console.log(`\n📸 Sample file URL:`);
            console.log(data.publicUrl);
          }
        }
      } else {
        console.log("⚠️  Portfolio assets bucket not found");
        console.log("💡 Run: npm run upload-to-supabase");
      }
    }
  } catch (error) {
    console.log("✗ Error testing Supabase:", error.message);
  }
}

// Test 4: Data Service Integration
console.log("\n═".repeat(50));
console.log("\n📦 Test 4: Data Service Integration\n");

try {
  // Try to import and test data service
  const dataService = await import("../lib/dataService.js");

  console.log("✓ Data service loaded successfully");

  // Test loading blogs
  const blogs = dataService.getBlogs();
  if (blogs && blogs.length > 0) {
    console.log(`✓ Loaded ${blogs.length} blogs`);

    const firstBlog = blogs[0];
    if (firstBlog.image) {
      console.log(`\n📝 First blog image:`);
      console.log(`   Title: ${firstBlog.title}`);
      console.log(`   Image: ${firstBlog.image}`);

      if (storageMode === "supabase" && firstBlog.image.includes("supabase")) {
        console.log("✓ Blog image URLs resolved to Supabase");
      } else if (storageMode === "system" && firstBlog.image.startsWith("/")) {
        console.log("✓ Blog image URLs using system paths");
      }
    }
  }

  // Test loading portfolio
  const portfolio = dataService.getPortfolio();
  if (portfolio && portfolio.length > 0) {
    console.log(`✓ Loaded ${portfolio.length} portfolio items`);
  }

  // Test loading about
  const about = dataService.getAbout();
  if (about) {
    console.log(`✓ Loaded about data`);
    if (about.profileImage) {
      console.log(`   Profile: ${about.profileImage}`);
    }
    if (about.heroImage) {
      console.log(`   Hero: ${about.heroImage}`);
    }
  }
} catch (error) {
  console.log("✗ Error testing data service:", error.message);
}

// Test 5: Local File Check
console.log("\n═".repeat(50));
console.log("\n📁 Test 5: Local File Structure\n");

const publicDir = path.join(process.cwd(), "public");
const importantDirs = ["blogs", "projects", "tech-icons"];

console.log(`Public directory: ${publicDir}`);

importantDirs.forEach((dir) => {
  const dirPath = path.join(publicDir, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    console.log(`✓ /${dir}/ - ${files.length} files`);
  } else {
    console.log(`⚠️  /${dir}/ - directory not found`);
  }
});

// Summary
console.log("\n═".repeat(50));
console.log("\n✅ Test Summary\n");

console.log(`Current Mode: ${storageMode.toUpperCase()}`);

if (storageMode === "supabase") {
  if (isConfigured) {
    console.log("✓ Supabase is configured and ready");
    console.log("💡 All JSON-referenced images will load from Supabase");
  } else {
    console.log("⚠️  Supabase mode selected but not configured");
    console.log("💡 Add Supabase credentials to .env file");
  }
} else {
  console.log("✓ System mode - using local files");
  console.log(
    "💡 To switch to Supabase: Set FILE_STORAGE_MODE=supabase in .env"
  );
}

console.log("\n═".repeat(50));
console.log("\n📚 Next Steps:\n");

if (storageMode === "system") {
  console.log("1. Configure Supabase credentials in .env (optional)");
  console.log("2. Run: npm run upload-to-supabase");
  console.log("3. Set FILE_STORAGE_MODE=supabase in .env");
  console.log("4. Restart your dev server");
} else if (!isConfigured) {
  console.log("1. Add NEXT_PUBLIC_SUPABASE_URL to .env");
  console.log("2. Add SUPABASE_SERVICE_ROLE_KEY to .env");
  console.log("3. Run: npm run upload-to-supabase");
  console.log("4. Restart your dev server");
} else {
  console.log("✅ System is configured correctly!");
  console.log("💡 Run: npm run upload-to-supabase (if not done yet)");
  console.log("💡 Switch modes anytime by changing FILE_STORAGE_MODE");
}

console.log("\n");
