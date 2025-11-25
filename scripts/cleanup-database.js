/**
 * Cleanup Script - Delete all data from normalized tables
 * Run this before re-running migration if you need to start fresh
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// Order matters! Delete child tables before parent tables (respect foreign keys)
const TABLES_IN_DELETE_ORDER = [
  // Blog child tables
  "blog_tags",

  // Portfolio child tables
  "portfolio_technologies",
  "portfolio_key_features",

  // Timeline child tables
  "timeline_links",
  "timeline_technologies",

  // Header child tables
  "header_navigations",
  "header_ctas",

  // Profile child tables
  "contacts",
  "profile_titles",

  // Parent tables
  "blogs",
  "portfolios",
  "galleries",
  "site_configs",
  "headers",
  "services",
  "technologies",
  "timelines",
  "profiles",

  // Lookup tables
  "timeline_categories",
  "contact_types",
];

async function deleteAll(table) {
  const { error, count } = await supabase.from(table).delete().neq("id", 0);
  if (error && !error.message.includes("violates foreign key constraint")) {
    console.log(`  ⚠️  ${table}: ${error.message}`);
  } else {
    console.log(`  ✓ Cleared ${table}`);
  }
}

async function cleanupDatabase() {
  console.log("🧹 Cleaning up database (deleting all data)...\n");
  console.log("⚠️  This will delete ALL data from normalized tables!");
  console.log("    Press Ctrl+C within 3 seconds to cancel...\n");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("🗑️  Deleting data...\n");

  for (const table of TABLES_IN_DELETE_ORDER) {
    await deleteAll(table);
  }

  console.log("\n✅ Database cleanup complete!");
  console.log("   All normalized tables are now empty.");
  console.log("\n🔄 You can now run migration again:");
  console.log("   node scripts/migrate-normalized-to-supabase.js\n");
}

cleanupDatabase();
