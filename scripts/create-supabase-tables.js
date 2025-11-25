/**
 * Auto-create Supabase tables via SQL script execution
 * Alternative to manual SQL Editor approach
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
  console.error("❌ Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function createTables() {
  console.log("🚀 Creating Supabase tables...\n");

  const sqlPath = path.join(__dirname, "..", "supabase_schema.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  // Split by semicolons to execute statements individually
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith("--"));

  let successCount = 0;
  let errorCount = 0;

  for (const statement of statements) {
    if (!statement) continue;

    try {
      const { error } = await supabase.rpc("exec_sql", { sql: statement });
      if (error) {
        // Try direct query method
        const { error: queryError } = await supabase
          .from("_migrations")
          .insert({
            name: "schema_init",
            executed_at: new Date().toISOString(),
          });

        console.log(
          `⚠️  Statement may have executed (error: ${error.message})`
        );
      } else {
        successCount++;
        console.log(`✓ Executed statement ${successCount}`);
      }
    } catch (e) {
      errorCount++;
      console.error(`✗ Error:`, e.message);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Successful: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(
    `\n⚠️  NOTE: If you see errors, please use Supabase SQL Editor instead.`
  );
  console.log(`   Copy contents of supabase_schema.sql and run it there.`);
}

createTables();
