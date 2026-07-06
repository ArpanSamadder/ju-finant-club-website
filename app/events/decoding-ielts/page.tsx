import Link from 'next/link';
import { ArrowRight, BookOpen, Bus, CalendarDays, Clock, FileText, Globe2, GraduationCap, Headphones, Landmark, MapPin, Plane, Route, Star, UsersRound } from 'lucide-react';
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

const journeySteps = [
  {
    step: '01',
    title: 'Register Online',
    description: 'Complete your registration to begin the journey.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Attend the JU MasterClass',
    description: 'Join the campus session on IELTS strategy and study abroad direction.',
    icon: UsersRound,
  },
  {
    step: '03',
    title: 'Join the Dhanmondi Workshop',
    description: 'Selected students can access a full-day workshop with expert guidance and lab testing.',
    icon: Landmark,
  },
  {
    step: '04',
    title: 'Access the Global Education Expo',
    description: 'Eligible participants can join the Hotel Sheraton global education expo.',
    icon: Globe2,
    highlights: ['5-star hotel venue.', 'Free transportation from JU to Sheraton provided.'],
  },
];

const partnerCards = [
  {
    title: 'IELTS | PTE | SAT',
    description: 'Expert preparation for globally recognized exams.',
    icon: GraduationCap,
  },
  {
    title: 'Study Abroad Guidance',
    description: 'Personalized counseling for universities and global pathways.',
    icon: Globe2,
  },
  {
    title: 'Powered by PFEC Global',
    description: 'A trusted global education network with proven expertise.',
    icon: BookOpen,
  },
];

const partnerBenefits = [
  { text: 'Expert Training & Academic Excellence', icon: GraduationCap },
  { text: 'Personalized Guidance & Mentorship', icon: Headphones },
  { text: 'Global Opportunities & End-to-End Support', icon: Globe2 },
  { text: 'International Admissions Assistance', icon: Plane },
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
            <Link href="#journey" className={styles.secondary}>
              View Event Details <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="journey" className={styles.journeySection}>
        <div className={styles.journeyMapLeft} />
        <div className={styles.journeyMapRight} />
        <div className={styles.journeyShell}>
          <h2 className={styles.journeyTitle}>Your <span>FREE</span> Global Education Journey</h2>
          <div className={styles.pathwayBadge}><Route /> <span>4-Step Pathway</span></div>

          <div className={styles.stepTrack}>
            {journeySteps.map(({step, title, description, icon: Icon, highlights}) => (
              <article className={styles.stepCard} key={step}>
                <div className={styles.stepNumber}>{step}</div>
                <div className={styles.stepIcon}><Icon /></div>
                <h3>{title}</h3>
                <div className={styles.stepLine} />
                <p>{description}</p>
                {highlights && (
                  <ul className={styles.stepHighlights}>
                    <li><Star /> {highlights[0]}</li>
                    <li><Bus /> {highlights[1]}</li>
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div className={styles.journeyFootnote}>
            <span><Star /> Free student opportunity</span>
            <i />
            <span>Open to final-year & master’s students</span>
          </div>
        </div>
      </section>

      <section id="about-enhance" className={styles.aboutSection}>
        <div className={styles.aboutDotsTop} />
        <div className={styles.aboutDotsBottom} />
        <div className={styles.aboutShell}>
          <div className={styles.aboutCopy}>
            <h2>About Enhance English</h2>
            <div className={styles.aboutRule}><span /></div>
            <p>
              Enhance English is a leading test preparation and study abroad guidance platform helping students achieve their global education goals. Powered by PFEC Global, they provide expert training, personalized guidance, and end-to-end support for IELTS, PTE, SAT and international admissions.
            </p>

            <div className={styles.partnerCards}>
              {partnerCards.map(({title, description, icon: Icon}) => (
                <article className={styles.partnerCard} key={title}>
                  <div className={styles.partnerIcon}><Icon /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span />
                </article>
              ))}
            </div>
          </div>

          <div className={styles.aboutDivider} />

          <div className={styles.aboutBrand}>
            <div className={styles.enhanceLogo}>
              <div className={styles.enhanceMark}>e</div>
              <div>
                <strong>enhance<br />english</strong>
                <small>IELTS | PTE | SAT</small>
              </div>
            </div>
            <div className={styles.logoRule} />
            <h3>Powered by <span>PFEC Global</span></h3>

            <div className={styles.benefitList}>
              {partnerBenefits.map(({text, icon: Icon}) => (
                <div className={styles.benefitItem} key={text}>
                  <Icon />
                  <span>{text}</span>
                </div>
              ))}
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
