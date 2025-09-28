import { NextResponse } from 'next/server';

// Web Vitals data collection endpoint
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, value, id, delta, entries } = body;

    // Log the metric data (in production, you might want to store this in a database)
    console.log('Web Vital:', {
      name,
      value,
      id,
      delta,
      timestamp: new Date().toISOString(),
      url: request.url,
      userAgent: request.headers.get('user-agent'),
    });

    // Here you can send the data to your analytics service
    // Examples:
    // - Send to Google Analytics
    // - Store in database
    // - Send to monitoring service like DataDog, New Relic, etc.

    // For now, we'll just return success
    return NextResponse.json({ 
      success: true, 
      message: 'Web vital recorded successfully' 
    });

  } catch (error) {
    console.error('Error processing web vital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process web vital' },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for health check)
export async function GET() {
  return NextResponse.json({ 
    status: 'Web Vitals endpoint is active',
    timestamp: new Date().toISOString()
  });
}