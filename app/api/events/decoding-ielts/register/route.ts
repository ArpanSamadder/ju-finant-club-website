import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

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

function parseWebhookResult(text: string): WebhookResult | null {
  if (!text) return null;

  try {
    return JSON.parse(text) as WebhookResult;
  } catch {
    return null;
  }
}

function successResponse(result: WebhookResult) {
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

function failureResponse(message?: string) {
  return NextResponse.json(
    {
      ok: false,
      message:
        message || 'Registration could not be saved. Please try again.',
    },
    { status: 502 }
  );
}

async function readVerifiedWebhookResult(
  response: Response,
  webhookUrl: string
): Promise<WebhookResult | null> {
  const isRedirect = [301, 302, 303, 307, 308].includes(response.status);

  if (isRedirect) {
    const location = response.headers.get('location');
    if (!location) return null;

    const confirmationUrl = new URL(location, webhookUrl).toString();
    const confirmationResponse = await fetch(confirmationUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      redirect: 'follow',
    });

    const confirmationText = await confirmationResponse.text();
    const result = parseWebhookResult(confirmationText);

    if (!confirmationResponse.ok || !result) {
      console.error('Apps Script confirmation response was invalid', {
        status: confirmationResponse.status,
        url: confirmationResponse.url,
        responsePreview: confirmationText.slice(0, 300),
      });
      return null;
    }

    return result;
  }

  const responseText = await response.text();
  const result = parseWebhookResult(responseText);

  if (!response.ok || !result) {
    console.error('Apps Script response was invalid', {
      status: response.status,
      url: response.url,
      responsePreview: responseText.slice(0, 300),
    });
    return null;
  }

  return result;
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid registration request.' },
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
      {
        ok: false,
        message: 'Complete all required fields before submitting.',
      },
      { status: 400 }
    );
  }

  const email = String(payload.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: 'Enter a valid email address.' },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.DECODING_IELTS_REGISTRATION_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'The registration database connection is not active yet. Please try again shortly.',
      },
      { status: 503 }
    );
  }

  try {
    /*
     * Apps Script ContentService responds through a Google redirect.
     * We handle that redirect explicitly, then read the final JSON body.
     * Success is returned only when Apps Script confirms { ok: true }.
     */
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Idempotency-Key': String(payload.idempotencyKey || ''),
      },
      body: JSON.stringify({ ...payload, primaryGoals: goals }),
      cache: 'no-store',
      redirect: 'manual',
    });

    const result = await readVerifiedWebhookResult(
      webhookResponse,
      webhookUrl
    );

    if (!result) {
      return failureResponse(
        'The registration service did not return a verified confirmation. Please try again.'
      );
    }

    if (result.ok === true) {
      return successResponse(result);
    }

    console.error('Apps Script rejected registration', {
      message: result.message,
    });

    return failureResponse(result.message);
  } catch (error) {
    console.error('Registration webhook request failed', error);

    return NextResponse.json(
      {
        ok: false,
        message:
          'Registration service is temporarily unavailable. Your information has not been cleared; please try again.',
      },
      { status: 502 }
    );
  }
}
