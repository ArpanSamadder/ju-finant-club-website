import {CarouselArrow} from '@/components/carousel-arrow';
import {client} from '@/sanity/lib/client';

type VoiceCard = {
  _id?: string;
  name: string;
  role: string;
  organisation: string;
  quote: string;
  photoUrl?: string;
  photoClass?: string;
  placeholder?: boolean;
};

const fallbackVoiceCards: VoiceCard[] = [
  {
    name: 'Arpan Samadder',
    role: 'President',
    organisation: 'Jahangirnagar University FinAnt Club',
    quote: 'FinAnt exists to build future-ready professionals through leadership, AI-powered learning, industry exposure, and meaningful execution.',
    photoClass: 'voice-photo-arpan',
  },
  {
    name: 'Faculty Advisor',
    role: 'Faculty Advisor',
    organisation: 'Department of Finance and Banking, Jahangirnagar University',
    quote: 'FinAnt creates a structured bridge between academic learning, professional development, and future-ready capability.',
    placeholder: true,
  },
];

function optimizedSanityImage(url?: string, width = 900) {
  if (!url) return undefined;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}auto=format&w=${width}&q=78`;
}

async function getVoiceCards() {
  try {
    const cmsCards = await client.fetch<Partial<VoiceCard>[]>(
      `*[_type == "voiceOfFinant" && coalesce(isActive, true) == true] | order(displayOrder asc, _createdAt desc) {
        _id,
        name,
        "role": homepageDesignation,
        organisation,
        "quote": statement,
        "photoUrl": photo.asset->url
      }`,
      {},
      {next: {revalidate: 60}}
    );

    const approvedNames = new Map(fallbackVoiceCards.map((card) => [card.name.toLowerCase(), card]));
    const normalizedCmsCards = cmsCards
      .filter((card) => card.name && !card.name.toLowerCase().includes('demo'))
      .map((card) => {
        const fallback = approvedNames.get(card.name!.toLowerCase());
        if (fallback) {
          return {
            ...fallback,
            _id: card._id,
            photoUrl: card.photoUrl,
            role: card.role || fallback.role,
            organisation: card.organisation || fallback.organisation,
            quote: card.quote || fallback.quote,
          } as VoiceCard;
        }

        if (!card.role || !card.organisation || !card.quote) return null;
        return card as VoiceCard;
      })
      .filter((card): card is VoiceCard => Boolean(card));

    const fillers = fallbackVoiceCards.filter(
      (fallback) => !normalizedCmsCards.some((card) => card.name.toLowerCase().trim() === fallback.name.toLowerCase().trim())
    );

    return [...normalizedCmsCards, ...fillers].slice(0, 2);
  } catch {
    return fallbackVoiceCards;
  }
}

function FacultyPlaceholder() {
  return (
    <div className="voice-photo flex items-center justify-center bg-[radial-gradient(circle_at_50%_32%,rgba(71,112,190,.34),transparent_30%),linear-gradient(145deg,#071735,#020817)]" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-32 w-32 text-[#7596d9]/55" fill="currentColor">
        <circle cx="60" cy="39" r="23" />
        <path d="M22 105c2-27 17-43 38-43s36 16 38 43H22Z" />
      </svg>
    </div>
  );
}

export async function VoicesSection() {
  const voiceCards = await getVoiceCards();
  const voiceLoopCards = [...voiceCards, ...voiceCards];

  return (
    <section id="voices-of-finant" className="voices-section relative overflow-hidden bg-[#020817] px-6 py-[6.8vw]">
      <div className="voices-bg-grid" />
      <div className="voices-bg-lines" />
      <div className="voices-bg-glow" />
      <div className="relative z-10 mx-auto max-w-[1760px] px-[2.6vw]">
        <p className="voices-eyebrow">Voices of FinAnt</p>

        <div className="voices-carousel-wrap">
          <CarouselArrow aria-label="Previous voice" direction="left" className="voices-arrow voices-arrow-left" />
          <CarouselArrow aria-label="Next voice" direction="right" className="voices-arrow voices-arrow-right" />

          <div className="voices-track-viewport">
            <div className="voices-card-grid">
              {voiceLoopCards.map((voice, index) => {
                const isClone = index >= voiceCards.length;
                const photoSrc = optimizedSanityImage(voice.photoUrl);

                return (
                  <article key={`${voice._id ?? voice.name}-${index}`} aria-hidden={isClone ? 'true' : undefined} className={`voice-card ${isClone ? 'voice-clone' : ''}`}>
                    {photoSrc ? (
                      <div className="voice-photo" aria-hidden="true">
                        <img src={photoSrc} alt="" loading="lazy" decoding="async" />
                      </div>
                    ) : voice.placeholder ? (
                      <FacultyPlaceholder />
                    ) : (
                      <div className={`voice-photo ${voice.photoClass ?? 'voice-photo-advisor'}`} aria-hidden="true" />
                    )}
                    <div className="voice-content">
                      <p className="voice-quote">{voice.quote}</p>
                      <div className="voice-rule" />
                      <div className="voice-signature">
                        <h3>{voice.name}</h3>
                        <p>{voice.role}</p>
                        <p className="mt-1 text-white/48">{voice.organisation}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="voices-dots" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
