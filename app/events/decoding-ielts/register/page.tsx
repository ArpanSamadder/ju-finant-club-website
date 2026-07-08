import type { Metadata } from 'next';
import Link from 'next/link';
import { RegistrationForm } from './registration-form';
import styles from './registration.module.css';

export const metadata: Metadata = {
  title: 'Register | Decoding IELTS | JU FinAnt Club',
  description: 'Register for the Decoding IELTS Masterclass by Jahangirnagar University FinAnt Club and Enhance English.',
};

export default function DecodingIELTSRegistrationPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header} aria-label="Event partners">
        <Link
          className={styles.finant}
          href="/"
          aria-label="Go to JU FinAnt Club homepage"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <img src="/images/brand/finant-mark.png" alt="Jahangirnagar University FinAnt Club" />
          <div><small>Jahangirnagar University</small><strong>FinAnt Club</strong></div>
        </Link>
        <span
          aria-hidden="true"
          style={{
            width: '1px',
            height: 'clamp(2rem, 4vw, 3.5rem)',
            borderRadius: '999px',
            background: '#9ab3df',
          }}
        />
        <div className={styles.enhance}>
          <div className={styles.eMark}>e</div>
          <div><strong>enhance<br />english</strong><small>IELTS | PTE | SAT</small></div>
          <div className={styles.pfec}>Powered by<br />PFEC Global</div>
        </div>
      </div>

      <section className={styles.card}>
        <h1 className={styles.title}>MASTERCLASS REGISTRATION FORM</h1>
        <RegistrationForm />
      </section>
    </div>
  );
}
