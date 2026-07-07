import Link from 'next/link';
import { AlarmClock, ArrowRight, Award, BadgePercent, BookOpen, Building2, Bus, CalendarDays, ChevronDown, CircleHelp, Clock, FileText, Globe2, GraduationCap, Headphones, Info, Landmark, Mail, MapPin, Phone, Plane, Route, Star, Target, Ticket, TrendingUp, Trophy, UserRound, UsersRound } from 'lucide-react';
import styles from './decodingIelts.module.css';
import sectionStyles from './decodingSections.module.css';
import mobileHeroFix from './decodingMobileHeroFix.module.css';
import journeyMobile from './decodingJourneyMobile.module.css';
import aboutMobile from './decodingAboutMobile.module.css';
import whyAttendMobile from './decodingWhyAttendMobile.module.css';
import desktopCommon from './decodingDesktopCommon.module.css';
import desktopOverview from './decodingDesktopOverview.module.css';
import desktopRegister from './decodingDesktopRegister.module.css';

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

const whyAttendCards = [
  { title: 'Expert Guidance', description: 'Learn from experienced trainers and academic experts.', icon: Trophy },
  { title: 'Proven Strategies', description: 'Get exam strategies and techniques that actually work.', icon: Target },
  { title: 'Score Improvement', description: 'Boost your confidence and improve your target scores.', icon: TrendingUp },
  { title: 'Global Opportunities', description: 'Open doors to top universities and a global future.', icon: Globe2 },
];

const whyAttendStats = [
  { title: 'Expert Trainers', description: 'Industry & Academic Experts', icon: UsersRound },
  { title: 'Proven Results', description: 'Thousands of Students Guided', icon: TrendingUp },
  { title: 'Global Reach', description: 'Universities & Admissions Worldwide', icon: GraduationCap },
];

const participantBenefits = [
  { number: '01', title: 'E-Certificate for Attendees', icon: Award },
  { number: '02', title: 'Certificates of Excellence', icon: Trophy },
  { number: '03', title: '35% IELTS Discount Coupon', icon: BadgePercent },
  { number: '04', title: 'PFEC Counselor Access', icon: Headphones },
  { number: '05', title: 'Dhanmondi Workshop Opportunity', icon: Landmark },
  { number: '06', title: 'Sheraton Expo Access', icon: Globe2 },
];

const reserveInfo = [
  { number: '01', label: 'Date', value: '20 July', icon: CalendarDays },
  { number: '02', label: 'Time', value: '2.30 PM', icon: Clock },
  { number: '03', label: 'Venue', value: 'Seminar Room', icon: MapPin },
  { number: '04', label: 'Eligibility', value: 'JU 50 & 51', icon: UsersRound },
];

