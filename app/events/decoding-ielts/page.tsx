import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, GraduationCap, MapPin } from 'lucide-react';
import styles from './decodingIelts.module.css';

export const metadata = {
  title: 'Decoding IELTS | JU FinAnt Club',
  description: 'IELTS Masterclass for global education pathways and study abroad guidance.'
};

const infoCards = [
  { label: 'Date:', value: '20 July', icon: CalendarDays },
  { label: 'Time:', value: '2.30pm', icon: Clock },
  { label: 'Venue:', value: 'Seminar Room', icon: MapPin },
  { label: 'Eligibility:', value: 'JU 50 & 51', icon: GraduationCap },
];

export default function DecodingIELTSPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg} />

        <div className={styles.heroShell}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Jahangirnagar University FinAnt Club <span>×</span> Enhance English</p>

            <h1 className={styles.title}>
              <span className={styles.titleMain}>Decoding IELTS</span>
              <span className={styles.titleSub}>Your Gateway to Global Education</span>
            </h1>

            <p className={styles.subtitle}>
              A focused IELTS Masterclass for students preparing for higher studies, global education pathways, and internationally competitive academic opportunities.
            </p>

            <div className={styles.goldLine} />
          </div>

          <div className={styles.cards}>
            {infoCards.map(({label, value, icon: Icon}) => (
              <div className={styles.card} key={label}>
                <Icon className={styles.cardIcon} />
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="#registration" className={styles.primary}>
              Register Now <ArrowRight />
            </Link>
            <Link href="#registration" className={styles.secondary}>
              View Event Details <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="registration" className={styles.registration}>
        <p className={styles.sectionEyebrow}>Registration</p>
        <h2>Registration opens through the official website.</h2>
        <p>The registration form will be connected to a Google Sheet response database in the next implementation step.</p>
      </section>
    </div>
  );
}
