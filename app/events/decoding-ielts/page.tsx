import Link from 'next/link';
import { CalendarDays, MapPin, Users, ClipboardList, ArrowRight } from 'lucide-react';
import styles from './decodingIelts.module.css';

export const metadata = {
  title: 'Decoding IELTS | JU FinAnt Club',
  description: 'IELTS Masterclass for global education pathways and study abroad guidance.'
};

const infoCards = [
  { label: 'Date:', value: 'July 20', icon: CalendarDays },
  { label: 'Venue:', value: 'Jahangirnagar University Campus', icon: MapPin },
  { label: 'For:', value: 'Final-year & Master’s Students', icon: Users },
  { label: 'Access:', value: 'Registration Required', icon: ClipboardList },
];

export default function DecodingIELTSPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bg} />

        <div className={styles.shell}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Jahangirnagar University FinAnt Club <span>×</span> Enhance English</p>

            <h1 className={styles.title}>
              Decoding IELTS:
              <br />Your Gateway to
              <br />Global Education
            </h1>

            <p className={styles.subtitle}>
              A focused IELTS Masterclass for students preparing for higher studies, global education pathways, and internationally competitive academic opportunities.
            </p>

            <div className={styles.goldLine} />

            <p className={styles.body}>
              Join a practical campus session covering IELTS strategy, preparation direction, study abroad guidance, and next-step opportunities through Enhance English.
            </p>
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
            <Link href="#details" className={styles.secondary}>
              View Event Details <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="details" className={styles.details}>
        <p className={styles.sectionEyebrow}>Event Details</p>
        <h2>IELTS strategy, study abroad direction, and practical next steps.</h2>
        <p>
          This masterclass focuses on IELTS preparation strategy, global education pathways, and study abroad decision-making for students preparing for internationally competitive academic opportunities.
        </p>
      </section>

      <section id="registration" className={styles.registration}>
        <p className={styles.sectionEyebrow}>Registration</p>
        <h2>Registration opens through the official website.</h2>
        <p>The registration form will be connected to a Google Sheet response database in the next implementation step.</p>
      </section>
    </div>
  );
}
