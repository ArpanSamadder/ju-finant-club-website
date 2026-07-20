import {defineField, defineType} from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Partner & Collaborator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
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
      description: 'Turn off to hide this partner from the Homepage.',
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
      title: 'name',
      media: 'logo',
      isActive: 'isActive',
    },
    prepare({title, media, isActive}) {
      return {
        title: title || 'Unnamed partner',
        subtitle: isActive === false ? 'Hidden from Homepage' : 'Visible on Homepage',
        media,
      };
    },
  },
});
