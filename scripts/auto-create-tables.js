// Auto-create Supabase tables using SQL execution
import "dotenv/config";
import fs from "fs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function executeSql(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  return response;
}

async function createTables() {
  console.log("🚀 Auto-creating Supabase tables...\n");

  // Read schema
  const schemaSQL = fs.readFileSync("./supabase_schema.sql", "utf8");

  // First, create a helper function in Supabase to execute SQL
  console.log("📝 Step 1: Creating SQL executor function...");
  const createFunctionSQL = `
    CREATE OR REPLACE FUNCTION exec(query text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE query;
    END;
    $$;
  `;

  try {
    let response = await executeSql(createFunctionSQL);
    if (!response.ok) {
      console.log(
        "   ⚠️  Function might already exist or need manual creation"
      );
    } else {
      console.log("   ✓ SQL executor function ready");
    }
  } catch (err) {
    console.log("   ⚠️  Could not create executor function");
  }

  // Now execute the schema
  console.log("\n📋 Step 2: Creating all tables...");

  // Split into individual statements and execute
  const statements = schemaSQL
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  let created = 0;
  for (const statement of statements) {
    if (statement.startsWith("create table")) {
      const match = statement.match(/create table if not exists (\w+)/);
      const tableName = match ? match[1] : "table";

      try {
        const response = await executeSql(statement);
        if (response.ok) {
          console.log(`   ✓ Created: ${tableName}`);
          created++;
        } else {
          const error = await response.text();
          if (error.includes("already exists")) {
            console.log(`   ✓ Exists: ${tableName}`);
            created++;
          } else {
            console.log(`   ✗ Failed: ${tableName}`);
          }
        }
      } catch (err) {
        console.log(`   ✗ Error: ${tableName}`);
      }
    }
  }

  if (created === 0) {
    console.log("\n❌ Could not create tables automatically");
    console.log("\n🔧 MANUAL SETUP REQUIRED:");
    console.log(
      "   Supabase restricts programmatic table creation for security."
    );
    console.log("\n   Please follow these steps:");
    console.log(
      "   1. Open: https://supabase.com/dashboard/project/evgqbzyytamqezwdymkb/sql/new"
    );
    console.log("   2. Copy contents of: supabase_schema.sql");
    console.log("   3. Paste and click 'Run'");
    console.log("\n   Then run: node scripts/migrate-json-to-supabase.js\n");
  } else {
    console.log(`\n✅ Created/verified ${created} tables!`);
    console.log("\n🎉 Ready to migrate! Run:");
    console.log("   node scripts/migrate-json-to-supabase.js\n");
  }
}

createTables();
