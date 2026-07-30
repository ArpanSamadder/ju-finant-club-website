import {cache} from 'react';
import {currentEventFallback} from './current-event-fallback';
import {client} from '@/sanity/lib/client';
import {urlForImage} from '@/sanity/lib/image';

export type CurrentEventLink = {
  label: string;
  href: string;
};

export type HeroArtworkSource = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

export type HomepageSettings = {
  currentEvent: CurrentEventLink | null;
  heroArtwork: {
    desktop: HeroArtworkSource | null;
    mobile: HeroArtworkSource | null;
  };
};

type CmsImage = {
  asset?: {_ref?: string};
  crop?: {top?: number; bottom?: number; left?: number; right?: number};
  hotspot?: {x?: number; y?: number; height?: number; width?: number};
  width?: number;
  height?: number;
};

type CmsHomepageSettings = {
  _id?: string;
  event?: {
    title?: string;
    navigationUrl?: string;
  };
  desktopHeroArtwork?: CmsImage;
  mobileHeroArtwork?: CmsImage;
};

function isSafeNavigationHref(href: string) {
  return href.startsWith('/') || href.startsWith('https://');
}

function getBootstrapCurrentEvent(): CurrentEventLink | null {
  if (!currentEventFallback.enabled || !isSafeNavigationHref(currentEventFallback.href)) return null;

  return {
    label: currentEventFallback.label,
    href: currentEventFallback.href,
  };
}

function buildArtworkSource(image: CmsImage | undefined, requestedWidths: number[]): HeroArtworkSource | null {
  const sourceWidth = Math.round(image?.width ?? 0);
  const sourceHeight = Math.round(image?.height ?? 0);

  if (!image?.asset?._ref || sourceWidth <= 0 || sourceHeight <= 0) return null;

  const cappedOriginalWidth = Math.min(sourceWidth, 2400);
  const widths = Array.from(
    new Set([
      ...requestedWidths.filter((width) => width > 0 && width <= cappedOriginalWidth),
      cappedOriginalWidth,
    ])
  ).sort((a, b) => a - b);

  const urlForWidth = (width: number) =>
    urlForImage(image)
      .width(width)
      .quality(88)
      .auto('format')
      .url();

  return {
    src: urlForWidth(widths[widths.length - 1]),
    srcSet: widths.map((width) => `${urlForWidth(width)} ${width}w`).join(', '),
    width: sourceWidth,
    height: sourceHeight,
  };
}

export const getHomepageSettings = cache(async (): Promise<HomepageSettings> => {
  try {
    const settings = await client.fetch<CmsHomepageSettings | null>(
      `*[_type == "currentEventSettings" && _id == "currentEventSettings"][0] {
        _id,
        "event": event->{title, navigationUrl},
        "desktopHeroArtwork": desktopHeroArtwork {
          asset,
          crop,
          hotspot,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        },
        "mobileHeroArtwork": mobileHeroArtwork {
          asset,
          crop,
          hotspot,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      }`,
      {},
      {next: {revalidate: 60}}
    );

    let currentEvent: CurrentEventLink | null;

    if (!settings?._id) {
      currentEvent = getBootstrapCurrentEvent();
    } else if (
      settings.event?.title?.trim() &&
      settings.event.navigationUrl?.trim() &&
      isSafeNavigationHref(settings.event.navigationUrl.trim())
    ) {
      currentEvent = {
        label: settings.event.title.trim(),
        href: settings.event.navigationUrl.trim(),
      };
    } else {
      currentEvent = null;
    }

    return {
      currentEvent,
      heroArtwork: {
        desktop: buildArtworkSource(settings?.desktopHeroArtwork, [1024, 1280, 1440, 1600, 1996]),
        mobile: buildArtworkSource(settings?.mobileHeroArtwork, [360, 390, 430, 640, 768, 941]),
      },
    };
  } catch {
    return {
      currentEvent: getBootstrapCurrentEvent(),
      heroArtwork: {
        desktop: null,
        mobile: null,
      },
    };
  }
});
