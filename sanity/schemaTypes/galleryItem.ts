import { defineField, defineType } from 'sanity';

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'eventName', title: 'Event Name', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption', type: 'text' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false })
  ]
});
