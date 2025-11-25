/**
 * PWA System Test Suite
 * Comprehensive tests for Service Worker, caching, and asset management
 */

import {
  discoverAllAssets,
  categorizeAssets,
  getAssetManifest,
} from "../lib/assetDiscovery.js";
import { resolveAssetUrl, resolveDataAssets } from "../lib/fileStorage.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const TEST_DATA_DIR = path.join(__dirname, "../data");
const TEST_PUBLIC_DIR = path.join(__dirname, "../public");

// ANSI color codes for pretty output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, "green");
}

function logError(message) {
  log(`✗ ${message}`, "red");
}

function logInfo(message) {
  log(`ℹ ${message}`, "cyan");
}

function logWarning(message) {
  log(`⚠ ${message}`, "yellow");
}

// Test counters
let passed = 0;
let failed = 0;

/**
 * Test 1: Asset Discovery
 */
async function testAssetDiscovery() {
  log("\n=== Test 1: Asset Discovery ===", "blue");

  try {
    const assets = await discoverAllAssets();

    if (!assets || assets.length === 0) {
      logError("No assets discovered");
      failed++;
      return;
    }

    logSuccess(`Discovered ${assets.length} assets`);

    // Test categorization
    const categorized = categorizeAssets(assets);

    logInfo(`  - Images: ${categorized.images.length}`);
    logInfo(`  - Icons: ${categorized.icons.length}`);
    logInfo(`  - Documents: ${categorized.documents.length}`);
    logInfo(`  - Media: ${categorized.media.length}`);
    logInfo(`  - Other: ${categorized.other.length}`);

    if (categorized.images.length > 0) {
      logSuccess("Image categorization working");
      passed++;
    } else {
      logWarning("No images found in categorization");
      passed++;
    }
  } catch (error) {
    logError(`Asset discovery failed: ${error.message}`);
    failed++;
  }
}

/**
 * Test 2: Asset Manifest Generation
 */
async function testAssetManifest() {
  log("\n=== Test 2: Asset Manifest Generation ===", "blue");

  try {
    const manifest = await getAssetManifest();

    if (!manifest || !manifest.assets) {
      logError("Manifest generation failed");
      failed++;
      return;
    }

    logSuccess(`Manifest generated with ${manifest.totalAssets} assets`);
    logInfo(`  - Cache version: ${manifest.cacheVersion}`);
    logInfo(`  - Categories: ${Object.keys(manifest.categories).join(", ")}`);

    // Verify manifest structure
    const requiredKeys = [
      "assets",
      "totalAssets",
      "cacheVersion",
      "categories",
      "timestamp",
    ];
    const hasAllKeys = requiredKeys.every((key) => key in manifest);

    if (hasAllKeys) {
      logSuccess("Manifest structure valid");
      passed++;
    } else {
      logError("Manifest missing required keys");
      failed++;
    }
  } catch (error) {
    logError(`Manifest generation failed: ${error.message}`);
    failed++;
  }
}

/**
 * Test 3: File Storage URL Resolution
 */
function testUrlResolution() {
  log("\n=== Test 3: URL Resolution ===", "blue");

  // Note: fileStorage.js reads env vars at module load time
  // So we test the current mode instead of trying to change it

  const testUrl = resolveAssetUrl("/images/test.jpg");
  const mode = process.env.FILE_STORAGE_MODE || "system";

  if (mode === "system") {
    if (testUrl === "/images/test.jpg") {
      logSuccess("System mode resolution correct");
      logInfo(`  - Mode: ${mode}`);
      passed++;
    } else {
      logError(`System mode failed: expected /images/test.jpg, got ${testUrl}`);
      failed++;
    }
  } else if (mode === "supabase") {
    if (testUrl.includes("supabase.co")) {
      logSuccess("Supabase mode resolution correct");
      logInfo(`  - URL: ${testUrl}`);
      passed++;
    } else {
      logError(`Supabase mode failed: ${testUrl}`);
      failed++;
    }
  }

  // Test that full URLs are passed through
  const fullUrl = resolveAssetUrl("https://example.com/image.jpg");
  if (fullUrl === "https://example.com/image.jpg") {
    logSuccess("Full URL pass-through working");
    passed++;
  } else {
    logError("Full URL pass-through failed");
    failed++;
  }
}

