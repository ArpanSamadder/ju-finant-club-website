'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from '@/app/events/decoding-ielts/floatingRegister.module.css';
import { DemoRegistrationLink } from './demo-registration-link';

export function FloatingRegisterButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('decoding-ielts-hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.02 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <DemoRegistrationLink />
      <div
        className={`${styles.wrap} ${visible ? styles.visible : ''}`}
        aria-hidden={!visible}
      >
        <Link
          href="/events/decoding-ielts/register"
          className={styles.button}
          tabIndex={visible ? 0 : -1}
        >
          <span>Register Now</span>
          <ArrowRight />
        </Link>
      </div>
    </>
  );
}
