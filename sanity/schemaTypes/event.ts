import {defineField, defineType} from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Event Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({
      name: 'navigationUrl',
      title: 'Website URL',
      type: 'string',
      description: 'Existing website route used when this event is selected as Current Event, for example /biztigation.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          return value.startsWith('/') || value.startsWith('https://')
            ? true
            : 'Use an existing relative route beginning with / or a full https:// URL.';
        }),
    }),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
    defineField({name: 'summary', title: 'Summary', type: 'text'}),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'featured', title: 'Featured Event', type: 'boolean', initialValue: false}),
  ],
});
