import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  ClipboardList,
  Clock,
  Crown,
  Download,
  FileCheck,
  FileText,
  Gavel,
  Gift,
  Globe2,
  HelpCircle,
  Lightbulb,
  MailCheck,
  MapPin,
  Medal,
  PenTool,
  Presentation,
  Search,
  ShieldCheck,
  Star,
  Tag,
  Ticket,
  Trophy,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';
import styles from './biztigation.module.css';
import heroStyles from './biztigationHero.module.css';

type CardItem = { title: string; text: string; icon: LucideIcon };

const whatItems: CardItem[] = [
  {title: 'Business Case Solving', text: 'Analyze real business cases and develop practical, impactful solutions.', icon: Search},
  {title: 'Strategic Thinking', text: 'Apply frameworks, data insight, and creativity to drive decisions.', icon: Lightbulb},
  {title: 'Team Competition', text: 'Collaborate with teammates and compete with top university teams.', icon: Users},
  {title: 'Grand Finale Presentation', text: 'Present your solution live before judges, guests, and a wider audience.', icon: Presentation},
];

const prizeItems: CardItem[] = [
  {title: 'Champion', text: 'Prize details announced in the rulebook', icon: Trophy},
  {title: '1st Runner-Up', text: 'Prize details announced in the rulebook', icon: Star},
  {title: '2nd Runner-Up', text: 'Prize details announced in the rulebook', icon: Medal},
  {title: 'Finalist Recognition', text: 'Recognition and awards', icon: Award},
  {title: 'Certificates', text: 'Participation certificates for all participants', icon: FileCheck},
  {title: 'Special Recognition', text: 'Special awards for outstanding performers', icon: Award},
];

const whyItems: CardItem[] = [
  {title: 'Build real business thinking', text: '', icon: Brain},
  {title: 'Improve presentation skills', text: '', icon: Presentation},
  {title: 'Compete with top university teams', text: '', icon: Users},
  {title: 'National-level exposure', text: '', icon: Globe2},
  {title: 'Strengthen your portfolio', text: '', icon: Briefcase},
  {title: 'Premium competition experience', text: '', icon: Crown},
];

const rounds: CardItem[] = [
  {title: 'Round 1\nThe Qualifier', text: 'Teams receive the case and submit their initial business solution.', icon: PenTool},
  {title: 'Round 2\nSemi-Final Round', text: 'Shortlisted teams refine their solution and complete the second-round submission.', icon: BookOpen},
  {title: 'Round 3\nGrand Finale', text: 'Finalist teams present live before judges, guests, and spectators.', icon: Trophy},
];

const registrationItems: CardItem[] = [
  {title: 'Who can participate?', text: 'Open to all undergraduate students from universities.', icon: User},
  {title: 'Team size', text: '3 to 5 members per team.', icon: Users},
  {title: 'Registration fee', text: 'Details in rulebook.', icon: Tag},
  {title: 'Registration deadline', text: 'Details in rulebook.', icon: CalendarDays},
  {title: 'Registration process', text: 'Register online via the official registration form.', icon: ClipboardList},
  {title: 'Submission format', text: 'Details in rulebook.', icon: FileText},
  {title: 'Confirmation process', text: 'You will receive an email after successful registration.', icon: MailCheck},
  {title: 'Contact for registration help', text: 'Details in rulebook.', icon: HelpCircle},
];

const leftDates = ['Registration Opens', 'Registration Deadline', 'Case Release', 'Round 1 Submission', 'Round 1 Result'];
const rightDates = ['Round 2 Briefing', 'Round 2 Submission', 'Finalist Announcement', 'Grand Finale', 'Prize Giving Ceremony'];

const ruleItems: CardItem[] = [
  {title: 'Original work required', text: '', icon: PenTool},
  {title: 'No plagiarism', text: '', icon: ShieldCheck},
  {title: 'Follow the deadline', text: '', icon: Clock},
  {title: 'Maintain the format', text: '', icon: FileText},
  {title: "Judges' decision is final", text: '', icon: Gavel},
];

const spectatorItems: CardItem[] = [
  {title: 'Grand Finale venue', text: 'Details will be announced soon.', icon: MapPin},
  {title: 'Entry information', text: 'Details will be announced soon.', icon: Ticket},
  {title: 'Who can attend', text: 'Open to all interested individuals.', icon: Users},
  {title: 'What to expect', text: 'Live presentations, engaging ideas, and great energy.', icon: Star},
  {title: 'Note', text: 'Finale details will be announced soon.', icon: Bell},
];

const faqs = ['Who can participate?', 'How many members can be in one team?', 'What is the registration fee?', 'How do we register?', 'What do we submit in Round 1?', 'How will teams be shortlisted?', 'Can spectators attend the finale?', 'Where will updates be posted?'];

function IconCard({item, className = ''}: {item: CardItem; className?: string}) {
  const Icon = item.icon;
  const formattedTitle = item.title.split('\n');
  return <article className={`${styles.card} ${className}`}><div className={styles.iconBox}><Icon /></div><h3>{formattedTitle.map((line) => <span key={line}>{line}<br /></span>)}</h3>{item.text ? <p>{item.text}</p> : null}</article>;
}

function SmallCard({item}: {item: CardItem}) {
  const Icon = item.icon;
  return <article className={styles.smallCard}><div className={styles.iconBox}><Icon /></div><h3>{item.title}</h3></article>;
}

function InfoCard({item}: {item: CardItem}) {
  const Icon = item.icon;
  return <article className={styles.infoCard}><div className={styles.iconBox}><Icon /></div><h3>{item.title}</h3><p>{item.text}</p></article>;
}

