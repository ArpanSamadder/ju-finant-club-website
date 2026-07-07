import type { Metadata } from 'next';
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
        <div className={styles.finant}>
          <img src="/images/brand/finant-mark.png" alt="Jahangirnagar University FinAnt Club" />
          <div><small>Jahangirnagar University</small><strong>FinAnt Club</strong></div>
        </div>
        <div className={styles.cross}>×</div>
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
