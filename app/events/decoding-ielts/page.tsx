import Link from 'next/link';
import { AlarmClock, ArrowRight, BookOpen, Bus, CalendarDays, Clock, FileText, Globe2, GraduationCap, Headphones, Landmark, MapPin, Plane, Route, Star, UsersRound } from 'lucide-react';
import styles from './decodingIelts.module.css';
import sectionStyles from './decodingSections.module.css';
import mobileHeroFix from './decodingMobileHeroFix.module.css';
import journeyMobile from './decodingJourneyMobile.module.css';
import aboutMobile from './decodingAboutMobile.module.css';

export const metadata = {
  title: 'Decoding IELTS | JU FinAnt Club',
  description: 'IELTS Masterclass for global education pathways and study abroad guidance.'
};

const infoCards = [
  { label: 'Date:', value: '20 July', icon: CalendarDays },
  { label: 'Time:', value: '2.30pm', icon: Clock },
  { label: 'Venue:', value: 'Seminar Room, Zahir Raihan Auditorium', icon: MapPin },
  { label: 'Eligibility:', value: 'JU 50 & 51', icon: GraduationCap },
];

const mobileInfoCards = [
  { label: 'Date:', value: '20 July', icon: CalendarDays },
  { label: 'Time:', value: '2.30pm', icon: Clock },
  { label: 'Venue:', value: 'Seminar Room, Zahir Raihan Auditorium', icon: MapPin },
  { label: 'Eligibility:', value: 'JU 50 & 51', icon: GraduationCap },
];

const journeySteps = [
  { step: '01', title: 'Register Online', description: 'Complete your registration to begin the journey.', icon: FileText },
  { step: '02', title: 'Attend the JU MasterClass', description: 'Join the campus session on IELTS strategy and study abroad direction.', icon: UsersRound, notice: '100 Seats Available!' },
  { step: '03', title: 'Join the Dhanmondi Workshop', description: 'Selected students can access a full-day workshop with expert guidance and lab testing.', icon: Landmark, notice: 'Only 30 Participants will be selected' },
  { step: '04', title: 'Access the Global Education Expo', description: 'Eligible participants can join the Hotel Sheraton global education expo.', icon: Globe2, highlights: ['5-star hotel venue.', 'Free transportation from JU to Sheraton provided.'], notice: 'Only 45 Participants will be selected' },
];

