import {LegacyCarousel, type LegacyItem} from '@/components/legacy-carousel';
import {client} from '@/sanity/lib/client';

type LegacyCmsItem = {
  _id?: string;
  title?: string;
  mainImageUrl?: string;
  eventLogoUrl?: string;
};

const approvedLegacyItems: LegacyItem[] = [
  {
    id: 'biztigation',
    title: 'Biztigation',
    subtitle: 'Business Case Competition',
    icon: 'trophy',
  },
  {
    id: 'crackademy',
    title: 'Crackademy',
    subtitle: 'Case Solving Bootcamp',
    icon: 'academy',
  },
  {
    id: 'finance-fest',
    title: 'Finance Fest',
    subtitle: 'Flagship Departmental Festival',
    icon: 'festival',
  },
  {
    id: 'panel-discussion',
    title: 'Panel Discussion',
    subtitle: 'Learning from Industry Leaders',
    icon: 'people',
  },
  {
    id: 'job-fair',
    title: 'Job Fair',
    subtitle: 'Industry & Career Engagement',
    icon: 'briefcase',
  },
];

function normalizeTitle(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function matchApprovedItem(title: string) {
  const normalized = normalizeTitle(title);

  return approvedLegacyItems.find((item) => {
    const approved = normalizeTitle(item.title);
    return normalized === approved || normalized.includes(approved) || approved.includes(normalized);
  });
}

async function getLegacyItems(): Promise<LegacyItem[]> {
  try {
    const cmsItems = await client.fetch<LegacyCmsItem[]>(
      `*[_type == "legacyEvent" && defined(title) && coalesce(isActive, true) == true] | order(displayOrder asc, _createdAt desc) {
        _id,
        title,
        "mainImageUrl": mainImage.asset->url,
        "eventLogoUrl": eventLogo.asset->url
      }`,
      {},
      {next: {revalidate: 60}}
    );

    const used = new Set<string>();
    const merged: LegacyItem[] = [];

    for (const cmsItem of cmsItems) {
      if (!cmsItem.title) continue;
      const approved = matchApprovedItem(cmsItem.title);
      if (!approved || used.has(approved.id)) continue;

      used.add(approved.id);
      merged.push({
        ...approved,
        id: cmsItem._id ?? approved.id,
        imageUrl: cmsItem.mainImageUrl,
        logoUrl: cmsItem.eventLogoUrl,
      });
    }

    for (const approved of approvedLegacyItems) {
      if (!used.has(approved.id)) merged.push(approved);
    }

    return merged;
  } catch {
    return approvedLegacyItems;
  }
}

export async function LegacySection() {
  const items = await getLegacyItems();
  return <LegacyCarousel items={items} />;
}
