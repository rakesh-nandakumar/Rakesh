// Create Supabase tables using Supabase REST API
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PROJECT_REF = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

async function createTables() {
  console.log("📋 Reading schema file...");
  const schemaSQL = fs.readFileSync("./supabase_schema.sql", "utf8");

  console.log("🔌 Sending SQL to Supabase...");
  console.log(`   Project: ${PROJECT_REF}`);

  // Use Supabase's postgREST to execute raw SQL
  const url = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({ query: schemaSQL }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, response.statusText);
      console.error("   Response:", errorText);

      // Alternative: Try using the query endpoint
      console.log("\n🔄 Trying alternative approach...");
      console.log("   Please go to Supabase SQL Editor manually:");
      console.log(
        `   https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`
      );
      console.log("\n   Copy and paste the contents of supabase_schema.sql");
      console.log('   Then click "Run" to create the tables.');
      process.exit(1);
    }

    const result = await response.json();
    console.log("✅ Tables created successfully!");
    console.log("   Result:", result);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n📝 Manual Setup Required:");
    console.log(
      `   1. Open: https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`
    );
    console.log("   2. Copy all SQL from: supabase_schema.sql");
    console.log("   3. Paste into SQL Editor");
    console.log('   4. Click "Run" button');
    console.log("   5. Then run: node scripts/migrate-json-to-supabase.js");
  }
}

createTables();
