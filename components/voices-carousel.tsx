'use client';

import type {PointerEvent as ReactPointerEvent} from 'react';
import {useRef, useState} from 'react';
import styles from './voices-section.module.css';

export type VoiceItem = {
  id: string;
  name: string;
  role: string;
  organisation: string;
  quote: string;
  photoUrl?: string;
  embeddedPortrait?: boolean;
};

function ArrowIcon({direction}: {direction: 'left' | 'right'}) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d={direction === 'left' ? 'M30 12 18 24l12 12M19 24h18' : 'm18 12 12 12-12 12m11-12H11'} />
    </svg>
  );
}

export function VoicesCarousel({items}: {items: VoiceItem[]}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<{x: number; y: number} | null>(null);
  const item = items[activeIndex];
  const controlsDisabled = items.length <= 1;

  const move = (direction: -1 | 1) => {
    if (controlsDisabled) return;
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.closest('button, a')) {
      pointerStart.current = null;
      return;
    }

    pointerStart.current = {x: event.clientX, y: event.clientY};
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;
    move(deltaX < 0 ? 1 : -1);
  };

  if (!item) return null;

  const quoteClass = item.quote.length > 420 ? styles.extraLongQuote : item.quote.length > 260 ? styles.longQuote : '';

  return (
    <section id="voices-of-finant" className={styles.section} aria-labelledby="voices-title">
      <div className={styles.background} aria-hidden="true" />
      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Leadership and advisory voices"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') move(-1);
          if (event.key === 'ArrowRight') move(1);
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <article className={styles.slide} key={item.id} data-voice-name={item.name}>
          <div className={`${styles.portrait} ${item.embeddedPortrait ? 'voice-photo-arpan' : ''}`} aria-hidden="true">
            {item.photoUrl ? <img src={item.photoUrl} alt="" loading="lazy" decoding="async" /> : null}
          </div>

          <div className={styles.copy}>
            <header className={styles.header}>
              <p className={styles.eyebrow}>Voices of FinAnt</p>
              <h2 id="voices-title" className={styles.subtitle}>
                Leadership and advisory voices on the purpose, standards, and future of FinAnt.
              </h2>
            </header>

            <div className={styles.quoteBlock}>
              <div className={styles.quoteMark} aria-hidden="true">“</div>
              <blockquote className={`${styles.quote} ${quoteClass}`}>
                {item.quote}
              </blockquote>
              <div className={styles.rule} aria-hidden="true" />
              <div className={styles.signature}>
                <h3>{item.name}</h3>
                <p>{item.role}</p>
                <p className={styles.organisation}>{item.organisation}</p>
              </div>
            </div>
          </div>
        </article>

        <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Previous voice" onClick={() => move(-1)} disabled={controlsDisabled}>
          <ArrowIcon direction="left" />
        </button>
        <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next voice" onClick={() => move(1)} disabled={controlsDisabled}>
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className={styles.pagination} aria-label="Select a voice">
        {items.map((voice, index) => (
          <button
            type="button"
            key={voice.id}
            aria-label={`Show ${voice.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={index === activeIndex ? styles.activeDot : ''}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <p className={styles.liveStatus} aria-live="polite">{item.name}</p>
    </section>
  );
}
