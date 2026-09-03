'use client';

import { useState, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/content/dictionary';
import type { Location } from '@/content/locations';

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared field styling — one system: label above, hairline-underlined input. */
function fieldClasses() {
  return 'w-full bg-transparent border-b border-line py-3 text-ink placeholder:text-muted/60 focus:border-ink outline-none transition-colors';
}

export default function EnquiryForm({
  locale,
  dict,
  location,
}: {
  locale: Locale;
  dict: Dictionary;
  /** Set when arrived via ?location=slug — sent through as a hidden field. */
  location?: Location;
}) {
  const t = dict.enquiry;
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.name?.trim() || !data.email?.trim() || !data.productionType) {
      setStatus('error');
      setError(t.errorRequired);
      return;
    }
    if (!EMAIL_RE.test(data.email)) {
      setStatus('error');
      setError(t.errorEmail);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError(t.errorGeneric);
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="enter-rise border-t border-ink pt-10"
      >
        <p className="text-lead tracking-tight max-w-lg">{t.success}</p>
      </div>
    );
  }

  const req = <span className="text-muted/70"> · {t.required}</span>;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={error ? 'form-error' : undefined}>
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
        <Field id="name" delay={0} label={<>{t.labels.name}{req}</>}>
          <input id="name" name="name" type="text" autoComplete="name" required className={fieldClasses()} />
        </Field>

        <Field id="company" delay={40} label={t.labels.company}>
          <input id="company" name="company" type="text" autoComplete="organization" className={fieldClasses()} />
        </Field>

        <Field id="email" delay={80} label={<>{t.labels.email}{req}</>}>
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldClasses()} />
        </Field>

        <Field id="phone" delay={120} label={<>{t.labels.phone} <span className="text-muted/70">· {t.labels.phoneOptional}</span></>}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClasses()} />
        </Field>

        <Field id="productionType" delay={160} label={<>{t.labels.productionType}{req}</>}>
          <select id="productionType" name="productionType" required defaultValue="" className={fieldClasses() + ' appearance-none'}>
            <option value="" disabled>{t.placeholders.select}</option>
            {t.productionTypes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </Field>

        <Field id="shootDate" delay={200} label={t.labels.shootDate}>
          <input id="shootDate" name="shootDate" type="date" className={fieldClasses()} />
        </Field>

        <Field id="duration" delay={240} label={t.labels.duration}>
          <select id="duration" name="duration" defaultValue="" className={fieldClasses() + ' appearance-none'}>
            <option value="" disabled>{t.placeholders.select}</option>
            {t.durations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </Field>

        <Field id="crew" delay={280} label={t.labels.crew}>
          <input id="crew" name="crew" type="number" min={1} inputMode="numeric" placeholder={t.placeholders.crew} className={fieldClasses()} />
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" delay={320} label={t.labels.message}>
            <textarea id="message" name="message" rows={4} placeholder={t.placeholders.message} className={fieldClasses() + ' resize-none'} />
          </Field>
        </div>
      </div>

      {/* Which location this enquiry is about, if arrived via ?location= —
          already surfaced visibly in the page's aside; this just carries
          the same identifier through to the submitted payload. */}
      {location && <input type="hidden" name="location" value={location.slug} />}

      {/* Honeypot — hidden from users, catches bots. Do not remove. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p id="form-error" role="alert" className="enter-rise mt-8 text-eyebrow uppercase tracking-label text-ink">
          {error}
        </p>
      )}

      <div className="mt-12">
        <button
          type="submit"
          className="btn w-full transition-opacity duration-fast sm:w-auto disabled:opacity-50"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  delay = 0,
}: {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
  /** Staggers this field's entrance, ms — small and fast, not a scroll reveal. */
  delay?: number;
}) {
  return (
    <div className="group enter-rise" style={{ animationDelay: `${delay}ms` }}>
      <label
        htmlFor={id}
        className="block text-eyebrow uppercase tracking-label text-muted mb-3 transition-colors duration-fast ease-arch group-focus-within:text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
