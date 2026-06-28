import {defineField, defineType} from 'sanity';

export const legacyEvent = defineType({
  name: 'legacyEvent',
  title: 'Legacy Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Card Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'eventLogo',
      title: 'Event Logo / Badge',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'eventUrl',
      title: 'Optional Event Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'eventLogo',
    },
    prepare({title, year, media}) {
      return {
        title,
        subtitle: year ? `Legacy Event • ${year}` : 'Legacy Event',
        media,
      };
    },
  },
});