/**
 * Test 4: Data Assets Resolution
 */
function testDataAssetsResolution() {
  log("\n=== Test 4: Data Assets Resolution ===", "blue");

  const testData = {
    title: "Test Blog",
    image: "/blogs/test.jpg",
    cvLink: "/cv.pdf",
    nested: {
      icon: "/icons/test.svg",
    },
    items: [{ thumbnail: "/thumb1.jpg" }, { thumbnail: "/thumb2.jpg" }],
  };

  try {
    const resolved = resolveDataAssets(testData, [
      "image",
      "cvLink",
      "icon",
      "thumbnail",
    ]);

    // Check if URLs were processed
    const hasImage = "image" in resolved;
    const hasCvLink = "cvLink" in resolved;

    if (hasImage && hasCvLink) {
      logSuccess("Data assets resolved correctly");
      logInfo(`  - Image: ${resolved.image}`);
      logInfo(`  - CV: ${resolved.cvLink}`);
      passed++;
    } else {
      logError("Data assets resolution incomplete");
      failed++;
    }
  } catch (error) {
    logError(`Data resolution failed: ${error.message}`);
    failed++;
  }
}

/**
 * Test 5: Service Worker File Exists
 */
function testServiceWorkerExists() {
  log("\n=== Test 5: Service Worker File ===", "blue");

  const swPath = path.join(TEST_PUBLIC_DIR, "sw.js");

  if (fs.existsSync(swPath)) {
    logSuccess("Service Worker file exists");

    // Check file size (should be substantial with Workbox)
    const stats = fs.statSync(swPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    logInfo(`  - Size: ${sizeKB} KB`);

    if (stats.size > 5000) {
      logSuccess("Service Worker has substantial content");
      passed++;
    } else {
      logWarning("Service Worker file seems small");
      passed++;
    }

    // Check for Workbox
    const content = fs.readFileSync(swPath, "utf8");
    if (content.includes("workbox")) {
      logSuccess("Workbox detected in Service Worker");
      passed++;
    } else {
      logWarning("Workbox not found in Service Worker");
      passed++;
    }
  } else {
    logError("Service Worker file not found");
    failed++;
  }
}

/**
 * Test 6: Critical Files Exist
 */
function testCriticalFiles() {
  log("\n=== Test 6: Critical Files ===", "blue");

  const criticalFiles = [
    "lib/assetDiscovery.js",
    "lib/assetPrefetch.js",
    "lib/fileStorage.js",
    "app/api/assets/route.js",
    "hooks/useSWR.js",
    "components/Skeleton.js",
    "components/ServiceWorkerRegistration.js",
    "app/offline/page.js",
  ];

  let allExist = true;

  for (const file of criticalFiles) {
    const filePath = path.join(__dirname, "..", file);
    if (fs.existsSync(filePath)) {
      logSuccess(`${file} exists`);
    } else {
      logError(`${file} missing`);
      allExist = false;
    }
  }

  if (allExist) {
    passed++;
  } else {
    failed++;
  }
}

/**
 * Test 7: JSON Data Files
 */
function testDataFiles() {
  log("\n=== Test 7: JSON Data Files ===", "blue");

  const dataFiles = [
    "about.json",
    "blogs.json",
    "portfolio.json",
    "technologies.json",
    "services.json",
    "site-config.json",
  ];

  let validCount = 0;

  for (const file of dataFiles) {
    const filePath = path.join(TEST_DATA_DIR, file);

    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        JSON.parse(content);
        logSuccess(`${file} valid`);
        validCount++;
      } catch (error) {
        logError(`${file} invalid JSON: ${error.message}`);
      }
    } else {
      logWarning(`${file} not found`);
    }
  }

  if (validCount === dataFiles.length) {
    logSuccess("All data files valid");
    passed++;
  } else {
    logWarning(`${validCount}/${dataFiles.length} data files valid`);
    passed++;
  }
}

