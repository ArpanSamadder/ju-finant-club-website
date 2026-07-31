import {VoicesCarousel, type VoiceItem} from '@/components/voices-carousel';
import {client} from '@/sanity/lib/client';

type VoiceCmsItem = {
  _id?: string;
  name?: string;
  role?: string;
  organisation?: string;
  quote?: string;
  photoUrl?: string;
};

const arpanFallback: VoiceItem = {
  id: 'arpan-samadder',
  name: 'Arpan Samadder',
  role: 'President',
  organisation: 'Jahangirnagar University FinAnt Club',
  quote: 'FinAnt exists to develop capable people, not simply arrange events. We are building leaders, systems, and standards that continue creating value beyond any single committee.',
  embeddedPortrait: true,
};

async function getVoiceItems(): Promise<VoiceItem[]> {
  try {
    const cmsItems = await client.fetch<VoiceCmsItem[]>(
      `*[_type == "voiceOfFinant" && defined(name) && defined(statement) && coalesce(isActive, true) == true] | order(displayOrder asc, _createdAt desc) {
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

    const realItems = cmsItems
      .filter((item) => item.name && item.quote && !item.name.toLowerCase().includes('demo'))
      .map((item): VoiceItem | null => {
        const isArpan = item.name!.toLowerCase().trim() === 'arpan samadder';
        if (!item.photoUrl && !isArpan) return null;

        return {
          id: item._id ?? item.name!,
          name: item.name!,
          role: item.role || (isArpan ? arpanFallback.role : ''),
          organisation: item.organisation || (isArpan ? arpanFallback.organisation : ''),
          quote: item.quote!,
          photoUrl: item.photoUrl,
          embeddedPortrait: isArpan && !item.photoUrl,
        };
      })
      .filter((item): item is VoiceItem => Boolean(item));

    if (!realItems.some((item) => item.name.toLowerCase() === 'arpan samadder')) {
      realItems.unshift(arpanFallback);
    }

    return realItems;
  } catch {
    return [arpanFallback];
  }
}

export async function VoicesSection() {
  const items = await getVoiceItems();
  return <VoicesCarousel items={items} />;
}
