import { NextResponse } from 'next/server';

/**
 * API endpoint to collect Web Vitals metrics
 * POST /api/analytics/vitals
 */
export async function POST(request) {
  try {
    const metric = await request.json();

    // Validate metric
    if (!metric || !metric.name || metric.value === undefined) {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Log metric (in production, you'd store this in a database)
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      timestamp: new Date().toISOString(),
    });

    // Here you could:
    // 1. Store in database for analytics
    // 2. Send to external analytics service
    // 3. Trigger alerts for poor metrics
    // Example:
    // await storeMetric(metric);
    // if (metric.rating === 'poor') {
    //   await triggerAlert(metric);
    // }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
