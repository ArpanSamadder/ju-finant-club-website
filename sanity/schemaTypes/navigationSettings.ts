import {defineField, defineType} from 'sanity';

export const navigationSettings = defineType({
  name: 'navigationSettings',
  title: 'Current Event',
  type: 'document',
  fields: [
    defineField({
      name: 'currentEvent',
      title: 'Current Event',
      type: 'reference',
      description:
        'Select one published event for the dynamic navbar slot. Clear this field to hide the event item.',
      to: [{type: 'event'}],
      options: {
        filter: '!(_id in path("drafts.**"))',
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Current Event',
        subtitle: 'Global navbar selection',
      };
    },
  },
});
