import {client} from '@/sanity/lib/client';

type PartnerCard = {
  _id?: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  placeholder?: boolean;
};

const fallbackPartnerCards: PartnerCard[] = [
  {name: 'Partner 01', placeholder: true},
  {name: 'Partner 02', placeholder: true},
  {name: 'Partner 03', placeholder: true},
  {name: 'Partner 04', placeholder: true},
];

async function getPartnerCards() {
  try {
    const cmsCards = await client.fetch<PartnerCard[]>(
      `*[_type == "partner" && defined(name) && coalesce(isActive, true) == true] | order(displayOrder asc, _createdAt desc)[0...8] {
        _id,
        name,
        "logoUrl": logo.asset->url,
        "websiteUrl": website
      }`,
      {},
      {next: {revalidate: 60}}
    );

    const cleanCmsCards = cmsCards.filter((card) => card.name);
    const fillers = fallbackPartnerCards.slice(0, Math.max(0, 4 - cleanCmsCards.length));

    return [...cleanCmsCards, ...fillers].slice(0, 8);
  } catch {
    return fallbackPartnerCards;
  }
}

function PartnerLogo({partner}: {partner: PartnerCard}) {
  if (partner.logoUrl) {
    return <img src={partner.logoUrl} alt="" loading="lazy" decoding="async" className="partner-logo-img" />;
  }

  return (
    <div className="partner-logo-placeholder">
      LOGO
    </div>
  );
}

export async function PartnersSection() {
  const partnerCards = await getPartnerCards();

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

        <div className="partners-carousel" aria-label="Partners and collaborators">
          <div className="partners-track-viewport">
            <div className="partners-grid">
              {partnerCards.map((partner, index) => {
                const cardContent = (
                  <>
                    <div className="partner-logo" aria-hidden="true">
                      <PartnerLogo partner={partner} />
                    </div>
                    <div className="partner-rule" />
                    <h3 className="partner-name">{partner.name}</h3>
                  </>
                );

                if (partner.websiteUrl) {
                  return (
                    <a
                      key={partner._id ?? `${partner.name}-${index}`}
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="partner-card"
                    >
                      {cardContent}
                    </a>
                  );
                }

                return (
                  <article key={partner._id ?? `${partner.name}-${index}`} className="partner-card">
                    {cardContent}
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
