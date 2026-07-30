import {defineField, defineType} from 'sanity';

export const currentEventSettings = defineType({
  name: 'currentEventSettings',
  title: 'Current Event',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Current Event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Select the published event used in the navbar and homepage hero.',
    }),
    defineField({
      name: 'desktopHeroArtwork',
      title: 'Desktop Hero Artwork',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional desktop and tablet hero artwork. The approved static artwork is used automatically when this is empty.',
    }),
    defineField({
      name: 'mobileHeroArtwork',
      title: 'Mobile Hero Artwork',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional mobile hero artwork. The approved static mobile artwork is used automatically when this is empty.',
    }),
  ],
  preview: {
    select: {
      title: 'event.title',
      media: 'desktopHeroArtwork',
    },
    prepare({title, media}) {
      return {
        title: title || 'No Current Event selected',
        subtitle: 'Global website setting',
        media,
      };
    },
  },
});
