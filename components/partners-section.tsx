import {PartnersMarquee, type PartnerItem} from '@/components/partners-marquee';
import {client} from '@/sanity/lib/client';

type PartnerCmsItem = {
  _id?: string;
  name?: string;
  logoUrl?: string;
  websiteUrl?: string;
};

async function getPartnerItems(): Promise<PartnerItem[]> {
  try {
    const cmsItems = await client.fetch<PartnerCmsItem[]>(
      `*[_type == "partner" && defined(name) && defined(logo.asset) && coalesce(isActive, true) == true] | order(displayOrder asc, _createdAt desc) {
        _id,
        name,
        "logoUrl": logo.asset->url,
        "websiteUrl": website
      }`,
      {},
      {next: {revalidate: 60}}
    );

    return cmsItems
      .filter((item) => item.name && item.logoUrl)
      .map((item) => ({
        id: item._id ?? item.name!,
        name: item.name!,
        logoUrl: item.logoUrl!,
        websiteUrl: item.websiteUrl,
      }));
  } catch {
    return [];
  }
}

export async function PartnersSection() {
  const items = await getPartnerItems();
  return <PartnersMarquee items={items} />;
}
