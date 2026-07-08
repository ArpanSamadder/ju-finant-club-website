'use client';

import {ChevronLeft, ChevronRight, UserRound} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import styles from '@/app/people/people.module.css';

export type DirectoryPerson = {
  id: string;
  name: string;
  designation: string;
  company?: string;
  imageUrl?: string;
};

export type DirectoryGroups = Record<
  | 'Governing Body'
  | 'Senior Executive Board'
  | 'Faculty Advisory Panel'
  | 'Corporate Advisory Panel',
  DirectoryPerson[]
>;

type SectionConfig = {
  key: keyof DirectoryGroups;
  eyebrow: string;
  title: string;
  accent: string;
  desktopPageSize: number;
  showCompany: boolean;
  showViewAll?: boolean;
};

const leadershipSections: SectionConfig[] = [
  {
    key: 'Governing Body',
    eyebrow: '01 · CLUB LEADERSHIP',
    title: 'Governing',
    accent: 'Body',
    desktopPageSize: 5,
    showCompany: false,
  },
  {
    key: 'Senior Executive Board',
    eyebrow: '02 · CLUB LEADERSHIP',
    title: 'Senior Executive',
    accent: 'Board',
    desktopPageSize: 6,
    showCompany: false,
    showViewAll: true,
  },
];

const advisorSections: SectionConfig[] = [
  {
    key: 'Faculty Advisory Panel',
    eyebrow: '01 · CLUB ADVISOR',
    title: 'Faculty',
    accent: 'Advisory Panel',
    desktopPageSize: 5,
    showCompany: true,
  },
  {
    key: 'Corporate Advisory Panel',
    eyebrow: '02 · CLUB ADVISOR',
    title: 'Corporate',
    accent: 'Advisory Panel',
    desktopPageSize: 5,
    showCompany: true,
    showViewAll: true,
  },
];

export function PeopleDirectory({groups}: {groups: DirectoryGroups}) {
  return (
    <div className={styles.pageShell}>
      <header className={styles.hero}>
        <h1>
          The People
          <br />
          Building <span>FinAnt</span>
        </h1>
        <div className={styles.headingRule} aria-hidden="true">
          <span />
          <i />
        </div>
      </header>

      <DirectoryPanel sections={leadershipSections} groups={groups} />
      <DirectoryPanel sections={advisorSections} groups={groups} compactTop />
    </div>
  );
}

function DirectoryPanel({
  sections,
  groups,
  compactTop = false,
}: {
  sections: SectionConfig[];
  groups: DirectoryGroups;
  compactTop?: boolean;
}) {
  return (
    <section
      className={`${styles.panel} ${compactTop ? styles.advisorPanel : ''}`}
    >
      {sections.map((section, index) => (
        <DirectorySection
          key={section.key}
          config={section}
          people={groups[section.key]}
          divided={index > 0}
        />
      ))}
    </section>
  );
}

function DirectorySection({
  config,
  people,
  divided,
}: {
  config: SectionConfig;
  people: DirectoryPerson[];
  divided: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const pageSize = isMobile ? 3 : config.desktopPageSize;
  const pageCount = Math.max(1, Math.ceil(people.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const visiblePeople = useMemo(() => {
    if (expanded) return people;
    const start = safePage * pageSize;
    return people.slice(start, start + pageSize);
  }, [expanded, pageSize, people, safePage]);

  const move = (direction: number) => {
    if (expanded) setExpanded(false);
    setPage((current) => (current + direction + pageCount) % pageCount);
  };

  const dots = Math.max(3, Math.min(5, pageCount));
  const activeDot = pageCount === 1 ? 1 : Math.min(safePage, dots - 1);

  return (
    <div className={`${styles.directorySection} ${divided ? styles.divided : ''}`}>
      <div className={styles.sectionHeading}>
        <p>{config.eyebrow}</p>
        <h2>
          {config.title} <span>{config.accent}</span>
        </h2>
      </div>

      <div className={styles.carouselStage}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.leftArrow}`}
          aria-label={`Show previous ${config.key} profiles`}
          onClick={() => move(-1)}
        >
          <ChevronLeft />
        </button>

        <div
          className={`${styles.cards} ${
            expanded ? styles.expandedCards : ''
          }`}
          style={{'--desktop-count': config.desktopPageSize} as React.CSSProperties}
        >
          {visiblePeople.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              showCompany={config.showCompany}
            />
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.rightArrow}`}
          aria-label={`Show next ${config.key} profiles`}
          onClick={() => move(1)}
        >
          <ChevronRight />
        </button>
      </div>

      <div className={styles.sectionFooter}>
        <div className={styles.dots} aria-label={`${config.key} carousel pages`}>
          {Array.from({length: dots}).map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === activeDot ? styles.activeDot : ''}
              aria-label={`Carousel indicator ${index + 1}`}
              disabled={index >= pageCount}
              onClick={() => index < pageCount && setPage(index)}
            />
          ))}
        </div>

        {config.showViewAll ? (
          <button
            type="button"
            className={styles.viewAll}
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show Less' : 'View All'} <ChevronRight />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function PersonCard({
  person,
  showCompany,
}: {
  person: DirectoryPerson;
  showCompany: boolean;
}) {
  return (
    <article className={styles.personCard}>
      <div className={styles.portrait}>
        {person.imageUrl ? (
          <img src={person.imageUrl} alt={person.name} loading="lazy" />
        ) : (
          <UserRound aria-hidden="true" />
        )}
      </div>
      <div className={styles.cardRule} aria-hidden="true" />
      <div className={styles.personCopy}>
        <h3>{person.name}</h3>
        <p>{person.designation}</p>
        {showCompany ? <span>{person.company || 'Company/Institution'}</span> : null}
      </div>
    </article>
  );
}
