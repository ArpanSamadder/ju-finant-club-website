import { defineField, defineType } from 'sanity';

export const person = defineType({
  name: 'person',
  title: 'People',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Display Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'group', title: 'Group', type: 'string', options: { list: ['Governing Body', 'Senior Executive Board', 'Corporate Advisory Board', 'Faculty Advisor', 'Alumni'] } }),
    defineField({ name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
});
