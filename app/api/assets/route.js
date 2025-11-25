/**
 * Assets API Route
 * Returns list of all Supabase assets for prefetching and caching
 * Used by Service Worker and client-side caching strategies
 */

import { NextResponse } from "next/server";
import {
  discoverAllAssets,
  categorizeAssets,
  getAssetManifest,
} from "@/lib/assetDiscovery";
import { resolveAssetUrl, getStorageMode } from "@/lib/fileStorage";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /api/assets
 * Returns manifest of all assets with resolved URLs
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "full";
    const category = searchParams.get("category");

    // Get asset manifest (now async)
    const manifest = await getAssetManifest();
    const storageMode = getStorageMode();

    // Get all assets from categorized structure
    const allAssets = [
      ...manifest.assets.images,
      ...manifest.assets.icons,
      ...manifest.assets.documents,
      ...manifest.assets.media,
      ...manifest.assets.other,
    ];

    // Resolve all URLs
    const resolvedAssets = allAssets.map((asset) => ({
      path: asset,
      url: resolveAssetUrl(asset),
      category: getCategoryForAsset(asset, manifest.assets),
    }));

    // Filter by category if requested
    let filteredAssets = resolvedAssets;
    if (category && manifest.assets[category]) {
      const categoryAssets = manifest.assets[category];
      filteredAssets = resolvedAssets.filter((a) =>
        categoryAssets.includes(a.path)
      );
    }

    // Return based on format
    let response;
    if (format === "urls") {
      // Simple array of URLs for prefetching
      response = filteredAssets.map((a) => a.url);
    } else if (format === "paths") {
      // Simple array of paths
      response = filteredAssets.map((a) => a.path);
    } else {
      // Full manifest with metadata
      response = {
        cacheVersion: manifest.cacheVersion,
        storageMode,
        totalAssets: filteredAssets.length,
        timestamp: manifest.timestamp,
        assets: filteredAssets,
        categories: manifest.categories,
      };
    }

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "CDN-Cache-Control": "public, max-age=86400",
        "Vercel-CDN-Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error generating assets manifest:", error);
    return NextResponse.json(
      { error: "Failed to generate assets manifest", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Helper to determine asset category
 */
function getCategoryForAsset(assetPath, categories) {
  for (const [category, assets] of Object.entries(categories)) {
    if (assets.includes(assetPath)) {
      return category;
    }
  }
  return "other";
}
