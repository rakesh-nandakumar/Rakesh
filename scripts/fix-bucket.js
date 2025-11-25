/**
 * Fix Supabase Bucket Name
 * This script will check if 'portfolio-assets' bucket exists and create 'portfolio' bucket
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OLD_BUCKET = "portfolio-assets";
const NEW_BUCKET = "portfolio";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("\n🔧 Fixing Supabase Bucket Configuration\n");
console.log("═".repeat(50));

async function fixBucket() {
  // List all buckets
  console.log("\n📋 Checking existing buckets...\n");
  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("❌ Error listing buckets:", error.message);
    return;
  }

  console.log(`Found ${buckets.length} bucket(s):`);
  buckets.forEach((b) => console.log(`  - ${b.name}`));

  const hasOldBucket = buckets.some((b) => b.name === OLD_BUCKET);
  const hasNewBucket = buckets.some((b) => b.name === NEW_BUCKET);

  console.log("\n═".repeat(50));

  // Check if we need to create the new bucket
  if (!hasNewBucket) {
    console.log(`\n📦 Creating '${NEW_BUCKET}' bucket...\n`);

    const { data, error: createError } = await supabase.storage.createBucket(
      NEW_BUCKET,
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
      return;
    }

    console.log(`✓ Created '${NEW_BUCKET}' bucket successfully`);
  } else {
    console.log(`\n✓ Bucket '${NEW_BUCKET}' already exists`);
  }

  // If old bucket exists, show migration option
  if (hasOldBucket) {
    console.log("\n═".repeat(50));
    console.log(`\n⚠️  Found old bucket: '${OLD_BUCKET}'`);
    console.log("\n💡 Options:");
    console.log(`   1. Re-upload files: npm run upload-to-supabase`);
    console.log(
      `   2. Manually move files from '${OLD_BUCKET}' to '${NEW_BUCKET}' in Supabase Dashboard`
    );
    console.log(`   3. Delete '${OLD_BUCKET}' bucket after migrating files`);
  }

  console.log("\n═".repeat(50));
  console.log("\n✅ Bucket configuration complete!\n");
  console.log("Next steps:");
  console.log("  1. Run: npm run upload-to-supabase");
  console.log("  2. Verify: npm run test-storage");
  console.log("  3. Restart dev server if running\n");
}

fixBucket().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
