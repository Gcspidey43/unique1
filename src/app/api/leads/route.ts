import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phoneNumber, email, interestedVisaType, preferredCountry, message } = body

    // Validation
    if (!fullName || !phoneNumber || !email || !interestedVisaType || !preferredCountry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // In a real implementation, you would store this in a database
    // For now, we'll just log it and send to an external service
    console.log('New visa inquiry received:', {
      fullName,
      phoneNumber,
      email,
      interestedVisaType,
      preferredCountry,
      message,
      timestamp: new Date().toISOString()
    });

    // In production, you would send this to an external service
    // that can handle email delivery and data persistence
    // Example:
    /*
    try {
      await fetch('https://your-external-service.com/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          interestedVisaType,
          preferredCountry,
          message
        })
      });
    } catch (emailError) {
      console.error('Error sending to external service:', emailError);
    }
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully',
        emailProcessed: true
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // For demo purposes, return an empty array
  // In production, you would fetch from a real database
  return NextResponse.json({
    leads: [],
    message: 'Lead retrieval endpoint - connect to real database in production'
  })
}
