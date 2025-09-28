// Gmail Authentication Diagnostic Script

async function diagnoseGmailAuth() {
  console.log("🔍 Gmail Authentication Diagnostic\n");

  // Check environment variables (client-side won't show actual values for security)
  console.log("📧 Checking Gmail configuration...");

  try {
    // Test the API endpoint
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        subject: "Gmail Auth Test",
        message: "Testing Gmail authentication after app password fix.",
      }),
    });

    const result = await response.json();

    console.log("📡 API Response:", result);

    if (result.success) {
      console.log("✅ SUCCESS: Gmail authentication is working!");
      console.log(
        "📧 Email should be delivered to rakeshnandakumarr@gmail.com"
      );
    } else {
      console.log("❌ FAILED: Gmail authentication error");
      console.log("🔧 Error details:", result.error);

      if (result.error.includes("Username and Password not accepted")) {
        console.log("\n🛠️  Troubleshooting Steps:");
        console.log("1. Check if 2FA is enabled on your Google account");
        console.log(
          "2. Generate a new App Password at: https://myaccount.google.com/security"
        );
        console.log(
          "3. Update .env file with the 16-character password (no spaces)"
        );
        console.log("4. Restart the development server");
      }
    }
  } catch (error) {
    console.error("❌ Network/API Error:", error);
  }
}

// Check current configuration
function checkCurrentConfig() {
  console.log("⚙️  Current Configuration Check:");
  console.log("- Server running on: http://localhost:3002");
  console.log("- Contact form: http://localhost:3002/contact");
  console.log("- API endpoint: http://localhost:3002/api/contact");
  console.log("\n💡 Note: Actual credentials are hidden for security");
}

console.log("🚀 Gmail Auth Diagnostic Tool\n");
checkCurrentConfig();
console.log("\n🧪 Testing authentication...\n");
diagnoseGmailAuth();

export { diagnoseGmailAuth, checkCurrentConfig };
