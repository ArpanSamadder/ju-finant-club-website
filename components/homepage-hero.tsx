import Link from 'next/link';
import styles from './homepage-hero.module.css';

export type CurrentEventLink = {
  label: string;
  href: string;
};

type HomepageHeroProps = {
  currentEvent?: CurrentEventLink | null;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.arrowIcon}>
      <path d="M4 10h11" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

export function HomepageHero({currentEvent}: HomepageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="homepage-hero-title">
      <picture className={styles.artwork} aria-hidden="true">
        <source media="(max-width: 767px)" type="image/avif" srcSet="/images/hero/hero-mobile.avif" />
        <source media="(max-width: 767px)" type="image/webp" srcSet="/images/hero/hero-mobile.webp" />
        <source type="image/avif" srcSet="/images/hero/hero-desktop.avif" />
        <source type="image/webp" srcSet="/images/hero/hero-desktop.webp" />
        <img
          src="/images/hero/hero-desktop.webp"
          alt=""
          width={1996}
          height={788}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          sizes="100vw"
          className={styles.artworkImage}
        />
      </picture>

      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.content}>
          <h1 id="homepage-hero-title" className={styles.headline}>
            <span className={styles.headlineFirstLine}>
              <span>Building</span>{' '}
              <span className={styles.accent}>Future-Ready</span>
            </span>
            <span className={styles.headlineSecondLine}>Professionals.</span>
          </h1>

          <div className={styles.identity}>
            <p>Jahangirnagar University</p>
            <p className={styles.accent}>FinAnt Club</p>
          </div>

          <p className={styles.description}>
            An AI-first career platform for professional readiness, leadership growth, and corporate trust.
          </p>

          <div className={styles.actions}>
            <Link href="#legacy-foundation" className={`${styles.button} ${styles.primaryButton}`}>
              <span>Explore FinAnt</span>
              <ArrowIcon />
            </Link>

            {currentEvent ? (
              <Link
                href={currentEvent.href}
                aria-label={`Open ${currentEvent.label}`}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                <span>{currentEvent.label}</span>
                <ArrowIcon />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
