// Create tables using Supabase client with raw SQL via RPC
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌ Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

async function createTables() {
  console.log("🚀 Creating Supabase tables...\n");

  // Read schema file
  const schemaSQL = fs.readFileSync("./supabase_schema.sql", "utf8");

  // Split into individual CREATE TABLE statements
  const statements = schemaSQL
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("create table"));

  console.log(`📋 Found ${statements.length} CREATE TABLE statements\n`);

  let successCount = 0;
  let errorCount = 0;

  // Execute each CREATE TABLE individually
  for (const statement of statements) {
    // Extract table name
    const match = statement.match(/create table if not exists (\w+)/);
    const tableName = match ? match[1] : "unknown";

    try {
      // Check if table already exists
      const { data, error: checkError } = await supabase
        .from(tableName)
        .select("*")
        .limit(1);

      if (!checkError) {
        console.log(`✓ Table '${tableName}' already exists`);
        successCount++;
        continue;
      }

      // Table doesn't exist - this is expected, the SDK can't create it
      console.log(`⚠️  Table '${tableName}' doesn't exist yet`);
      errorCount++;
    } catch (err) {
      console.log(`⚠️  Could not verify table '${tableName}'`);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  if (errorCount > 0) {
    console.log("\n❌ TABLES NOT CREATED");
    console.log(
      "\n📝 Supabase Security: Tables must be created via Dashboard\n"
    );
    console.log("🔧 TO FIX:");
    console.log(
      "   1. Open: https://supabase.com/dashboard/project/evgqbzyytamqezwdymkb/sql/new"
    );
    console.log("   2. Copy ALL contents from: supabase_schema.sql");
    console.log("   3. Paste into SQL Editor");
    console.log("   4. Click 'Run' button");
    console.log("\n   After tables are created, run:");
    console.log("   node scripts/migrate-json-to-supabase.js\n");
  } else {
    console.log("\n✅ All tables exist!");
    console.log("\n🎉 Ready to migrate data. Run:");
    console.log("   node scripts/migrate-json-to-supabase.js\n");
  }
}

createTables();
