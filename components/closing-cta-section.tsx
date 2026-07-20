import Link from 'next/link';
import {client} from '@/sanity/lib/client';

type ClosingCtaContent = {
  sectionEyebrow: string;
  sectionHeadline: string;
  studentTitle: string;
  studentDescription: string;
  studentButtonLabel: string;
  studentButtonLink: string;
  organisationTitle: string;
  organisationDescription: string;
  organisationButtonLabel: string;
  organisationButtonLink: string;
  isActive: boolean;
};

const fallbackContent: ClosingCtaContent = {
  sectionEyebrow: 'BUILD WITH FINANT',
  sectionHeadline: 'Build the Future with FinAnt',
  studentTitle: 'For Students',
  studentDescription: 'Develop the skills, confidence, and professional readiness to lead in an AI-driven world.',
  studentButtonLabel: 'Join FinAnt',
  studentButtonLink: '/join-us',
  organisationTitle: 'For Organisations',
  organisationDescription: 'Collaborate with a future-focused platform connecting industry with emerging talent.',
  organisationButtonLabel: 'Partner With Us',
  organisationButtonLink: '/partner-with-us',
  isActive: true,
};

async function getClosingCtaContent(): Promise<ClosingCtaContent> {
  try {
    const content = await client.fetch<Partial<ClosingCtaContent> | null>(
      `*[_type == "homepageClosingCta"][0] {
        sectionEyebrow,
        sectionHeadline,
        studentTitle,
        studentDescription,
        studentButtonLabel,
        studentButtonLink,
        organisationTitle,
        organisationDescription,
        organisationButtonLabel,
        organisationButtonLink,
        isActive
      }`,
      {},
      {next: {revalidate: 60}}
    );

    return {
      sectionEyebrow: content?.sectionEyebrow || fallbackContent.sectionEyebrow,
      sectionHeadline: content?.sectionHeadline || fallbackContent.sectionHeadline,
      studentTitle: content?.studentTitle || fallbackContent.studentTitle,
      studentDescription: content?.studentDescription || fallbackContent.studentDescription,
      studentButtonLabel: content?.studentButtonLabel || fallbackContent.studentButtonLabel,
      studentButtonLink: content?.studentButtonLink || fallbackContent.studentButtonLink,
      organisationTitle: content?.organisationTitle || fallbackContent.organisationTitle,
      organisationDescription: content?.organisationDescription || fallbackContent.organisationDescription,
      organisationButtonLabel: content?.organisationButtonLabel || fallbackContent.organisationButtonLabel,
      organisationButtonLink: content?.organisationButtonLink || fallbackContent.organisationButtonLink,
      isActive: content?.isActive ?? fallbackContent.isActive,
    };
  } catch {
    return fallbackContent;
  }
}

export async function ClosingCtaSection() {
  const content = await getClosingCtaContent();

  if (!content.isActive) return null;

  const panels = [
    {
      title: content.studentTitle,
      description: content.studentDescription,
      label: content.studentButtonLabel,
      href: content.studentButtonLink,
      marker: '01',
    },
    {
      title: content.organisationTitle,
      description: content.organisationDescription,
      label: content.organisationButtonLabel,
      href: content.organisationButtonLink,
      marker: '02',
    },
  ];

  return (
    <section id="partner-with-us" className="relative overflow-hidden bg-[#020817] px-6 py-[7vw]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(17,95,235,.17),transparent_34%),linear-gradient(180deg,rgba(2,8,23,.15),rgba(2,8,23,.98))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,217,255,.06)_1px,transparent_1px),linear-gradient(0deg,rgba(0,217,255,.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.62em] text-[#00F0FF] max-sm:tracking-[0.34em]">
            {content.sectionEyebrow}
          </p>
          <h2 className="mt-6 text-[clamp(2.5rem,4vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-white">
            {content.sectionHeadline}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {panels.map((panel) => (
            <article key={panel.marker} className="group relative overflow-hidden rounded-[1.5rem] border border-[#00D9FF]/45 bg-[linear-gradient(145deg,rgba(6,18,48,.96),rgba(2,8,23,.96))] p-8 shadow-[0_24px_70px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/80 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 bg-[radial-gradient(circle_at_top_right,rgba(17,95,235,.24),transparent_70%)]" />
              <p className="text-sm font-semibold tracking-[0.28em] text-[#1597ff]">{panel.marker}</p>
              <h3 className="mt-8 text-[clamp(1.9rem,2.5vw,3rem)] font-semibold tracking-[-0.045em] text-white">{panel.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/68 sm:text-lg">{panel.description}</p>
              <Link href={panel.href} className="mt-9 inline-flex items-center gap-4 rounded-xl border border-[#1597ff]/85 bg-[#07142e] px-6 py-3.5 font-semibold text-white transition duration-300 hover:border-[#00F0FF] hover:bg-[#0b1c40]">
                {panel.label} <span className="text-[#00D9FF] transition group-hover:translate-x-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
