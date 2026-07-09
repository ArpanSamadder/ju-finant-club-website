'use client';

import {ChevronRight, UserRound} from 'lucide-react';
import {useState, type CSSProperties} from 'react';
import {CarouselArrow} from '@/components/carousel-arrow';
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

type TickerDirection = 'left' | 'right';

type SectionConfig = {
  key: keyof DirectoryGroups;
  eyebrow: string;
  title: string;
  accent: string;
  desktopPageSize: number;
  showCompany: boolean;
  tickerDirection: TickerDirection;
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
    tickerDirection: 'left',
  },
  {
    key: 'Senior Executive Board',
    eyebrow: '02 · CLUB LEADERSHIP',
    title: 'Senior Executive',
    accent: 'Board',
    desktopPageSize: 6,
    showCompany: false,
    tickerDirection: 'right',
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
    tickerDirection: 'left',
  },
  {
    key: 'Corporate Advisory Panel',
    eyebrow: '02 · CLUB ADVISOR',
    title: 'Corporate',
    accent: 'Advisory Panel',
    desktopPageSize: 5,
    showCompany: true,
    tickerDirection: 'right',
    showViewAll: true,
  },
];

export function PeopleDirectory({groups}: {groups: DirectoryGroups}) {
  return (
    <div className={styles.pageShell}>
      <header className={styles.hero}>
        <h1>
          The People Building <span>FinAnt</span>
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
  const [expanded, setExpanded] = useState(false);
  const [tickerDirection, setTickerDirection] = useState<TickerDirection>(config.tickerDirection);
  const [tickerRestartKey, setTickerRestartKey] = useState(0);
  const minimumLoopCount = Math.max(config.desktopPageSize + 1, people.length);
  const loopPeople = people.length
    ? Array.from({length: minimumLoopCount}, (_, index) => people[index % people.length])
    : [];
  const tickerStyle = {
    '--desktop-count': config.desktopPageSize,
    '--ticker-duration': `${Math.max(loopPeople.length * 8, 40)}s`,
  } as CSSProperties;

  const handleArrowNavigation = (direction: TickerDirection) => {
    setExpanded(false);
    setTickerDirection(direction === 'left' ? 'right' : 'left');
    setTickerRestartKey((current) => current + 1);
  };

  const renderCards = (items: DirectoryPerson[], groupKey: string) =>
    items.map((person, index) => (
      <PersonCard
        key={`${groupKey}-${person.id}-${index}`}
        person={person}
        showCompany={config.showCompany}
      />
    ));

  return (
    <div className={`${styles.directorySection} ${divided ? styles.divided : ''}`}>
      <div className={styles.sectionHeading}>
        <p>{config.eyebrow}</p>
        <h2>
          {config.title} <span>{config.accent}</span>
        </h2>
      </div>

      <div className={styles.carouselStage}>
        <CarouselArrow
          type="button"
          direction="left"
          className={`${styles.arrow} ${styles.leftArrow}`}
          aria-label={`Previous ${config.key}`}
          onClick={() => handleArrowNavigation('left')}
        />

        {expanded ? (
          <div
            className={`${styles.cards} ${styles.expandedCards}`}
            style={tickerStyle}
          >
            {renderCards(people, 'expanded')}
          </div>
        ) : (
          <div className={styles.marqueeViewport} style={tickerStyle}>
            <div
              key={tickerRestartKey}
              className={`${styles.marqueeTrack} ${
                tickerDirection === 'right' ? styles.marqueeReverse : ''
              }`}
            >
              <div className={styles.marqueeGroup}>
                {renderCards(loopPeople, 'primary')}
              </div>
              <div className={styles.marqueeGroup} aria-hidden="true">
                {renderCards(loopPeople, 'duplicate')}
              </div>
            </div>
          </div>
        )}

        <CarouselArrow
          type="button"
          direction="right"
          className={`${styles.arrow} ${styles.rightArrow}`}
          aria-label={`Next ${config.key}`}
          onClick={() => handleArrowNavigation('right')}
        />
      </div>

      <div className={styles.sectionFooter}>
        <div className={styles.dots} aria-hidden="true">
          {Array.from({length: 3}).map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === 1 ? styles.activeDot : ''}
              tabIndex={-1}
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
