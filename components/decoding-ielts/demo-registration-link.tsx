'use client';

import { useEffect } from 'react';

const REGISTRATION_URL = '/decoding-ielts/register';

const DEMO_FORM_SELECTORS = [
  '#reserve-seat form',
  '#reserve-seat-mobile [aria-label="Registration preview"]',
];

export function DemoRegistrationLink() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    DEMO_FORM_SELECTORS.forEach((selector) => {
      const target = document.querySelector<HTMLElement>(selector);
      if (!target) return;

      const previousPosition = target.style.position;
      const previousCursor = target.style.cursor;
      const interactiveElements = Array.from(
        target.querySelectorAll<HTMLElement>(
          'input, button, select, textarea, a, [tabindex]'
        )
      );
      const previousTabIndexes = interactiveElements.map((element) =>
        element.getAttribute('tabindex')
      );

      if (window.getComputedStyle(target).position === 'static') {
        target.style.position = 'relative';
      }
      target.style.cursor = 'pointer';

      interactiveElements.forEach((element) => {
        element.setAttribute('tabindex', '-1');
      });

      const overlay = document.createElement('a');
      overlay.href = REGISTRATION_URL;
      overlay.setAttribute(
        'aria-label',
        'Open the Decoding IELTS masterclass registration form'
      );
      overlay.title = 'Open registration form';
      overlay.style.position = 'absolute';
      overlay.style.inset = '0';
      overlay.style.zIndex = '20';
      overlay.style.display = 'block';
      overlay.style.borderRadius = 'inherit';
      overlay.style.cursor = 'pointer';
      overlay.style.outlineOffset = '4px';

      target.appendChild(overlay);

      cleanups.push(() => {
        overlay.remove();
        target.style.position = previousPosition;
        target.style.cursor = previousCursor;
        interactiveElements.forEach((element, index) => {
          const previousTabIndex = previousTabIndexes[index];
          if (previousTabIndex === null) {
            element.removeAttribute('tabindex');
          } else {
            element.setAttribute('tabindex', previousTabIndex);
          }
        });
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
