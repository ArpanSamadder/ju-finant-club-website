import styles from './identity-section.module.css';

type Capability = {
  title: string;
  body: string;
  icon: 'ai' | 'briefcase' | 'legacy';
};

const capabilities: Capability[] = [
  {
    title: 'AI-Native Capability',
    body: 'AI becomes part of how members learn, think, communicate, and execute.',
    icon: 'ai',
  },
  {
    title: 'Corporate Readiness',
    body: 'Every program is designed to build professionalism, reliability, and real-world capability.',
    icon: 'briefcase',
  },
  {
    title: 'Legacy by Design',
    body: 'Systems, culture, and standards are built to outlast any single leadership team.',
    icon: 'legacy',
  },
];

function CapabilityIcon({icon}: {icon: Capability['icon']}) {
  if (icon === 'briefcase') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M32 34v-9c0-4 3-7 7-7h18c4 0 7 3 7 7v9" />
        <path d="M20 36h56c4 0 7 3 7 7v29c0 4-3 7-7 7H20c-4 0-7-3-7-7V43c0-4 3-7 7-7Z" />
        <path d="M13 53h70" />
        <path d="M43 53h10v10H43z" />
      </svg>
    );
  }

  if (icon === 'legacy') {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M22 77h52M28 70h40M31 35h34" />
        <path d="M25 29h46L48 17 25 29Z" />
        <path d="M34 38v28M48 38v28M62 38v28" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <path d="M29 29h38v38H29z" />
      <path d="M38 29V16M48 29V16M58 29V16M38 80V67M48 80V67M58 80V67M29 38H16M29 48H16M29 58H16M80 38H67M80 48H67M80 58H67" />
      <path d="M40 58l8-20 8 20M43 51h10M61 39v19" />
    </svg>
  );
}

export function IdentitySection() {
  return (
    <section id="our-identity" className={styles.section} aria-labelledby="our-identity-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Our Identity</p>
          <h2 id="our-identity-title" className={styles.title}>
            JU&apos;s <span>AI-First</span> Career &amp; Leadership Platform
          </h2>
          <p className={styles.lead}>
            We develop AI-native professionals, leaders, and corporate-ready talent for impact beyond university life.
          </p>
          <p className={styles.body}>
            FinAnt combines financial discipline, industry connection, practical experiences, and AI-powered productivity to build professionalism, execution capability, and long-term trust.
          </p>
        </header>

        <div className={styles.capabilitySystem}>
          <div className={styles.connector} aria-hidden="true" />
          {capabilities.map((capability) => (
            <article key={capability.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                <CapabilityIcon icon={capability.icon} />
              </div>
              <div className={styles.mobileDivider} aria-hidden="true" />
              <div className={styles.cardCopy}>
                <h3>{capability.title}</h3>
                <span className={styles.accent} aria-hidden="true" />
                <p>{capability.body}</p>
              </div>
            </article>
          ))}
          <div className={styles.connectorNode} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
