import {defineField, defineType} from 'sanity';

export const currentEventSettings = defineType({
  name: 'currentEventSettings',
  title: 'Current Event',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Current Event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Select the published event used in the navbar and homepage hero.',
    }),
  ],
  preview: {
    select: {
      title: 'event.title',
    },
    prepare({title}) {
      return {
        title: title || 'No Current Event selected',
        subtitle: 'Global website setting',
      };
    },
  },
});