export default function BiztigationPage() {
  return (
    <div className={styles.page}>
      <div className={`${styles.decorCorner} ${styles.decorLeft}`} />
      <div className={`${styles.decorCorner} ${styles.decorRight}`} />
      <section className={`${styles.hero} ${heroStyles.heroReset}`}>
        <div className={`${styles.shell} ${heroStyles.heroInner}`}>
          <div className={`${styles.heroCopy} ${heroStyles.heroCopyMatch}`}>
            <p className={`${styles.kicker} ${heroStyles.kickerMatch}`}>Jahangirnagar University FinAnt Club presents</p>
            <h1 className={styles.title} style={{color: '#f7f6ef', fontSize: 'clamp(4.75rem, 6.9vw, 8.65rem)', lineHeight: 0.9, letterSpacing: '-0.055em', whiteSpace: 'nowrap'}}>Biztigation <span style={{color: '#1f7bff'}}>2.0</span></h1>
            <p className={`${styles.subtitle} ${heroStyles.subtitleMatch}`} style={{color: '#1f7bff'}}>An Inter-University Business Case Competition</p>
            <p className={`${styles.heroText} ${heroStyles.heroTextMatch}`}>Step into a national business case competition where strategy, creativity, and presentation meet real-world business challenges.</p>
            <div className={`${styles.buttonRow} ${heroStyles.buttonRowMatch}`}>
              <Link href="#registration" className={styles.primaryButton}>Register Now <ArrowRight size={18} /></Link>
              <Link href="#rules" className={styles.secondaryButton} style={{borderColor: 'rgba(31, 123, 255, 0.9)'}}>Download Rulebook <Download size={18} /></Link>
            </div>
          </div>
          <div className={`${styles.heroVisual} ${heroStyles.heroVisualMatch}`} aria-hidden="true" />
        </div>
      </section>
      <main className={styles.shell}>
        <section className={styles.section}><h2 className={styles.sectionTitle}>What is Biztigation?</h2><p className={styles.sectionIntro}>Biztigation 2.0 is an inter-university business case competition where student teams solve real-world business problems, develop strategic solutions, and compete through multiple rounds of submission, presentation, and evaluation.</p><div className={styles.grid4}>{whatItems.map((item) => <IconCard key={item.title} item={item} />)}</div></section>
        <section className={styles.section}><h2 className={styles.sectionTitle}>Prize Money &amp; Recognition</h2><div className={styles.goldFrame}><div className={styles.grid6}>{prizeItems.map((item) => <IconCard key={item.title} item={item} className={styles.prizeCard} />)}</div></div></section>
        <section className={`${styles.section} ${styles.participationRow}`}><h2 className={styles.sectionTitle}>Why Participate?</h2><div className={styles.grid6}>{whyItems.map((item) => <SmallCard key={item.title} item={item} />)}</div></section>
        <section className={`${styles.section} ${styles.twoColumn}`} id="registration"><div><h2 className={styles.subTitle}>Competition Structure</h2><div className={styles.grid3}>{rounds.map((item) => <IconCard key={item.title} item={item} />)}</div><div className={styles.structureFlow}>{[['Registration', User], ['Round 1', ClipboardList], ['Round 2', FileText], ['Grand Finale', Users], ['Prize Giving', Gift]].map(([label, Icon]) => { const FlowIcon = Icon as LucideIcon; return <div className={styles.flowStep} key={label as string}><FlowIcon /><span>{label as string}</span></div>; })}</div></div><div><h2 className={styles.subTitle}>Registration Information</h2><div className={styles.infoGrid}>{registrationItems.map((item) => <InfoCard key={item.title} item={item} />)}</div></div></section>
        <section className={`${styles.section} ${styles.twoColumn}`} id="rules"><div><h2 className={styles.subTitle}>Important Dates</h2><div className={styles.datePanel}><div className={styles.dateList}>{leftDates.map((date) => <div className={styles.dateItem} key={date}><strong>{date}</strong><span>Details in rulebook</span></div>)}</div><div className={styles.timelineRail} aria-hidden="true"><span /><span /><span /><span /><span /><span /></div><div className={styles.dateList}>{rightDates.map((date) => <div className={styles.dateItem} key={date}><strong>{date}</strong><span>Details in rulebook</span></div>)}</div></div></div><div><h2 className={styles.subTitle}>Rules &amp; Guidelines</h2><div className={styles.ruleButtons}><Link href="#rules" className={styles.primaryButton}>Download Rulebook <Download size={17} /></Link><Link href="#rules" className={styles.secondaryButton}>Submission Guidelines <FileText size={17} /></Link></div><div className={styles.ruleGrid}>{ruleItems.map((item) => { const Icon = item.icon; return <article className={styles.ruleCard} key={item.title}><div className={styles.iconBox}><Icon /></div><h3>{item.title}</h3></article>; })}</div></div></section>
        <section className={`${styles.section} ${styles.twoColumn}`}><div><h2 className={styles.subTitle}>Spectator Information</h2><div className={styles.spectatorBox}><div className={styles.grid5}>{spectatorItems.map((item) => <InfoCard key={item.title} item={item} />)}</div></div></div><div><h2 className={styles.subTitle}>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map((faq) => <div className={styles.faqItem} key={faq}><span>{faq}</span><span>⌄</span></div>)}</div></div></section>
        <section className={styles.cta}><h2>Ready to enter the competition?</h2><p>Register your team for Biztigation 2.0 and follow the journey from case release to grand finale.</p><div className={styles.buttonRow} style={{justifyContent: 'center'}}><Link href="#registration" className={styles.primaryButton}>Register Now <ArrowRight size={18} /></Link><Link href="#rules" className={styles.secondaryButton}>Download Rulebook <Download size={18} /></Link></div></section>
      </main>
    </div>
  );
}
