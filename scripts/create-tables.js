// Create Supabase tables using direct PostgreSQL connection
import dotenv from "dotenv";
import fs from "fs";
import pkg from "pg";
const { Client } = pkg;

dotenv.config();

async function createTables() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("🔌 Connecting to Supabase PostgreSQL...");
    await client.connect();
    console.log("✅ Connected successfully");

    // Read the schema file
    const schemaSQL = fs.readFileSync("./supabase_schema.sql", "utf8");

    console.log("\n📋 Creating tables...");
    await client.query(schemaSQL);

    console.log("✅ All tables created successfully!");
    console.log("\n📊 Tables created:");
    console.log("  - blogs");
    console.log("  - portfolio_projects");
    console.log("  - technologies");
    console.log("  - services");
    console.log("  - gallery_items");
    console.log("  - about_profile");
    console.log("  - timeline_items");
    console.log("  - header_navigation");
    console.log("  - site_config");

    console.log("\n✅ Database schema setup complete!");
    console.log("   You can now run: node scripts/migrate-json-to-supabase.js");
  } catch (error) {
    console.error("❌ Error creating tables:", error.message);
    console.error("   Full error:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createTables();
