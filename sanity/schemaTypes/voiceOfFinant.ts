import {defineField, defineType} from 'sanity';

export const voiceOfFinant = defineType({
  name: 'voiceOfFinant',
  title: 'Voice of FinAnt',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'homepageDesignation',
      title: 'Designation',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation / Institution',
      type: 'string',
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(520),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active / Hidden',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this voice from the Homepage.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'homepageDesignation',
      media: 'photo',
      isActive: 'isActive',
    },
    prepare({title, subtitle, media, isActive}) {
      return {
        title: title || 'Unnamed voice',
        subtitle: `${subtitle || 'No designation'}${isActive === false ? ' · Hidden' : ''}`,
        media,
      };
    },
  },
});
