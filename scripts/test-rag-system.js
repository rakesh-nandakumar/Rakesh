/**
 * RAG System Test Script
 * Run this to verify the new RAG system is working correctly
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function testRagEndpoint() {
  console.log("\n🧪 Testing RAG Endpoint...");

  try {
    const response = await fetch(`${baseUrl}/api/rag`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "Tell me about experience and skills",
        maxTokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ RAG Endpoint Working");
    console.log("📊 Context Length:", data.context?.length || 0, "characters");
    console.log("📈 Token Estimate:", data.tokenEstimate || 0);
    console.log(
      "📋 Tables Included:",
      data.tablesIncluded?.join(", ") || "none"
    );

    if (data.context && data.context.length > 0) {
      console.log(
        "📝 Context Preview:",
        data.context.substring(0, 200) + "..."
      );
    }

    return true;
  } catch (error) {
    console.error("❌ RAG Endpoint Failed:", error.message);
    return false;
  }
}

async function testRagPreview() {
  console.log("\n🧪 Testing RAG Preview...");

  const testManifest = {
    sections: {
      profiles: {
        enabled: true,
        priority: 1,
        table: "profiles",
        columns: ["name", "title", "bio"],
        template: "Test: {name} - {title}",
      },
    },
    maxTokensPerSection: 500,
    maxTotalTokens: 1000,
  };

  try {
    const response = await fetch(`${baseUrl}/api/rag-preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        manifest: testManifest,
        query: "test query",
        maxTokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ RAG Preview Working");
    console.log(
      "📊 Preview Context Length:",
      data.context?.length || 0,
      "characters"
    );

    return true;
  } catch (error) {
    console.error("❌ RAG Preview Failed:", error.message);
    return false;
  }
}

async function testCacheClear() {
  console.log("\n🧪 Testing Cache Clear...");

  try {
    const response = await fetch(`${baseUrl}/api/rag-cache-clear`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Cache Clear Working");
    console.log("📝 Message:", data.message);

    return true;
  } catch (error) {
    console.error("❌ Cache Clear Failed:", error.message);
    return false;
  }
}

async function testChatEndpoint() {
  console.log("\n🧪 Testing Chat Endpoint (with context)...");

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Tell me about your skills",
        context:
          "Test context: Full Stack Developer with React and Node.js experience",
        conversationHistory: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      console.log("⚠️ Chat Endpoint Returned Error:", data.error);
      return false;
    }

    console.log("✅ Chat Endpoint Working");
    console.log(
      "📝 Response Preview:",
      data.answer?.substring(0, 100) ||
        data.response?.substring(0, 100) ||
        "No response"
    );

    return true;
  } catch (error) {
    console.error("❌ Chat Endpoint Failed:", error.message);
    return false;
  }
}

async function checkSupabaseTable() {
  console.log("\n🧪 Checking Supabase RAG Config Table...");

  try {
    // This will only work if the migration has been run
    const response = await fetch(`${baseUrl}/api/rag`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ RAG Config Table Accessible");
    console.log("📝 Status:", data.message || "OK");

    return true;
  } catch (error) {
    console.error("❌ RAG Config Table Check Failed:", error.message);
    console.log("💡 Hint: Make sure you ran the SQL migration!");
    return false;
  }
}

async function runAllTests() {
  console.log("🚀 Starting RAG System Tests...");
  console.log("🌐 Base URL:", baseUrl);
  console.log("=".repeat(50));

  const results = {
    supabaseTable: await checkSupabaseTable(),
    ragEndpoint: await testRagEndpoint(),
    ragPreview: await testRagPreview(),
    cacheClear: await testCacheClear(),
    chatEndpoint: await testChatEndpoint(),
  };

  console.log("\n" + "=".repeat(50));
  console.log("📊 Test Results Summary:");
  console.log("=".repeat(50));

  Object.entries(results).forEach(([test, passed]) => {
    console.log(
      `${passed ? "✅" : "❌"} ${test}: ${passed ? "PASSED" : "FAILED"}`
    );
  });

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;

  console.log("\n" + "=".repeat(50));
  console.log(`🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  console.log("=".repeat(50));

  if (passedTests === totalTests) {
    console.log("\n🎉 All tests passed! RAG system is fully operational.");
  } else {
    console.log("\n⚠️ Some tests failed. Check the logs above for details.");

    if (!results.supabaseTable) {
      console.log("\n💡 To fix Supabase table issue:");
      console.log("   1. Go to your Supabase Dashboard");
      console.log("   2. Navigate to SQL Editor");
      console.log(
        "   3. Run the migration: supabase/migrations/create_rag_config.sql"
      );
    }
  }
}

// Run tests
runAllTests().catch((error) => {
  console.error("\n❌ Test runner failed:", error);
  process.exit(1);
});