const faqItems = [
  { question: 'Is registration required?', answer: 'Yes. Registration is required to attend the MasterClass.' },
  { question: 'Is the event free to attend?', answer: 'Yes. This is a free student opportunity.' },
  { question: 'Who can register?', answer: 'Priority will be given to JU 50 & 51 students.' },
  { question: 'What should I bring to the MasterClass?', answer: 'Bring your student ID and any materials you need for note-taking.' },
  { question: 'Will participants receive certificates?', answer: 'Attendees will receive e-certificates, and top performers will receive Certificates of Excellence.' },
  { question: 'Will event updates be shared after registration?', answer: 'Yes. Registered participants will receive updates and confirmation details.' },
  { question: 'Is the Dhanmondi workshop guaranteed for everyone?', answer: 'Workshop access will depend on eligibility and selection.' },
  { question: 'Will transportation be provided for the Global Education Expo?', answer: 'Transportation from JU to Sheraton is planned if 60+ attendees are confirmed.' },
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
            <div><strong>Only 100 Seats Available</strong><small>Register now to secure your spot!</small></div>
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
                <div className={sectionStyles.stepNumber}>{step}</div><div className={sectionStyles.stepIcon}><Icon /></div><h3>{title}</h3><div className={sectionStyles.stepLine} /><p>{description}</p>
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
                    <h3>{title}</h3><p>{description}</p>
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
        <div className={sectionStyles.aboutDotsTop} /><div className={sectionStyles.aboutDotsBottom} />
        <div className={sectionStyles.aboutShell}>
          <div className={sectionStyles.aboutCopy}>
            <h2>About Enhance English</h2><div className={sectionStyles.aboutRule}><span /></div>
            <p>Enhance English is a leading test preparation and study abroad guidance platform helping students achieve their global education goals. Powered by PFEC Global, they provide expert training, personalized guidance, and end-to-end support for IELTS, PTE, SAT and international admissions.</p>
            <div className={sectionStyles.partnerCards}>{partnerCards.map(({title, description, icon: Icon}) => <article className={sectionStyles.partnerCard} key={title}><div className={sectionStyles.partnerIcon}><Icon /></div><h3>{title}</h3><p>{description}</p><span /></article>)}</div>
          </div>
          <div className={sectionStyles.aboutDivider} />
          <div className={sectionStyles.aboutBrand}>
            <div className={sectionStyles.enhanceLogo}><div className={sectionStyles.enhanceMark}>e</div><div><strong>enhance<br />english</strong><small>IELTS | PTE | SAT</small></div></div>
            <div className={sectionStyles.logoRule} /><h3>Powered by <span>PFEC Global</span></h3>
            <div className={sectionStyles.benefitList}>{partnerBenefits.map(({text, icon: Icon}) => <div className={sectionStyles.benefitItem} key={text}><Icon /><span>{text}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section id="about-enhance" className={aboutMobile.mobileAbout}>
        <div className={aboutMobile.mobilePanel}>
          <div className={aboutMobile.dotsTop} /><div className={aboutMobile.dotsBottom} />
          <h2 className={aboutMobile.heading}>About Enhance English</h2><div className={aboutMobile.rule}><span /></div>
          <p className={aboutMobile.description}>Enhance English is a leading test preparation and study abroad guidance platform helping students achieve their global education goals. Powered by PFEC Global, they provide expert training, personalized guidance, and end-to-end support for IELTS, PTE, SAT and international admissions.</p>
          <div className={aboutMobile.brandBlock}>
            <div className={aboutMobile.brandMark}>e</div>
            <div className={aboutMobile.brandWords}>
              <strong>enhance<br />english</strong><small>IELTS | PTE | SAT</small>
              <div className={aboutMobile.poweredRow}><span>Powered By</span><span className={aboutMobile.pfecLogo}><span className={aboutMobile.pfecBars}><i /><i /><i /></span><span className={aboutMobile.pfecText}><b>PFEC</b><span>Global</span></span></span></div>
            </div>
          </div>
          <div className={aboutMobile.cards}>
            {partnerCards.map(({title, description, icon: Icon}) => <article className={aboutMobile.card} key={title}><div className={aboutMobile.cardIcon}><Icon /></div><h3>{title}</h3><p>{description}</p><span className={aboutMobile.cardLine} /></article>)}
          </div>
        </div>
      </section>

      <section id="why-attend-desktop" className={`${desktopCommon.desktopOnly} ${desktopCommon.desktopSection} ${desktopOverview.whyAttend}`}>
        <div className={desktopCommon.sectionShell}>
          <div className={desktopOverview.whyGrid}>
            <div>
              <div className={desktopOverview.whyHeader}><div className={desktopOverview.whyNumber}>04</div><h2 className={desktopOverview.whyHeading}>Why Attend <span>This Masterclass?</span></h2></div>
              <div className={desktopOverview.whyRule}><i /></div>
              <p className={desktopOverview.whyIntro}>This masterclass is designed to give you expert guidance, practical strategies, and real-world insights to help you achieve your target scores and global education goals.</p>
              <div className={desktopOverview.whyCards}>
                {whyAttendCards.map(({title, description, icon: Icon}) => <article className={desktopOverview.whyCard} key={title}><div className={desktopCommon.roundIcon}><Icon /></div><h3>{title}</h3><p>{description}</p><span className={desktopCommon.shortLine} /></article>)}
              </div>
            </div>
            <div className={desktopOverview.whyVisual}>
              <div className={`${whyAttendMobile.photo} ${desktopOverview.studentPhoto}`} role="img" aria-label="Students preparing together for IELTS and global education opportunities" />
              <div className={desktopOverview.statStrip}>
                {whyAttendStats.map(({title, description, icon: Icon}) => <article className={desktopOverview.stat} key={title}><div className={desktopOverview.statIcon}><Icon /></div><div><h4>{title}</h4><p>{description}</p></div></article>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="participant-benefits" className={`${desktopCommon.desktopOnly} ${desktopCommon.desktopSection} ${desktopOverview.benefitSection}`}>
        <div className={desktopCommon.sectionShell}>
          <div className={desktopCommon.sectionHeader}><div className={desktopCommon.sectionNumber}>05</div><div className={desktopCommon.headerCopy}><h2 className={desktopCommon.sectionHeading}>Participant <span>Benefits</span> &amp; Recognition</h2><div className={desktopCommon.headerRule}><i /></div></div></div>
          <div className={desktopOverview.benefitGrid}>
            {participantBenefits.map(({number, title, icon: Icon}) => <article className={desktopOverview.benefitCard} key={number}><div className={desktopOverview.benefitIcon}><Icon /></div><div className={desktopOverview.benefitCopy}><span className={desktopOverview.benefitIndex}>{number}</span><h3>{title}</h3><span className={desktopCommon.shortLine} /></div></article>)}
          </div>
          <div className={desktopOverview.noteDivider} />
          <p className={desktopCommon.infoNote}><Info /> Workshop and expo opportunities may depend on eligibility and attendance criteria.</p>
        </div>
      </section>

      <section id="reserve-seat" className={`${desktopCommon.desktopOnly} ${desktopCommon.desktopSection} ${desktopRegister.reserveSection}`}>
        <div className={`${desktopCommon.sectionShell} ${desktopRegister.reserveGrid}`}>
          <div>
            <div className={desktopRegister.reserveHeader}><div className={desktopCommon.sectionNumber}>06</div><div><h2 className={desktopRegister.reserveHeading}>Reserve Your <span>Seat</span></h2><div className={desktopCommon.headerRule}><i /></div></div></div>
            <p className={desktopRegister.reserveIntro}>Registration is required. Priority will be given to JU 50 &amp; 51 students preparing for IELTS and global education opportunities.</p>
            <div className={desktopRegister.eventRows}>
              {reserveInfo.map(({number, label, value, icon: Icon}) => <div className={desktopRegister.eventRow} key={number}><div className={desktopRegister.eventRowIcon}><Icon /></div><div className={desktopRegister.eventRowLabel}><span>{number}</span><strong>{label}</strong></div><div className={desktopRegister.eventRowValue}>{value}</div></div>)}
            </div>
            <div className={desktopRegister.freeBadge}><Ticket /> Free Registration</div>
            <p className={`${desktopCommon.infoNote} ${desktopRegister.reserveNote}`}><Info /> Limited seats. Early registration recommended.</p>
          </div>
          <form className={desktopRegister.formCard}>
            <div className={desktopRegister.formGrid}>
              <div className={desktopRegister.field}><label htmlFor="full-name">Full Name</label><div className={desktopRegister.inputWrap}><UserRound /><input id="full-name" name="fullName" type="text" placeholder="Enter your full name" /></div></div>
              <div className={desktopRegister.field}><label htmlFor="department">Department</label><div className={desktopRegister.inputWrap}><Building2 /><input id="department" name="department" type="text" placeholder="Enter your department" /></div></div>
              <div className={desktopRegister.field}><label htmlFor="phone">Phone Number</label><div className={desktopRegister.inputWrap}><Phone /><input id="phone" name="phone" type="tel" placeholder="Enter your phone number" /></div></div>
              <div className={desktopRegister.field}><label htmlFor="email">Email Address</label><div className={desktopRegister.inputWrap}><Mail /><input id="email" name="email" type="email" placeholder="Enter your email address" /></div></div>
              <div className={desktopRegister.checkRows}>
                <label className={desktopRegister.checkRow}><input type="checkbox" name="workshopInterest" /><span className={desktopRegister.checkIcon}><GraduationCap /></span><span>Interested in Dhanmondi Workshop</span></label>
                <label className={desktopRegister.checkRow}><input type="checkbox" name="expoInterest" /><span className={desktopRegister.checkIcon}><Globe2 /></span><span>Interested in Global Education Expo</span></label>
              </div>
              <div className={desktopRegister.formActions}><button className={desktopRegister.formPrimary} type="button">Register Now</button><Link className={desktopRegister.formSecondary} href="#journey">View Event Details <ArrowRight /></Link></div>
            </div>
            <p className={`${desktopCommon.infoNote} ${desktopRegister.formFooter}`}><Info /> You will receive confirmation and updates after registration.</p>
          </form>
        </div>
      </section>

      <section id="frequently-asked-questions" className={`${desktopCommon.desktopOnly} ${desktopCommon.desktopSection} ${desktopRegister.faqSection}`}>
        <div className={desktopCommon.sectionShell}>
          <div className={`${desktopCommon.sectionHeader} ${desktopRegister.faqHeader}`}><div className={desktopCommon.sectionNumber}>07</div><div className={desktopCommon.headerCopy}><h2 className={desktopCommon.sectionHeading}>Frequently Asked <span>Questions</span></h2><div className={desktopCommon.headerRule}><i /></div></div></div>
          <p className={desktopRegister.faqIntro}>Here are the key details you may want to know before completing your registration.</p>
          <div className={desktopRegister.faqGrid}>
            {faqItems.map(({question, answer}) => <article className={desktopRegister.faqCard} key={question}><div className={desktopRegister.faqIcon}><CircleHelp /></div><div className={desktopRegister.faqText}><h3>{question}</h3><p>{answer}</p></div><ChevronDown className={desktopRegister.faqChevron} /></article>)}
          </div>
        </div>
      </section>

      <section id="why-attend" className={whyAttendMobile.mobileSection}>
        <div className={whyAttendMobile.panel}>
          <div className={whyAttendMobile.number}>04</div><h2 className={whyAttendMobile.heading}>Why Attend <span>This Masterclass?</span></h2><div className={whyAttendMobile.rule}><i /></div>
          <p className={whyAttendMobile.intro}>This masterclass is designed to give you expert guidance, practical strategies, and real-world insights to help you achieve your target scores and global education goals.</p>
          <div className={whyAttendMobile.cards}>{whyAttendCards.map(({title, description, icon: Icon}) => <article className={whyAttendMobile.card} key={title}><div className={whyAttendMobile.icon}><Icon /></div><h3>{title}</h3><p>{description}</p><span className={whyAttendMobile.line} /></article>)}</div>
          <div className={whyAttendMobile.photo} role="img" aria-label="Students preparing together for IELTS and global education opportunities" />
          <div className={whyAttendMobile.stats}>{whyAttendStats.map(({title, description, icon: Icon}) => <article className={whyAttendMobile.stat} key={title}><div className={whyAttendMobile.statIcon}><Icon /></div><h4>{title}</h4><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section id="registration" className={`${styles.registration} ${desktopCommon.mobileRegistrationOnly}`}>
        <p className={styles.sectionEyebrow}>Registration</p><h2>Registration opens through the official website.</h2><p>The registration form will be connected to a Google Sheet response database in the next implementation step.</p>
      </section>
    </div>
  );
}
