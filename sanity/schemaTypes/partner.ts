import { defineField, defineType } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Sponsors & Partners',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Organization Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'type', title: 'Partner Type', type: 'string', options: { list: ['Sponsor', 'Strategic Partner', 'Academic Partner', 'Media Partner', 'Club Collaboration', 'Corporate Advisor Organization'] } }),
    defineField({ name: 'tier', title: 'Tier / Segment', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false })
  ]
});
