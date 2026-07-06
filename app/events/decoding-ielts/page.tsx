import Link from 'next/link';
import { CalendarDays, MapPin, Users, ClipboardList, ArrowRight } from 'lucide-react';
import styles from './decodingIelts.module.css';

export const metadata = {
  title: 'Decoding IELTS | JU FinAnt Club',
  description: 'IELTS Masterclass for global education pathways and study abroad guidance.'
};

export default function DecodingIELTSPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg} />

        <div className={styles.shell}>
          <p className={styles.kicker}>Jahangirnagar University FinAnt Club × Enhance English</p>

          <h1 className={styles.title}>
            Decoding IELTS:
            <br />Your Gateway to Global Education
          </h1>

          <p className={styles.subtitle}>
            A focused IELTS Masterclass for students preparing for higher studies, global education pathways, and internationally competitive academic opportunities.
          </p>

          <p className={styles.body}>
            Join a practical campus session covering IELTS strategy, preparation direction, study abroad guidance, and next-step opportunities through Enhance English.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}><CalendarDays /> July 20</div>
            <div className={styles.card}><MapPin /> Jahangirnagar University Campus</div>
            <div className={styles.card}><Users /> Final-year & Master’s Students</div>
            <div className={styles.card}><ClipboardList /> Registration Required</div>
          </div>

          <div className={styles.actions}>
            <Link href="#registration" className={styles.primary}>
              Register Now <ArrowRight />
            </Link>
            <Link href="#details" className={styles.secondary}>
              View Event Details <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="details" className={styles.details}>
        <h2>Event Overview</h2>
        <p>
          This masterclass focuses on IELTS strategy, structured preparation, and study abroad pathways with practical guidance.
        </p>
      </section>

      <section id="registration" className={styles.registration}>
        <h2>Registration</h2>
        <p>Registration system will be connected via Google Sheets + CRM pipeline.</p>
      </section>
    </div>
  );
}
