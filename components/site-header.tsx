'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Handshake,
  Home,
  Menu,
  Newspaper,
  Target,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {CurrentEventNavItem} from '@/lib/current-event';
import styles from './site-header.module.css';

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const primaryNavigation: NavigationItem[] = [
  {label: 'Home', href: '/', icon: Home},
  {label: 'Initiatives', href: '/initiatives', icon: Target},
  {label: 'People', href: '/people', icon: Users},
  {label: 'Join Us', href: '/join', icon: UserPlus},
];

const partnerHref = '/partner-with-us';

export function SiteHeader({currentEvent}: {currentEvent: CurrentEventNavItem | null}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const navigationItems = useMemo<NavigationItem[]>(() => {
    const [homeItem, ...remainingItems] = primaryNavigation;

    return [
      homeItem,
      ...(currentEvent
        ? [{label: currentEvent.label, href: currentEvent.href, icon: Newspaper}]
        : []),
      ...remainingItems,
    ];
  }, [currentEvent]);

  const isActive = useCallback(
    (href: string) => {
      const pathOnly = href.split(/[?#]/, 1)[0] || '/';

      if (pathOnly === '/') return pathname === '/';
      return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
    },
    [pathname]
  );

  const closeMobileMenu = useCallback((restoreFocus = true) => {
    setMobileMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== 'Tab' || !menuPanelRef.current) return;

      const focusableElements = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMobileMenu, mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="JU FinAnt Club home">
          <img
            src="/images/brand/finant-mark.png"
            alt=""
            className={styles.logo}
          />
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>JU FinAnt Club</span>
            <span className={styles.motto}>INDUSTRY · INTEGRITY · LEGACY</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={partnerHref}
          aria-current={isActive(partnerHref) ? 'page' : undefined}
          className={`${styles.cta} ${isActive(partnerHref) ? styles.ctaActive : ''}`}
        >
          Partner With Us
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="finant-mobile-navigation"
          onClick={() => setMobileMenuOpen(true)}
          className={styles.menuButton}
        >
          <Menu className={styles.menuIcon} aria-hidden="true" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.overlay}>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => closeMobileMenu()}
            className={styles.backdrop}
          />

          <aside
            ref={menuPanelRef}
            id="finant-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="finant-mobile-navigation-title"
            className={styles.mobilePanel}
          >
            <div className={styles.mobilePanelHeader}>
              <h2 id="finant-mobile-navigation-title" className={styles.srOnly}>
                Navigation menu
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={() => closeMobileMenu()}
                className={styles.closeButton}
              >
                <X className={styles.closeIcon} aria-hidden="true" />
              </button>
            </div>

            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => closeMobileMenu()}
                    className={`${styles.mobileLink} ${active ? styles.mobileLinkActive : ''}`}
                  >
                    <Icon className={styles.mobileLinkIcon} aria-hidden="true" />
                    <span className={styles.mobileLinkLabel}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href={partnerHref}
              aria-current={isActive(partnerHref) ? 'page' : undefined}
              onClick={() => closeMobileMenu()}
              className={styles.mobileCta}
            >
              <Handshake className={styles.mobileCtaIcon} aria-hidden="true" />
              <span>Partner With Us</span>
            </Link>
          </aside>
        </div>
      )}
    </header>
  );
}