const partnerCards = [
  { title: 'IELTS | PTE | SAT', description: 'Expert preparation for globally recognized exams.', icon: GraduationCap },
  { title: 'Study Abroad Guidance', description: 'Personalized counseling for universities and global pathways.', icon: Globe2 },
  { title: 'Powered by PFEC Global', description: 'A trusted global education network with proven expertise.', icon: BookOpen },
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
      <section className={`${styles.hero} ${mobileHeroFix.heroFix}`}>
        <div className={`${styles.bg} ${mobileHeroFix.bgFix}`} />
        <div className={`${styles.heroShell} ${mobileHeroFix.heroShellFix}`}>
          <div className={`${styles.copy} ${mobileHeroFix.copyFix}`}>
            <p className={`${styles.kicker} ${mobileHeroFix.kickerFix}`}>Jahangirnagar University FinAnt Club <span>×</span> Enhance English</p>
            <h1 className={`${styles.title} ${mobileHeroFix.titleFix}`}>
              <span className={`${styles.titleMain} ${mobileHeroFix.titleMainFix}`}>Decoding IELTS</span>
              <span className={`${styles.titleSub} ${mobileHeroFix.titleSubFix}`}>Your Gateway to Global Education</span>
            </h1>
            <p className={`${styles.subtitle} ${mobileHeroFix.subtitleFix}`}>A focused IELTS Masterclass for higher studies, global education pathways, and competitive academic opportunities.</p>
            <div className={`${styles.goldLine} ${mobileHeroFix.goldLineFix}`} />
          </div>

          <div className={styles.cards}>
            {infoCards.map(({label, value, icon: Icon}) => (
              <div className={styles.card} key={label}><Icon className={styles.cardIcon} /><div><span>{label}</span><strong>{value}</strong></div></div>
            ))}
          </div>

          <div className={mobileHeroFix.urgencyFix}>
            <span><AlarmClock /></span>
            <div>
              <strong>Only 100 Seats Available</strong>
              <small>Register now to secure your spot!</small>
            </div>
            <ArrowRight />
          </div>

          <div className={`${styles.mobileCards} ${mobileHeroFix.mobileCardsFix}`}>
            {mobileInfoCards.map(({label, value, icon: Icon}) => (
              <div className={`${styles.mobileCard} ${mobileHeroFix.mobileCardFix}`} key={label}><Icon className={`${styles.mobileCardIcon} ${mobileHeroFix.mobileCardIconFix}`} /><div><span>{label}</span><strong>{value}</strong></div></div>
            ))}
          </div>

          <div className={`${styles.actions} ${mobileHeroFix.actionsFix}`}>
            <Link href="#registration" className={`${styles.primary} ${mobileHeroFix.primaryFix}`}>Register Now <ArrowRight /></Link>
            <Link href="#journey" className={`${styles.secondary} ${mobileHeroFix.secondaryFix}`}>View Event Details <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section id="journey" className={`${sectionStyles.journeySection} ${journeyMobile.journeyMobile}`}>
        <div className={sectionStyles.journeyMapLeft} />
        <div className={sectionStyles.journeyMapRight} />
        <div className={`${sectionStyles.journeyShell} ${journeyMobile.journeyShellMobile}`}>
          <h2 className={`${sectionStyles.journeyTitle} ${journeyMobile.journeyTitleMobile}`}>Your <span>FREE</span> Global Education Journey</h2>
          <div className={`${sectionStyles.pathwayBadge} ${journeyMobile.pathwayBadgeMobile}`}><Route /> <span>4-Step Pathway</span></div>

          <div className={`${sectionStyles.stepTrack} ${journeyMobile.desktopTrack}`}>
            {journeySteps.map(({step, title, description, icon: Icon, highlights}) => (
              <article className={sectionStyles.stepCard} key={step}>
                <div className={sectionStyles.stepNumber}>{step}</div>
                <div className={sectionStyles.stepIcon}><Icon /></div>
                <h3>{title}</h3>
                <div className={sectionStyles.stepLine} />
                <p>{description}</p>
                {highlights && <ul className={sectionStyles.stepHighlights}><li><Star /> {highlights[0]}</li><li><Bus /> {highlights[1]}</li></ul>}
              </article>
            ))}
          </div>

          <div className={journeyMobile.mobileTrack}>
            {journeySteps.map(({step, title, description, icon: Icon, highlights, notice}) => (
              <div className={journeyMobile.mobileStepRow} key={step}>
                <div className={journeyMobile.mobileStepNumber}>{step}</div>
                <article className={journeyMobile.mobileStepCard}>
                  <div className={journeyMobile.mobileStepIcon}><Icon /></div>
                  <div className={journeyMobile.mobileStepContent}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    {notice && <div className={journeyMobile.mobileStepNotice}><UsersRound /> <span>{notice}</span></div>}
                    {highlights && <ul className={journeyMobile.mobileStepHighlights}><li><Star /> <span>{highlights[0]}</span></li><li><Bus /> <span>{highlights[1]}</span></li></ul>}
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className={`${sectionStyles.journeyFootnote} ${journeyMobile.journeyFootnoteMobile}`}><span><Star /> Free student opportunity</span><i /><span>Open to final-year & master’s students</span></div>
        </div>
      </section>

      <section id="about-enhance-desktop" className={`${sectionStyles.aboutSection} ${aboutMobile.desktopAbout}`}>
        <div className={sectionStyles.aboutDotsTop} />
        <div className={sectionStyles.aboutDotsBottom} />
        <div className={sectionStyles.aboutShell}>
          <div className={sectionStyles.aboutCopy}>
            <h2>About Enhance English</h2>
            <div className={sectionStyles.aboutRule}><span /></div>
            <p>Enhance English is a leading test preparation and study abroad guidance platform helping students achieve their global education goals. Powered by PFEC Global, they provide expert training, personalized guidance, and end-to-end support for IELTS, PTE, SAT and international admissions.</p>
            <div className={sectionStyles.partnerCards}>
              {partnerCards.map(({title, description, icon: Icon}) => <article className={sectionStyles.partnerCard} key={title}><div className={sectionStyles.partnerIcon}><Icon /></div><h3>{title}</h3><p>{description}</p><span /></article>)}
            </div>
          </div>
          <div className={sectionStyles.aboutDivider} />
          <div className={sectionStyles.aboutBrand}>
            <div className={sectionStyles.enhanceLogo}><div className={sectionStyles.enhanceMark}>e</div><div><strong>enhance<br />english</strong><small>IELTS | PTE | SAT</small></div></div>
            <div className={sectionStyles.logoRule} />
            <h3>Powered by <span>PFEC Global</span></h3>
            <div className={sectionStyles.benefitList}>{partnerBenefits.map(({text, icon: Icon}) => <div className={sectionStyles.benefitItem} key={text}><Icon /><span>{text}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section id="about-enhance" className={aboutMobile.mobileAbout}>
        <div className={aboutMobile.mobilePanel}>
          <div className={aboutMobile.dotsTop} />
          <div className={aboutMobile.dotsBottom} />
          <h2 className={aboutMobile.heading}>About Enhance English</h2>
          <div className={aboutMobile.rule}><span /></div>
          <p className={aboutMobile.description}>Enhance English is a leading test preparation and study abroad guidance platform helping students achieve their global education goals. Powered by PFEC Global, they provide expert training, personalized guidance, and end-to-end support for IELTS, PTE, SAT and international admissions.</p>

          <div className={aboutMobile.brandBlock}>
            <div className={aboutMobile.brandMark}>e</div>
            <div className={aboutMobile.brandWords}>
              <strong>enhance<br />english</strong>
              <small>IELTS | PTE | SAT</small>
              <div className={aboutMobile.poweredRow}>
                <span>Powered By</span>
                <span className={aboutMobile.pfecLogo}>
                  <span className={aboutMobile.pfecBars}><i /><i /><i /></span>
                  <span className={aboutMobile.pfecText}><b>PFEC</b><span>Global</span></span>
                </span>
              </div>
            </div>
          </div>

          <div className={aboutMobile.cards}>
            {partnerCards.map(({title, description, icon: Icon}) => (
              <article className={aboutMobile.card} key={title}>
                <div className={aboutMobile.cardIcon}><Icon /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={aboutMobile.cardLine} />
              </article>
            ))}
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
