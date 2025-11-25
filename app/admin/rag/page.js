"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DEFAULT_MANIFEST = {
  version: "2.0.0",
  tables: {
    profiles: {
      priority: "critical",
      alwaysInclude: true,
      query: "*",
      summaryTemplate: "{name} is a developer. {short_bio}. CV: {cv_link}.",
    },
    contacts: {
      priority: "high",
      alwaysInclude: true,
      query: "*, contact_types(name, icon)",
      itemSummaryTemplate: "{contact_types.name}: {value}",
    },
    timelines: {
      priority: "high",
      query: "*, timeline_categories(name), timeline_technologies(technology)",
      itemSummaryTemplate:
        "{title} ({time}) [{timeline_categories.name}]: {short_description}. Tech: {timeline_technologies.technology}.",
    },
    portfolios: {
      priority: "high",
      query: "*, portfolio_technologies(technology)",
      itemSummaryTemplate:
        "Project: {title} [{category}]. {short_description}. Live: {live_link}. GitHub: {github_link}.",
    },
    blogs: {
      priority: "medium",
      query: "title, excerpt, slug, category, date",
      itemSummaryTemplate: "Blog: {title} ({date}) [{category}]. {excerpt}.",
    },
  },
  retrievalRules: {
    defaultTopK: 6,
    maxItemsPerTable: {
      timelines: 4,
      portfolios: 3,
      blogs: 3,
    },
  },
};

const DEFAULT_ENABLED = {
  profiles: true,
  contacts: true,
  timelines: true,
  portfolios: true,
  blogs: true,
};

export default function RagAdmin() {
  const [manifest, setManifest] = useState("");
  const [enabledSections, setEnabledSections] = useState(DEFAULT_ENABLED);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [message, setMessage] = useState("");

  // Load from database
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from("rag_config")
        .select("key, value");

      if (error) throw error;

      const config = {};
      data.forEach((row) => {
        config[row.key] = row.value;
      });

      setManifest(
        JSON.stringify(config.manifest_json || DEFAULT_MANIFEST, null, 2)
      );
      setEnabledSections(config.enabled_sections || DEFAULT_ENABLED);
    } catch (error) {
      console.error("Failed to load config:", error);
      setMessage("Failed to load configuration. Using defaults.");
      setManifest(JSON.stringify(DEFAULT_MANIFEST, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Save to database
  const saveConfig = async () => {
    setSaving(true);
    setMessage("");

    try {
      const manifestObj = JSON.parse(manifest);

      // Upsert manifest
      const { error: manifestError } = await supabase
        .from("rag_config")
        .upsert({
          key: "manifest_json",
          value: manifestObj,
        });

      if (manifestError) throw manifestError;

      // Upsert enabled sections
      const { error: sectionsError } = await supabase
        .from("rag_config")
        .upsert({
          key: "enabled_sections",
          value: enabledSections,
        });

      if (sectionsError) throw sectionsError;

      setMessage("✅ Configuration saved successfully!");

      // Clear server-side cache
      await fetch("/api/rag-cache-clear", { method: "POST" });
    } catch (error) {
      console.error("Save error:", error);
      setMessage("❌ Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Generate preview
  const generatePreview = async () => {
    setPreviewing(true);
    setPreview("");
    setMessage("");

    try {
      const manifestObj = JSON.parse(manifest);

      const response = await fetch("/api/rag-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manifest: manifestObj,
          enabledSections,
          query: "What projects have you built?",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Preview failed");
      }

      setPreview(data.context);
      setMessage("✅ Preview generated");
    } catch (error) {
      console.error("Preview error:", error);
      setMessage("❌ Preview error: " + error.message);
    } finally {
      setPreviewing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RAG configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            RAG Configuration Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Configure how the AI assistant retrieves context from your portfolio
            data
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.startsWith("✅")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Manifest Editor */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">RAG Manifest (JSON)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Define which tables to query, how to format results, and retrieval
              rules
            </p>
            <textarea
              value={manifest}
              onChange={(e) => setManifest(e.target.value)}
              className="w-full h-[500px] font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              spellCheck={false}
            />
          </div>

          {/* Right Column: Section Toggles & Preview */}
          <div className="space-y-6">
            {/* Section Toggles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Enabled Sections</h2>
              <p className="text-sm text-gray-600 mb-4">
                Toggle which data sections the AI can access
              </p>
              <div className="space-y-3">
                {Object.keys(enabledSections).map((section) => (
                  <label
                    key={section}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={enabledSections[section]}
                      onChange={(e) =>
                        setEnabledSections({
                          ...enabledSections,
                          [section]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 capitalize font-medium">
                      {section}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={saveConfig}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Saving..." : "Save Configuration"}
              </button>
              <button
                onClick={generatePreview}
                disabled={previewing}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {previewing ? "Generating..." : "Preview Context"}
              </button>
            </div>

            {/* Preview Output */}
            {preview && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Context Preview</h2>
                <p className="text-sm text-gray-600 mb-4">
                  This is what the AI will see when answering questions
                </p>
                <pre className="p-4 bg-gray-50 rounded-lg text-xs overflow-auto max-h-96 whitespace-pre-wrap font-mono">
                  {preview}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Quick Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>Query:</strong> Supabase select syntax (e.g., "*,
              contacts(value)")
            </div>
            <div>
              <strong>Template:</strong> Use {`{field_name}`} for placeholders
            </div>
            <div>
              <strong>Priority:</strong> critical, high, medium, low
            </div>
            <div>
              <strong>maxItemsPerTable:</strong> Limit results per section
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
