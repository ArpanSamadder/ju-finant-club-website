import {client} from '@/sanity/lib/client';

export type CurrentEventNavItem = {
  label: string;
  href: string;
};

type CurrentEventQueryResult = {
  label?: string | null;
  href?: string | null;
};

const currentEventQuery = `*[_id == "navigationSettings"][0]{
  "label": currentEvent->title,
  "href": currentEvent->navigationUrl
}`;

function normalizeInternalHref(value: string | null | undefined) {
  const href = value?.trim();

  if (!href || !href.startsWith('/') || href.startsWith('//')) return null;
  return href;
}

function getDevelopmentPreviewEvent(): CurrentEventNavItem | null {
  if (process.env.NODE_ENV === 'production') return null;

  const label = process.env.NAVBAR_PREVIEW_EVENT_LABEL?.trim();
  const href = normalizeInternalHref(process.env.NAVBAR_PREVIEW_EVENT_URL);

  if (!label || !href) return null;
  return {label, href};
}

export async function getCurrentEventNavItem(): Promise<CurrentEventNavItem | null> {
  const previewEvent = getDevelopmentPreviewEvent();
  if (previewEvent) return previewEvent;

  try {
    const result = await client.fetch<CurrentEventQueryResult | null>(
      currentEventQuery,
      {},
      {next: {revalidate: 60}}
    );

    const label = result?.label?.trim();
    const href = normalizeInternalHref(result?.href);

    if (!label || !href) return null;

    return {label, href};
  } catch {
    return null;
  }
}
