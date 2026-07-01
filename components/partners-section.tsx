import {client} from '@/sanity/lib/client';

type PartnerCard = {
  _id?: string;
  name: string;
  logo?: string;
  logoSub?: string;
  logoClass?: string;
  logoUrl?: string;
};

const fallbackPartnerCards: PartnerCard[] = [
  {name: 'Pragati Insurance Limited', logo: 'Pragati Insurance', logoSub: 'Limited', logoClass: 'partner-logo-pragati'},
  {name: 'Chaldal', logo: 'Chaldal', logoSub: '.com', logoClass: 'partner-logo-chaldal'},
  {name: 'LankaBangla Finance', logo: 'LankaBangla', logoSub: 'FINANCE', logoClass: 'partner-logo-lankabangla'},
  {name: 'Green Delta Capital', logo: 'GREEN DELTA', logoSub: 'CAPITAL', logoClass: 'partner-logo-greendelta'},
];

async function getPartnerCards() {
  try {
    const cmsCards = await client.fetch<PartnerCard[]>(
      `*[_type == "partner" && defined(name) && defined(logo.asset)] | order(featured desc, _createdAt desc) {
        _id,
        name,
        "logoUrl": logo.asset->url
      }`,
      {},
      {next: {revalidate: 60}}
    );

    const cleanCmsCards = cmsCards.filter((card) => card.name && card.logoUrl);

    if (cleanCmsCards.length >= 4) return cleanCmsCards;

    const fillers = fallbackPartnerCards.filter(
      (fallback) => !cleanCmsCards.some((card) => card.name.toLowerCase().trim() === fallback.name.toLowerCase().trim())
    );

    return [...cleanCmsCards, ...fillers].slice(0, 8);
  } catch {
    return fallbackPartnerCards;
  }
}

export async function PartnersSection() {
  const partnerCards = await getPartnerCards();
  const partnerLoopCards = [...partnerCards, ...partnerCards];

  return (
    <section id="partners-collaborators" className="partners-section relative overflow-hidden bg-[#020817] px-6 py-[6.8vw]">
      <div className="partners-bg-grid" />
      <div className="partners-bg-lines" />
      <div className="partners-bg-glow" />

      <div className="relative z-10 mx-auto max-w-[1760px] px-[2.6vw]">
        <div className="partners-kicker">
          <h2 className="partners-title"><span className="partners-title-glow">Partners &amp; Collaborators</span></h2>
        </div>
        <p className="partners-subtitle">Building trusted relationships across industry, academia, media, and youth communities.</p>

        <div className="partners-carousel" aria-label="Partners and collaborators carousel">
          <div className="partners-track-viewport">
            <div className="partners-grid">
              {partnerLoopCards.map((partner, index) => {
                const isClone = index >= partnerCards.length;

                return (
                  <article key={`${partner._id ?? partner.name}-${index}`} aria-hidden={isClone ? 'true' : undefined} className={`partner-card ${isClone ? 'partner-clone' : ''}`}>
                    <div className={`partner-logo ${partner.logoClass ?? ''}`} aria-hidden="true">
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt="" loading="lazy" decoding="async" className="partner-logo-img" />
                      ) : (
                        <>
                          <span>{partner.logo ?? partner.name}</span>
                          {partner.logoSub ? <small>{partner.logoSub}</small> : null}
                        </>
                      )}
                    </div>
                    <div className="partner-rule" />
                    <h3 className="partner-name">{partner.name}</h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
