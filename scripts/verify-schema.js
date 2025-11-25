/**
 * Schema Verification Script
 * Checks if all 23 tables exist in Supabase before running migration
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const REQUIRED_TABLES = [
  "profiles",
  "profile_titles",
  "contact_types",
  "contacts",
  "timeline_categories",
  "timelines",
  "timeline_technologies",
  "timeline_links",
  "technologies",
  "services",
  "headers",
  "header_ctas",
  "header_navigations",
  "site_configs",
  "galleries",
  "portfolios",
  "portfolio_key_features",
  "portfolio_technologies",
  "blogs",
  "blog_tags",
];

async function verifyTables() {
  console.log("🔍 Verifying database schema...\n");

  let existingCount = 0;
  let missingCount = 0;
  const missingTables = [];

  for (const table of REQUIRED_TABLES) {
    try {
      const { error } = await supabase.from(table).select("*").limit(1);

      if (error) {
        console.log(`❌ ${table} - NOT FOUND`);
        missingTables.push(table);
        missingCount++;
      } else {
        console.log(`✓ ${table}`);
        existingCount++;
      }
    } catch (err) {
      console.log(`❌ ${table} - ERROR: ${err.message}`);
      missingTables.push(table);
      missingCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`  ✓ Tables found: ${existingCount}/20`);
  console.log(`  ❌ Tables missing: ${missingCount}/20\n`);

  if (missingCount === 0) {
    console.log("🎉 SUCCESS! All tables exist.");
    console.log("\n✅ Ready to run migration:");
    console.log("   node scripts/migrate-normalized-to-supabase.js\n");
    return true;
  } else {
    console.log("⚠️  SCHEMA INCOMPLETE");
    console.log("\n📝 Missing tables:");
    missingTables.forEach((t) => console.log(`   - ${t}`));
    console.log("\n🔧 TO FIX:");
    console.log("   1. Open Supabase SQL Editor:");
    console.log(
      "      https://supabase.com/dashboard/project/evgqbzyytamqezwdymkb/sql/new"
    );
    console.log("   2. Copy contents from: supabase_normalized_schema.sql");
    console.log("   3. Paste and click 'Run'");
    console.log("   4. Re-run this verification script\n");
    return false;
  }
}

verifyTables();
