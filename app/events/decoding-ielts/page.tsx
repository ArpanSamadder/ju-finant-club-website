import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, Clock, Globe2, GraduationCap, Headphones, MapPin, MessageCircle, Pencil, Plane, Users } from 'lucide-react';
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

const partnerCards = [
  {
    title: 'IELTS | PTE | SAT',
    text: 'Expert preparation for globally recognized exams.',
    icon: GraduationCap,
  },
  {
    title: 'Study Abroad Guidance',
    text: 'Personalized counseling for universities and global pathways.',
    icon: Globe2,
  },
  {
    title: 'Powered by PFEC Global',
    text: 'A trusted global education network with proven expertise.',
    icon: BookOpen,
  },
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
              <span>Decoding IELTS</span>
              <small>Your Gateway to Global Education</small>
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
            <Link href="#details" className={styles.secondary}>
              View Event Details <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="details" className={styles.partnerSection}>
        <div className={styles.partnerShell}>
          <div className={styles.partnerCopy}>
            <p className={styles.sectionEyebrow}>About the Partner</p>
            <div className={styles.shortGoldLine} />
            <h2>About Enhance English</h2>
            <div className={styles.decorLine}><span /></div>
            <p>
              Enhance English is a leading test preparation and study abroad guidance platform helping students achieve their global education goals. Powered by PFEC Global, they provide expert training, personalized guidance, and end-to-end support for IELTS, PTE, SAT and international admissions.
            </p>

            <div className={styles.partnerCards}>
              {partnerCards.map(({title, text, icon: Icon}) => (
                <article className={styles.partnerCard} key={title}>
                  <div className={styles.partnerIcon}><Icon /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span />
                </article>
              ))}
            </div>
          </div>

          <div className={styles.partnerVisual} aria-hidden="true">
            <div className={styles.mapDots} />
            <div className={styles.orbit}>
              <div className={styles.centerLogo}>
                <strong><span>e</span> enhance<br />english</strong>
                <small>IELTS | PTE | SAT</small>
                <em>Powered by PFEC Global</em>
              </div>
              <div className={`${styles.orbitItem} ${styles.orbitTop}`}><GraduationCap /><span>Expert Training<br />& Academic Excellence</span></div>
              <div className={`${styles.orbitItem} ${styles.orbitLeft1}`}><Headphones /><span>IELTS</span></div>
              <div className={`${styles.orbitItem} ${styles.orbitLeft2}`}><MessageCircle /><span>PTE</span></div>
              <div className={`${styles.orbitItem} ${styles.orbitLeft3}`}><Pencil /><span>SAT</span></div>
              <div className={`${styles.orbitItem} ${styles.orbitRight}`}><Users /><span>Personalized Guidance<br />& Mentorship</span></div>
              <div className={`${styles.orbitItem} ${styles.orbitBottom}`}><Globe2 /><span>Global Opportunities<br />End-to-End Support</span></div>
              <div className={styles.pfecBadge}>PFEC<br /><small>GLOBAL</small></div>
              <Plane className={styles.planeIcon} />
            </div>
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
