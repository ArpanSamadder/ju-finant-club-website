import { NextRequest, NextResponse } from 'next/server';

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

type RegistrationPayload = Record<string, unknown>;

type SupabaseRegistration = {
  id?: string;
  name: string;
  department: string;
  batch: string;
  registration_no: string;
  hall: string;
  email: string;
  contact: string;
  primary_goals: string[];
  further_guidance: string;
  workshop_interest: string;
  expo_interest: string;
  submitted_at: string;
  idempotency_key: string;
};

type SupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

function cleanText(value: unknown) {
  return String(value || '').trim();
}

function getStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item)).filter(Boolean);
}

function isDuplicateError(error: SupabaseError) {
  return error.code === '23505' || /duplicate key/i.test(error.message || '');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildRegistration(payload: RegistrationPayload): SupabaseRegistration {
  return {
    name: cleanText(payload.name),
    department: cleanText(payload.department),
    batch: cleanText(payload.batch),
    registration_no: cleanText(payload.registrationNo),
    hall: cleanText(payload.hall),
    email: cleanText(payload.email).toLowerCase(),
    contact: cleanText(payload.contact),
    primary_goals: getStringArray(payload.primaryGoals),
    further_guidance: cleanText(payload.furtherGuidance),
    workshop_interest: cleanText(payload.workshopInterest),
    expo_interest: cleanText(payload.expoInterest),
    submitted_at: cleanText(payload.submittedAt) || new Date().toISOString(),
    idempotency_key: cleanText(payload.idempotencyKey),
  };
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

function jsonSuccess(registration: Partial<SupabaseRegistration>, duplicate = false) {
  return NextResponse.json(
    {
      ok: true,
      duplicate,
      message: duplicate
        ? 'This registration has already been received.'
        : 'Registration submitted successfully.',
      submissionId: registration.id,
    },
    { status: duplicate ? 200 : 201 }
  );
}

export async function POST(request: NextRequest) {
  let payload: RegistrationPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonError('Invalid registration request.', 400);
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const missing = requiredFields.some((field) => !cleanText(payload[field]));
  const registration = buildRegistration(payload);

  if (missing || registration.primary_goals.length === 0) {
    return jsonError('Complete all required fields before submitting.', 400);
  }

  if (!isValidEmail(registration.email)) {
    return jsonError('Enter a valid email address.', 400);
  }

  if (!registration.idempotency_key) {
    return jsonError('Invalid registration session. Please refresh and try again.', 400);
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError(
      'The registration database connection is not active yet. Please try again shortly.',
      503
    );
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/decoding_ielts_registrations?select=id,name,email,registration_no`,
      {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(registration),
        cache: 'no-store',
      }
    );

    const responseBody = await response.text();
    const parsed = responseBody ? JSON.parse(responseBody) : null;

    if (!response.ok) {
      const error = (parsed || {}) as SupabaseError;

      if (isDuplicateError(error)) {
        return jsonSuccess({}, true);
      }

      console.error('Supabase registration insert failed', {
        status: response.status,
        code: error.code,
        message: error.message,
        details: error.details,
      });

      return jsonError('Registration could not be saved. Please try again.', 502);
    }

    const savedRegistration = Array.isArray(parsed) ? parsed[0] : parsed;

    return jsonSuccess(savedRegistration || {});
  } catch (error) {
    console.error('Registration database request failed', error);

    return jsonError(
      'Registration service is temporarily unavailable. Your information has not been cleared; please try again.',
      502
    );
  }
}
