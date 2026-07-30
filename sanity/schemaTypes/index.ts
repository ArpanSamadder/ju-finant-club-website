import {event} from './event';
import {footerSettings} from './footerSettings';
import {galleryItem} from './galleryItem';
import {homepageClosingCta} from './homepageClosingCta';
import {legacyEvent} from './legacyEvent';
import {navigationSettings} from './navigationSettings';
import {partner} from './partner';
import {person} from './person';
import {post} from './post';
import {voiceOfFinant} from './voiceOfFinant';

export const schemaTypes = [
  event,
  legacyEvent,
  voiceOfFinant,
  partner,
  homepageClosingCta,
  person,
  navigationSettings,
  footerSettings,
  post,
  galleryItem,
];
