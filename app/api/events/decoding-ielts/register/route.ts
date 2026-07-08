import { NextRequest, NextResponse } from 'next/server';

const requiredFields = [
  'name',
  'department',
  'batch',
  'registrationNo',
  'hall',
  'email',
  'contact',
  'furtherGuidance',
  'workshopInterest',
  'expoInterest',
] as const;

type WebhookResult = {
  ok?: boolean;
  duplicate?: boolean;
  message?: string;
  submissionId?: string;
  rowNumber?: number;
};

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid registration request.' },
      { status: 400 }
    );
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const missing = requiredFields.some(
    (field) =>
      typeof payload[field] !== 'string' || !String(payload[field]).trim()
  );

  const goals = Array.isArray(payload.primaryGoals)
    ? payload.primaryGoals.filter((value) => typeof value === 'string')
    : [];

  if (missing || goals.length === 0) {
    return NextResponse.json(
      { message: 'Complete all required fields before submitting.' },
      { status: 400 }
    );
  }

  const email = String(payload.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: 'Enter a valid email address.' },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.DECODING_IELTS_REGISTRATION_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        message:
          'The registration database connection is not active yet. Please try again shortly.',
      },
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
      redirect: 'follow',
    });

    const responseText = await response.text();
    let result: WebhookResult = {};

    if (responseText) {
      try {
        result = JSON.parse(responseText) as WebhookResult;
      } catch {
        console.error('Apps Script returned a non-JSON response', {
          status: response.status,
          redirected: response.redirected,
          url: response.url,
          responsePreview: responseText.slice(0, 300),
        });
      }
    }

    if (result.ok === true) {
      return NextResponse.json(
        {
          ok: true,
          duplicate: Boolean(result.duplicate),
          message:
            result.message ||
            (result.duplicate
              ? 'This registration has already been received.'
              : 'Registration submitted successfully.'),
          submissionId: result.submissionId,
          rowNumber: result.rowNumber,
        },
        { status: result.duplicate ? 200 : 201 }
      );
    }

    if (result.ok === false) {
      console.error('Apps Script rejected registration', {
        status: response.status,
        message: result.message,
      });

      return NextResponse.json(
        {
          message:
            result.message ||
            'Registration could not be saved. Please try again.',
        },
        { status: 502 }
      );
    }

    if (response.ok) {
      return NextResponse.json(
        {
          ok: true,
          message: 'Registration submitted successfully.',
        },
        { status: 201 }
      );
    }

    console.error('Apps Script returned an unsuccessful HTTP response', {
      status: response.status,
      statusText: response.statusText,
      redirected: response.redirected,
      url: response.url,
      responsePreview: responseText.slice(0, 300),
    });

    return NextResponse.json(
      { message: 'Registration could not be saved. Please try again.' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Registration webhook request failed', error);

    return NextResponse.json(
      {
        message:
          'Registration service is temporarily unavailable. Please try again.',
      },
      { status: 502 }
    );
  }
}
