import {defineField, defineType} from 'sanity';

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({name: 'footerLogo', title: 'Footer Logo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.email()}),
    defineField({name: 'facebookUrl', title: 'Facebook URL', type: 'url'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'instagramUrl', title: 'Instagram URL', type: 'url'}),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Use {year} where the current year should appear.',
      initialValue: '© {year} Jahangirnagar University FinAnt Club. All rights reserved.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Global Footer Settings'};
    },
  },
});
