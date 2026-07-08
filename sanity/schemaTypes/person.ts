import {defineField, defineType} from 'sanity';

const peopleGroups = [
  {title: 'Governing Body', value: 'Governing Body'},
  {title: 'Senior Executive Board', value: 'Senior Executive Board'},
  {title: 'Faculty Advisory Panel', value: 'Faculty Advisory Panel'},
  {title: 'Corporate Advisory Panel', value: 'Corporate Advisory Panel'},
];

export const person = defineType({
  name: 'person',
  title: 'People Directory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'Examples: President, General Secretary, Professor, Corporate Advisor.',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'company',
      title: 'Company / Institution',
      type: 'string',
      description: 'Required for advisor profiles; optional for club leadership.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'group',
      title: 'Directory Group',
      type: 'string',
      options: {
        list: peopleGroups,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first inside the selected group.',
      initialValue: 100,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'role',
      title: 'Legacy Role Field',
      type: 'string',
      hidden: true,
      readOnly: true,
      description: 'Deprecated field retained for backward compatibility.',
    }),
  ],
  orderings: [
    {
      title: 'Group, then display order',
      name: 'groupOrder',
      by: [
        {field: 'group', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      designation: 'designation',
      legacyRole: 'role',
      group: 'group',
      media: 'profileImage',
    },
    prepare({title, designation, legacyRole, group, media}) {
      return {
        title: title || 'Unnamed person',
        subtitle: [designation || legacyRole, group].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
