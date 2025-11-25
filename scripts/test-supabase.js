/**
 * Supabase Connection Test
 * Run this to verify database connectivity
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../.env") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing Supabase Connection...");
console.log("URL: " + (SUPABASE_URL ? "Found" : "Missing"));
console.log("Key: " + (SUPABASE_ANON_KEY ? "Found" : "Missing"));

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing Supabase credentials!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  try {
    console.log("Testing profiles table...");
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name")
      .limit(1)
      .single();

    if (error) {
      console.error("❌ Error:", error.message);
      console.error("Details:", error);
      return false;
    }

    console.log("✅ Successfully connected!");
    console.log("📊 Sample data:", data);
    return true;
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    return false;
  }
}

testConnection().then((success) => {
  process.exit(success ? 0 : 1);
});
