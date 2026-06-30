type PartnerCard = {
  name: string;
  logo: string;
  logoSub?: string;
  logoClass: string;
};

const partnerCards: PartnerCard[] = [
  {name: 'Pragati Insurance Limited', logo: 'Pragati Insurance', logoSub: 'Limited', logoClass: 'partner-logo-pragati'},
  {name: 'Chaldal', logo: 'Chaldal', logoSub: '.com', logoClass: 'partner-logo-chaldal'},
  {name: 'LankaBangla Finance', logo: 'LankaBangla', logoSub: 'FINANCE', logoClass: 'partner-logo-lankabangla'},
  {name: 'Green Delta Capital', logo: 'GREEN DELTA', logoSub: 'CAPITAL', logoClass: 'partner-logo-greendelta'},
  {name: 'The Daily Star', logo: 'The Daily Star', logoClass: 'partner-logo-dailystar'},
  {name: 'NRB Bank', logo: 'NRB Bank', logoClass: 'partner-logo-nrb'},
  {name: 'Syngenta', logo: 'syngenta', logoClass: 'partner-logo-syngenta'},
  {name: 'Crown Cement', logo: 'CROWN CEMENT', logoSub: 'FOR SOLID FOUNDATION', logoClass: 'partner-logo-crown'},
];

export function PartnersSection() {
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

        <div className="partners-carousel">
          <button aria-label="Previous partner" className="partners-arrow partners-arrow-left">‹</button>
          <button aria-label="Next partner" className="partners-arrow partners-arrow-right">›</button>

          <div className="partners-grid">
            {partnerCards.map((partner) => (
              <article key={partner.name} className="partner-card">
                <div className={`partner-logo ${partner.logoClass}`} aria-hidden="true">
                  <span>{partner.logo}</span>
                  {partner.logoSub ? <small>{partner.logoSub}</small> : null}
                </div>
                <div className="partner-rule" />
                <h3 className="partner-name">{partner.name}</h3>
              </article>
            ))}
          </div>

          <div className="partners-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
