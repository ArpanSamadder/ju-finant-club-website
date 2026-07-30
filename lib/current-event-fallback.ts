/**
 * Temporary bootstrap used only until the Current Event singleton exists in Sanity.
 * Once the singleton exists, an empty event reference intentionally hides the CTA.
 */
export const currentEventFallback = {
  enabled: true,
  label: 'Biztigation 2.0',
  href: '/biztigation',
} as const;
