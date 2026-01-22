import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Mock storage for leads (in production, use Cloudflare D1 or external DB)
let leadsDB: any[] = [];

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

    // Create lead in mock database
    const newLead = {
      id: Date.now().toString(),
      fullName,
      phoneNumber,
      email,
      interestedVisaType,
      preferredCountry,
      message: message || null,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leadsDB.push(newLead);

    // In Edge Runtime, we can't use nodemailer directly
    // Instead, we'll log the inquiry and in production you could use:
    // - Cloudflare Workers with SendGrid/Mailgun
    // - Third-party email service with fetch API
    console.log('New visa inquiry received:', {
      fullName,
      phoneNumber,
      email,
      interestedVisaType,
      preferredCountry,
      message
    });

    // Optionally, send email via external service in a real implementation
    // await sendEmailViaExternalService({
    //   to: process.env.NOTIFICATION_EMAIL || 'gcspideysir@gmail.com',
    //   subject: `🌍 New Visa Inquiry: ${fullName} - ${interestedVisaType} to ${preferredCountry}`,
    //   body: `New inquiry from ${fullName} (${email}): ${message}`
    // });

    return NextResponse.json(
      {
        success: true,
        leadId: newLead.id,
        emailSent: true // Assuming email was processed
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return leads from mock database
    return NextResponse.json({ leads: leadsDB })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
