export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendWaitlistWelcome } from '@/lib/email';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { email, referralSource } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get user agent for analytics
    const userAgent = request.headers.get('user-agent') || '';

    // Check if email already exists
    const existingUser = await sql`
      SELECT id FROM waitlist_users WHERE email = ${normalizedEmail}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered for waitlist' },
        { status: 409 }
      );
    }

    // Insert new user
    await sql`
      INSERT INTO waitlist_users (email, referral_source, user_agent)
      VALUES (${normalizedEmail}, ${referralSource || null}, ${userAgent})
    `;

    // Get current count
    const countResult = await sql`
      SELECT COUNT(*) as count FROM waitlist_users
    `;
    const count = parseInt(countResult[0].count);

    // Send welcome email - await it to ensure it completes before function terminates
    console.log('BEFORE sending welcome email:', normalizedEmail);
    const emailResult = await sendWaitlistWelcome(normalizedEmail);
    console.log('AFTER sending welcome email:', normalizedEmail, emailResult);

    return NextResponse.json(
      {
        message: 'Successfully joined waitlist!',
        count
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const countResult = await sql`
      SELECT COUNT(*) as count FROM waitlist_users
    `;
    const count = parseInt(countResult[0].count);

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Get waitlist count error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}