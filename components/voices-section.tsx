import {client} from '@/sanity/lib/client';

type VoiceCard = {
  _id?: string;
  name: string;
  role: string;
  quote: string;
  photoUrl?: string;
  photoClass?: string;
};

const fallbackVoiceCards: VoiceCard[] = [
  {
    name: 'Arpan Samadder',
    role: 'Founding President, Jahangirnagar University FinAnt Club',
    quote: 'FinAnt was built for one reason: the AI age is here, and most professionals are not ready. We did not build events for the sake of events. We built a platform that develops AI-native professionals the industry will compete to hire, measured not by event counts, but by what our members become.',
    photoClass: 'voice-photo-arpan',
  },
  {
    name: 'Demo CA 1',
    role: 'Corporate Advisor, Jahangirnagar University FinAnt Club',
    quote: 'The talent gap in Bangladesh’s corporate sector is real, and FinAnt is one of the few platforms actively closing it. This is not a club running events. It is a structured development platform producing disciplined, AI-aware professionals who can contribute from day one — exactly what the industry needs.',
    photoClass: 'voice-photo-advisor',
  },
];

async function getVoiceCards() {
  try {
    const cmsCards = await client.fetch<VoiceCard[]>(
      `*[_type == "voiceOfFinant" && isActive == true] | order(displayOrder asc, _createdAt desc) {
        _id,
        name,
        "role": designation,
        "quote": message,
        "photoUrl": photo.asset->url
      }`,
      {},
      {next: {revalidate: 60}}
    );

    const cleanCmsCards = cmsCards.filter((card) => card.name && card.role && card.quote);

    if (cleanCmsCards.length >= 2) return cleanCmsCards;

    const fillers = fallbackVoiceCards.filter(
      (fallback) => !cleanCmsCards.some((card) => card.name.toLowerCase().trim() === fallback.name.toLowerCase().trim())
    );

    return [...cleanCmsCards, ...fillers].slice(0, 6);
  } catch {
    return fallbackVoiceCards;
  }
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
          <button aria-label="Previous voice" className="voices-arrow voices-arrow-left">‹</button>
          <button aria-label="Next voice" className="voices-arrow voices-arrow-right">›</button>

          <div className="voices-track-viewport">
            <div className="voices-card-grid">
              {voiceLoopCards.map((voice, index) => {
                const isClone = index >= voiceCards.length;

                return (
                  <article key={`${voice._id ?? voice.name}-${index}`} aria-hidden={isClone ? 'true' : undefined} className={`voice-card ${isClone ? 'voice-clone' : ''}`}>
                    {voice.photoUrl ? (
                      <div className="voice-photo" aria-hidden="true">
                        <img src={voice.photoUrl} alt="" />
                      </div>
                    ) : (
                      <div className={`voice-photo ${voice.photoClass ?? 'voice-photo-advisor'}`} aria-hidden="true" />
                    )}
                    <div className="voice-content">
                      <p className="voice-quote">{voice.quote}</p>
                      <div className="voice-rule" />
                      <div className="voice-signature">
                        <h3>{voice.name}</h3>
                        <p>{voice.role}</p>
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
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
