'use client';

import Link from 'next/link';
import { ArrowRight, LockKeyhole, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import styles from './registration.module.css';

const goals = ['Higher Studies Abroad', 'Immigration', 'Scholarship', 'Career Development', 'Study Abroad Guidance', 'Skill Development'];

export function RegistrationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedGoals = data.getAll('primaryGoals').map(String);

    if (selectedGoals.length === 0) {
      setStatus('error');
      setMessage('Select at least one primary goal.');
      return;
    }

    setStatus('submitting');
    setMessage('Submitting your registration…');

    const payload = {
      name: String(data.get('name') || ''),
      department: String(data.get('department') || ''),
      batch: String(data.get('batch') || ''),
      registrationNo: String(data.get('registrationNo') || ''),
      hall: String(data.get('hall') || ''),
      email: String(data.get('email') || ''),
      contact: String(data.get('contact') || ''),
      primaryGoals: selectedGoals,
      furtherGuidance: String(data.get('furtherGuidance') || ''),
      workshopInterest: String(data.get('workshopInterest') || ''),
      expoInterest: String(data.get('expoInterest') || ''),
      website: String(data.get('website') || ''),
      submittedAt: new Date().toISOString(),
      idempotencyKey: crypto.randomUUID(),
    };

    try {
      const response = await fetch('/api/events/decoding-ielts/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.message || 'Registration could not be submitted.');

      setStatus('success');
      setMessage('Registration submitted successfully. You will receive confirmation and updates shortly.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Registration could not be submitted. Please try again.');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <Field index="01" label="Name"><input className={styles.control} name="name" type="text" placeholder="Enter your full name" required autoComplete="name" /></Field>
        <Field index="02" label="Department"><input className={styles.control} name="department" type="text" placeholder="Enter your department" required /></Field>
        <Field index="03" label="Batch">
          <select className={styles.control} name="batch" required defaultValue=""><option value="" disabled>Select your batch</option><option value="50">JU 50</option><option value="51">JU 51</option></select>
        </Field>
        <Field index="04" label="Registration No"><input className={styles.control} name="registrationNo" type="text" inputMode="numeric" placeholder="For example: 202230567909" required /></Field>
        <Field index="05" label="Hall"><input className={styles.control} name="hall" type="text" placeholder="Enter your hall name" required /></Field>
        <Field index="06" label="Email"><input className={styles.control} name="email" type="email" placeholder="Enter your email address" required autoComplete="email" /></Field>
        <Field index="07" label="Contact (Phone / WhatsApp)"><input className={styles.control} name="contact" type="tel" placeholder="Enter your contact number" required autoComplete="tel" /></Field>
        <div className={styles.field}>
          <div className={styles.label}><span className={styles.index}>08</span><span>What is your primary goal? <span className={styles.required}>*</span> &nbsp; <small>(Select all that apply)</small></span></div>
          <div className={styles.checkGrid}>{goals.map((goal) => <label className={styles.option} key={goal}><input type="checkbox" name="primaryGoals" value={goal} /><span>{goal}</span></label>)}</div>
        </div>
      </div>

      <div className={styles.questions}>
        <RadioQuestion index="09" name="furtherGuidance" text="Interested in further guidance from Enhance English?" />
        <RadioQuestion index="10" name="workshopInterest" text="Are you interested to join the Dhanmondi Workshop for free?" />
        <RadioQuestion index="11" name="expoInterest" text="Are you interested to access the Global Education Expo with free transportation from JU to Hotel Sheraton?" full />
      </div>

      <label style={{ display: 'none' }} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={status === 'submitting'}><Send /> {status === 'submitting' ? 'Submitting…' : 'Submit Registration'}</button>
        <Link className={styles.secondary} href="/events/decoding-ielts">View Event Details <ArrowRight /></Link>
      </div>
      <p className={`${styles.status} ${status === 'error' ? styles.error : status === 'success' ? styles.success : ''}`} aria-live="polite">{message}</p>
      <p className={styles.privacy}><LockKeyhole /> Your information is safe with us. We will use it only for event communication and updates.</p>
    </form>
  );
}

function Field({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return <div className={styles.field}><div className={styles.label}><span className={styles.index}>{index}</span><span>{label} <span className={styles.required}>*</span></span></div>{children}</div>;
}

function RadioQuestion({ index, name, text, full = false }: { index: string; name: string; text: string; full?: boolean }) {
  return (
    <div className={`${styles.question} ${full ? styles.full : ''}`}>
      <p className={styles.questionTitle}><span className={styles.index}>{index}</span><span>{text} <span className={styles.required}>*</span></span></p>
      <div className={styles.radios}>
        <label className={styles.option}><input type="radio" name={name} value="Yes" required /><span>Yes</span></label>
        <label className={styles.option}><input type="radio" name={name} value="No" required /><span>No</span></label>
      </div>
    </div>
  );
}
