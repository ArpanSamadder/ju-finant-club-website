import { NextRequest, NextResponse } from 'next/server';

const requiredFields = ['name', 'department', 'batch', 'registrationNo', 'hall', 'email', 'contact', 'furtherGuidance', 'workshopInterest', 'expoInterest'] as const;

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid registration request.' }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const missing = requiredFields.some((field) => typeof payload[field] !== 'string' || !String(payload[field]).trim());
  const goals = Array.isArray(payload.primaryGoals) ? payload.primaryGoals.filter((value) => typeof value === 'string') : [];

  if (missing || goals.length === 0) {
    return NextResponse.json({ message: 'Complete all required fields before submitting.' }, { status: 400 });
  }

  const email = String(payload.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  const webhookUrl = process.env.DECODING_IELTS_REGISTRATION_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: 'The registration database connection is not active yet. Please try again shortly.' },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': String(payload.idempotencyKey || ''),
      },
      body: JSON.stringify({ ...payload, primaryGoals: goals }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Registration could not be saved. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Registration service is temporarily unavailable. Please try again.' }, { status: 502 });
  }
}
