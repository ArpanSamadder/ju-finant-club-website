import {defineField, defineType} from 'sanity';

export const legacyEvent = defineType({
  name: 'legacyEvent',
  title: 'Legacy Foundation Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'mainImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventLogo',
      title: 'Event Logo',
      type: 'image',
      options: {hotspot: true},
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
      description: 'Turn off to hide this card from the Homepage.',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'eventLogo',
      isActive: 'isActive',
    },
    prepare({title, media, isActive}) {
      return {
        title: title || 'Untitled legacy card',
        subtitle: isActive === false ? 'Hidden from Homepage' : 'Visible on Homepage',
        media,
      };
    },
  },
});
