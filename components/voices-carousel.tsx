'use client';

import type {PointerEvent as ReactPointerEvent, ReactNode} from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
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

type InteractionState = {
  hover: boolean;
  focus: boolean;
  drag: boolean;
};

function ArrowIcon({direction}: {direction: 'left' | 'right'}) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d={direction === 'left' ? 'M30 12 18 24l12 12M19 24h18' : 'm18 12 12 12-12 12m11-12H11'} />
    </svg>
  );
}

function VoiceSlide({item, active, motionClass}: {item: VoiceItem; active: boolean; motionClass?: string}) {
  const quoteClass = item.quote.length > 420 ? styles.extraLongQuote : item.quote.length > 260 ? styles.longQuote : '';

  return (
    <article
      className={`${styles.slide} ${motionClass ?? ''}`}
      data-voice-name={item.name}
      aria-hidden={active ? undefined : 'true'}
    >
      <div className={`${styles.portrait} ${item.embeddedPortrait ? 'voice-photo-arpan' : ''}`} aria-hidden="true">
        {item.photoUrl ? <img src={item.photoUrl} alt="" loading="lazy" decoding="async" /> : null}
      </div>

      <div className={styles.copy}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Voices of FinAnt</p>
          {active ? (
            <h2 id="voices-title" className={styles.subtitle}>
              Leadership and advisory voices on the purpose, standards, and future of FinAnt.
            </h2>
          ) : (
            <div className={styles.subtitle}>
              Leadership and advisory voices on the purpose, standards, and future of FinAnt.
            </div>
          )}
        </header>

        <div className={styles.quoteBlock}>
          <div className={styles.quoteMark} aria-hidden="true">“</div>
          <blockquote className={`${styles.quote} ${quoteClass}`}>{item.quote}</blockquote>
          <div className={styles.rule} aria-hidden="true" />
          <div className={styles.signature}>
            <h3>{item.name}</h3>
            <p>{item.role}</p>
            <p className={styles.organisation}>{item.organisation}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function VoicesCarousel({items}: {items: VoiceItem[]}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<{x: number; y: number} | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const interaction = useRef<InteractionState>({hover: false, focus: false, drag: false});
  const reducedMotionRef = useRef(false);
  const activeIndexRef = useRef(0);
  const item = items[activeIndex];
  const controlsDisabled = items.length <= 1;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
  }, []);

  const move = useCallback((nextDirection: -1 | 1) => {
    if (items.length <= 1) return;
    const current = activeIndexRef.current;
    const next = (current + nextDirection + items.length) % items.length;

    clearTransitionTimer();
    setDirection(nextDirection);
    if (!reducedMotionRef.current) {
      setOutgoingIndex(current);
      transitionTimer.current = window.setTimeout(() => setOutgoingIndex(null), 680);
    } else {
      setOutgoingIndex(null);
    }
    activeIndexRef.current = next;
    setActiveIndex(next);
  }, [clearTransitionTimer, items.length]);

  const hasActiveInteraction = useCallback(() => Object.values(interaction.current).some(Boolean), []);

  const pauseFor = useCallback((reason: keyof InteractionState) => {
    interaction.current[reason] = true;
    clearResumeTimer();
    setPaused(true);
  }, [clearResumeTimer]);

  const resumeAfterInteraction = useCallback((delay = 5000) => {
    clearResumeTimer();
    if (hasActiveInteraction()) return;
    setPaused(true);
    resumeTimer.current = window.setTimeout(() => {
      if (hasActiveInteraction()) return;
      setPaused(false);
      if (!reducedMotionRef.current && items.length > 1) move(1);
    }, delay);
  }, [clearResumeTimer, hasActiveInteraction, items.length, move]);

  const releaseReason = useCallback((reason: keyof InteractionState) => {
    interaction.current[reason] = false;
    resumeAfterInteraction(5000);
  }, [resumeAfterInteraction]);

  const manualMove = useCallback((nextDirection: -1 | 1) => {
    clearResumeTimer();
    setPaused(true);
    move(nextDirection);
    resumeAfterInteraction(5000);
  }, [clearResumeTimer, move, resumeAfterInteraction]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
      if (media.matches) setOutgoingIndex(null);
    };
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (controlsDisabled || reducedMotion || paused) return;
    const timer = window.setTimeout(() => move(1), 7000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, controlsDisabled, move, paused, reducedMotion]);

  useEffect(() => () => {
    clearResumeTimer();
    clearTransitionTimer();
  }, [clearResumeTimer, clearTransitionTimer]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.closest('button, a')) {
      pointerStart.current = null;
      return;
    }

    pointerStart.current = {x: event.clientX, y: event.clientY};
    pauseFor('drag');
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const finishPointer = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (start && event) {
      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;
      if (Math.abs(deltaX) >= 42 && Math.abs(deltaX) >= Math.abs(deltaY) * 1.15) {
        move(deltaX < 0 ? 1 : -1);
      }
    }

    releaseReason('drag');
  };

  if (!item) return null;

  const outgoingItem = outgoingIndex === null ? null : items[outgoingIndex];
  const incomingClass = direction === 1 ? styles.incomingForward : styles.incomingBackward;
  const outgoingClass = direction === 1 ? styles.outgoingForward : styles.outgoingBackward;

  return (
    <section id="voices-of-finant" className={styles.section} aria-labelledby="voices-title">
      <div className={styles.background} aria-hidden="true" />
      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Leadership and advisory voices"
        tabIndex={0}
        data-active-index={activeIndex}
        data-record-count={items.length}
        data-autoplay={reducedMotion ? 'reduced' : paused ? 'paused' : 'running'}
        onMouseEnter={() => pauseFor('hover')}
        onMouseLeave={() => releaseReason('hover')}
        onFocusCapture={() => pauseFor('focus')}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) releaseReason('focus');
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            manualMove(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            manualMove(1);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerUp={finishPointer}
        onPointerCancel={() => finishPointer()}
      >
        <div className={styles.slideStage}>
          {outgoingItem ? <VoiceSlide item={outgoingItem} active={false} motionClass={outgoingClass} /> : null}
          <VoiceSlide key={item.id} item={item} active motionClass={outgoingItem ? incomingClass : undefined} />
        </div>

        <div className={styles.controls} data-carousel-controls>
          <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Previous voice" onClick={() => manualMove(-1)} disabled={controlsDisabled}>
            <ArrowIcon direction="left" />
          </button>

          <div className={styles.pagination} aria-label="Select a voice" data-pagination-count={items.length}>
            {items.map((voice, index) => (
              <button
                type="button"
                key={voice.id}
                aria-label={`Show ${voice.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={index === activeIndex ? styles.activeDot : ''}
                onClick={() => {
                  if (index === activeIndex) return;
                  clearResumeTimer();
                  setPaused(true);
                  const shortestDirection: -1 | 1 = index > activeIndex ? 1 : -1;
                  clearTransitionTimer();
                  setDirection(shortestDirection);
                  if (!reducedMotionRef.current) {
                    setOutgoingIndex(activeIndex);
                    transitionTimer.current = window.setTimeout(() => setOutgoingIndex(null), 680);
                  }
                  activeIndexRef.current = index;
                  setActiveIndex(index);
                  resumeAfterInteraction(5000);
                }}
              />
            ))}
          </div>

          <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next voice" onClick={() => manualMove(1)} disabled={controlsDisabled}>
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <p className={styles.liveStatus} aria-live="polite">{item.name}</p>
    </section>
  );
}