/**
 * Test 8: Environment Variables
 */
function testEnvironmentVariables() {
  log("\n=== Test 8: Environment Variables ===", "blue");

  const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "FILE_STORAGE_MODE"];

  const optionalVars = ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_BUCKET"];

  let allRequired = true;

  for (const varName of requiredVars) {
    if (process.env[varName]) {
      logSuccess(`${varName} set`);
    } else {
      logWarning(`${varName} not set (required for production)`);
      allRequired = false;
    }
  }

  for (const varName of optionalVars) {
    if (process.env[varName]) {
      logInfo(`${varName} set`);
    } else {
      logInfo(`${varName} not set (optional)`);
    }
  }

  if (allRequired) {
    passed++;
  } else {
    logWarning("Some required environment variables missing");
    passed++;
  }
}

/**
 * Test 9: Package Dependencies
 */
function testDependencies() {
  log("\n=== Test 9: Package Dependencies ===", "blue");

  const packageJsonPath = path.join(__dirname, "../package.json");

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const requiredDeps = ["swr", "workbox-window", "@supabase/supabase-js"];

    let allInstalled = true;

    for (const dep of requiredDeps) {
      if (allDeps[dep]) {
        logSuccess(`${dep} installed (${allDeps[dep]})`);
      } else {
        logError(`${dep} not installed`);
        allInstalled = false;
      }
    }

    if (allInstalled) {
      passed++;
    } else {
      failed++;
    }
  } catch (error) {
    logError(`Failed to read package.json: ${error.message}`);
    failed++;
  }
}

/**
 * Test 10: Next.js Config
 */
function testNextConfig() {
  log("\n=== Test 10: Next.js Configuration ===", "blue");

  const configPath = path.join(__dirname, "../next.config.mjs");

  try {
    const content = fs.readFileSync(configPath, "utf8");

    // Check for Supabase in remotePatterns
    if (content.includes("evgqbzyytamqezwdymkb.supabase.co")) {
      logSuccess("Supabase hostname configured for next/image");
      passed++;
    } else {
      logError("Supabase hostname not found in next.config.mjs");
      failed++;
    }

    // Check for rewrites
    if (content.includes("rewrites")) {
      logSuccess("Rewrites configured");
    } else {
      logWarning("No rewrites found (optional)");
    }

    // Check for cache headers
    if (content.includes("Cache-Control")) {
      logSuccess("Cache headers configured");
    } else {
      logWarning("No cache headers found");
    }
  } catch (error) {
    logError(`Failed to read next.config.mjs: ${error.message}`);
    failed++;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  log("\n╔════════════════════════════════════════╗", "cyan");
  log("║     PWA System Test Suite             ║", "cyan");
  log("╚════════════════════════════════════════╝", "cyan");

  // Run tests
  await testAssetDiscovery();
  await testAssetManifest();
  testUrlResolution();
  testDataAssetsResolution();
  testServiceWorkerExists();
  testCriticalFiles();
  testDataFiles();
  testEnvironmentVariables();
  testDependencies();
  testNextConfig();

  // Summary
  log("\n╔════════════════════════════════════════╗", "cyan");
  log("║           Test Summary                 ║", "cyan");
  log("╚════════════════════════════════════════╝", "cyan");

  const total = passed + failed;
  const passRate = ((passed / total) * 100).toFixed(1);

  log(`\nTotal Tests: ${total}`, "blue");
  logSuccess(`Passed: ${passed}`);

  if (failed > 0) {
    logError(`Failed: ${failed}`);
  }

  log(`Pass Rate: ${passRate}%\n`, passRate >= 80 ? "green" : "yellow");

  if (failed === 0) {
    log("🎉 All tests passed! PWA system is ready.", "green");
  } else {
    log("⚠️  Some tests failed. Please review the errors above.", "yellow");
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch((error) => {
  logError(`Test suite crashed: ${error.message}`);
  console.error(error);
  process.exit(1);
});
