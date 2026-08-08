import { NextResponse } from 'next/server';

/**
 * Enquiry endpoint.
 *
 * This validates the submission server-side and returns success. It does NOT
 * yet deliver anywhere — wire up ONE of the options below to send real
 * enquiries. Everything the form collects is available on `body`.
 *
 * ── To make it live ────────────────────────────────────────────────────────
 * A. Email via Resend (simplest):
 *      1. `npm i resend`
 *      2. Set RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM in the environment.
 *      3. Replace the "DELIVERY" block below with:
 *         const { Resend } = await import('resend');
 *         const resend = new Resend(process.env.RESEND_API_KEY);
 *         await resend.emails.send({
 *           from: process.env.ENQUIRY_FROM!, to: process.env.ENQUIRY_TO!,
 *           replyTo: body.email, subject: `Enquiry — ${body.name}`,
 *           text: JSON.stringify(body, null, 2),
 *         });
 * B. Or forward to a CRM / webhook / Slack / Notion — same place, same data.
 * ────────────────────────────────────────────────────────────────────────────
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EnquiryBody {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  productionType?: string;
  shootDate?: string;
  duration?: string;
  crew?: string;
  message?: string;
  locale?: string;
  // Honeypot — real users never fill this hidden field.
  website?: string;
}

export async function POST(request: Request) {
  let body: EnquiryBody;
  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Silently accept spam bots (honeypot) without delivering.
  if (body.website) return NextResponse.json({ ok: true });

  if (!body.name?.trim() || !body.email?.trim() || !body.productionType) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (!EMAIL_RE.test(body.email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  // ── DELIVERY ──────────────────────────────────────────────────────────────
  // No delivery configured yet. Log server-side so nothing is lost in dev.
  // Replace this with option A or B above for production.
  console.info('[enquiry] received', {
    name: body.name,
    company: body.company,
    email: body.email,
    productionType: body.productionType,
    shootDate: body.shootDate,
    duration: body.duration,
    crew: body.crew,
    locale: body.locale,
  });
  // ────────────────────────────────────────────────────────────────────────────

  return NextResponse.json({ ok: true });
}
