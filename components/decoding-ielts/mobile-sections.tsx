import Link from 'next/link';
import { ArrowRight, Award, BadgePercent, Building2, CalendarDays, ChevronDown, CircleHelp, Clock, Globe2, GraduationCap, Headphones, Info, Landmark, Mail, MapPin, Phone, Ticket, Trophy, UserRound, UsersRound } from 'lucide-react';
import styles from '@/app/events/decoding-ielts/decodingMobileSections.module.css';

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

export function DecodingMobileSections() {
  return (
    <div className={styles.mobileSections}>
      <section id="participant-benefits-mobile" className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.number}>05</div>
          <h2 className={styles.heading}>Participant <span>Benefits</span> &amp; Recognition</h2>
          <div className={styles.rule}><i /></div>
          <div className={styles.benefitList}>
            {participantBenefits.map(({ number, title, icon: Icon }) => (
              <article className={styles.benefitCard} key={number}>
                <div className={styles.iconCircle}><Icon /></div>
                <div className={styles.benefitCopy}>
                  <span className={styles.benefitIndex}>{number}</span>
                  <h3>{title}</h3>
                  <span className={styles.miniLine} />
                </div>
              </article>
            ))}
          </div>
          <div className={styles.noteDivider} />
          <p className={styles.infoNote}><Info /> Workshop and expo opportunities may depend on eligibility and attendance criteria.</p>
        </div>
      </section>

      <section id="reserve-seat-mobile" className={`${styles.section} ${styles.reserveSection}`}>
        <div className={styles.shell}>
          <div className={styles.reserveHeader}>
            <div className={styles.number}>06</div>
            <div>
              <h2 className={styles.heading}>Reserve Your <span>Seat</span></h2>
              <div className={styles.rule}><i /></div>
            </div>
          </div>
          <p className={styles.reserveIntro}>Registration is required. Priority will be given to JU 50 &amp; 51 students preparing for IELTS and global education opportunities.</p>
          <div className={styles.eventRows}>
            {reserveInfo.map(({ number, label, value, icon: Icon }) => (
              <div className={styles.eventRow} key={number}>
                <div className={styles.eventIcon}><Icon /></div>
                <div className={styles.eventLabel}><span>{number}</span><strong>{label}</strong></div>
                <div className={styles.eventValue}>{value}</div>
              </div>
            ))}
          </div>
          <div className={styles.freeBadge}><Ticket /> Free Registration</div>
          <p className={styles.infoNote}><Info /> Limited seats. Early registration recommended.</p>

          <div className={styles.formCard} aria-label="Registration preview">
            <div className={styles.formGrid}>
              <div className={styles.field}><label htmlFor="preview-name">Full Name</label><div className={styles.inputWrap}><UserRound /><input id="preview-name" type="text" placeholder="Enter your full name" /></div></div>
              <div className={styles.field}><label htmlFor="preview-department">Department</label><div className={styles.inputWrap}><Building2 /><input id="preview-department" type="text" placeholder="Enter your department" /></div></div>
              <div className={styles.field}><label htmlFor="preview-phone">Phone Number</label><div className={styles.inputWrap}><Phone /><input id="preview-phone" type="tel" placeholder="Enter your phone number" /></div></div>
              <div className={styles.field}><label htmlFor="preview-email">Email Address</label><div className={styles.inputWrap}><Mail /><input id="preview-email" type="email" placeholder="Enter your email address" /></div></div>
              <div className={styles.checkRows}>
                <label className={styles.checkRow}><input type="checkbox" /><span className={styles.checkIcon}><GraduationCap /></span><span>Interested in Dhanmondi Workshop</span></label>
                <label className={styles.checkRow}><input type="checkbox" /><span className={styles.checkIcon}><Globe2 /></span><span>Interested in Global Education Expo</span></label>
              </div>
              <div className={styles.formActions}>
                <Link className={styles.primary} href="/events/decoding-ielts/register">Register Now</Link>
                <Link className={styles.secondary} href="#journey">View Event Details <ArrowRight /></Link>
              </div>
            </div>
            <p className={`${styles.infoNote} ${styles.formFooter}`}><Info /> You will receive confirmation and updates after registration.</p>
          </div>
        </div>
      </section>

      <section id="frequently-asked-questions-mobile" className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.shell}>
          <div className={styles.number}>07</div>
          <h2 className={styles.heading}>Frequently Asked <span>Questions</span></h2>
          <div className={styles.rule}><i /></div>
          <p className={styles.faqIntro}>Here are the key details you may want to know before completing your registration.</p>
          <div className={styles.faqList}>
            {faqItems.map(({ question, answer }) => (
              <article className={styles.faqCard} key={question}>
                <div className={styles.faqIcon}><CircleHelp /></div>
                <div className={styles.faqText}><h3>{question}</h3><p>{answer}</p></div>
                <ChevronDown className={styles.faqChevron} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
