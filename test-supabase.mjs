// Simple test to check Supabase connection and data
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Set ✓' : 'Missing ✗');
console.log('Supabase Key:', supabaseAnonKey ? 'Set ✓' : 'Missing ✗');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function testTables() {
  const tables = [
    'profiles',
    'blogs', 
    'portfolios',
    'services',
    'technologies',
    'timelines',
    'headers',
    'galleries',
    'site_configs'
  ];

  console.log('\n--- Testing Supabase Tables ---\n');

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: false })
        .limit(1);

      if (error) {
        console.log(`❌ ${table}: Error - ${error.message}`);
      } else if (data && data.length > 0) {
        console.log(`✅ ${table}: Has data (${data.length}+ rows)`);
        console.log(`   Sample: ${JSON.stringify(data[0]).substring(0, 100)}...`);
      } else {
        console.log(`⚠️  ${table}: Empty (no rows)`);
      }
    } catch (e) {
      console.log(`❌ ${table}: Exception - ${e.message}`);
    }
  }

  console.log('\n--- Test Complete ---');
}

testTables().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
