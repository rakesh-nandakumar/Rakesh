import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, value, id, url, userAgent, timestamp } = body;

    // Validate required fields
    if (!name || value === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name and value" },
        { status: 400 }
      );
    }

    // Log the metric (in a real app, you'd store this in a database)
    console.log("Web Vital:", {
      metric: name,
      value: value,
      id: id,
      url: url,
      userAgent: userAgent?.substring(0, 100), // Truncate long user agents
      timestamp: new Date(timestamp).toISOString(),
      grade: getMetricGrade(name, value),
    });

    // Here you could:
    // 1. Store in database (PostgreSQL, MongoDB, etc.)
    // 2. Send to analytics service (Google Analytics, DataDog, etc.)
    // 3. Send to logging service (LogRocket, Sentry, etc.)

    // Example: Store in database
    // await db.collection('web-vitals').add({
    //   name,
    //   value,
    //   id,
    //   url,
    //   userAgent,
    //   timestamp: new Date(timestamp),
    //   createdAt: new Date()
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing web vitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getMetricGrade(name, value) {
  const thresholds = {
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FID: { good: 100, needsImprovement: 300 },
    FCP: { good: 1800, needsImprovement: 3000 },
    LCP: { good: 2500, needsImprovement: 4000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  };

  const threshold = thresholds[name];
  if (!threshold) return "unknown";

  if (value <= threshold.good) return "good";
  if (value <= threshold.needsImprovement) return "needs-improvement";
  return "poor";
}

// GET endpoint to retrieve web vitals data (optional)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const metric = searchParams.get("metric");
  const days = parseInt(searchParams.get("days") || "7");

  // In a real app, you'd query your database here
  // const data = await db.collection('web-vitals')
  //   .where('name', '==', metric)
  //   .where('timestamp', '>=', new Date(Date.now() - days * 24 * 60 * 60 * 1000))
  //   .orderBy('timestamp', 'desc')
  //   .get();

  return NextResponse.json({
    message: "Web vitals data endpoint",
    metric,
    days,
    note: "Connect to your database to retrieve actual data",
  });
}
