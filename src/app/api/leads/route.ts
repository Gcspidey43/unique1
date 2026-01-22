import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createLeadEmail } from '@/lib/email/email'

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

    // Send email notification
    const emailHtml = createLeadEmail({
      fullName,
      phoneNumber,
      email,
      interestedVisaType,
      preferredCountry,
      message
    })

    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'gcspideysir@gmail.com'
    const emailResult = await sendEmail({
      to: notificationEmail,
      subject: `🌍 New Visa Inquiry: ${fullName} - ${interestedVisaType} to ${preferredCountry}`,
      html: emailHtml
    })

    return NextResponse.json(
      {
        success: true,
        leadId: newLead.id,
        emailSent: emailResult.success
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
