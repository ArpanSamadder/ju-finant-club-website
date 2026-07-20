import {defineField, defineType} from 'sanity';

export const homepageClosingCta = defineType({
  name: 'homepageClosingCta',
  title: 'Closing CTA',
  type: 'document',
  fields: [
    defineField({name: 'sectionEyebrow', title: 'Section Eyebrow', type: 'string', initialValue: 'BUILD WITH FINANT', validation: (rule) => rule.required()}),
    defineField({name: 'sectionHeadline', title: 'Section Headline', type: 'string', initialValue: 'Build the Future with FinAnt', validation: (rule) => rule.required()}),
    defineField({name: 'studentTitle', title: 'Student Title', type: 'string', initialValue: 'For Students', validation: (rule) => rule.required()}),
    defineField({name: 'studentDescription', title: 'Student Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'studentButtonLabel', title: 'Student Button Label', type: 'string', initialValue: 'Join FinAnt', validation: (rule) => rule.required()}),
    defineField({name: 'studentButtonLink', title: 'Student Button Link', type: 'string', initialValue: '/join-us', validation: (rule) => rule.required()}),
    defineField({name: 'organisationTitle', title: 'Organisation Title', type: 'string', initialValue: 'For Organisations', validation: (rule) => rule.required()}),
    defineField({name: 'organisationDescription', title: 'Organisation Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'organisationButtonLabel', title: 'Organisation Button Label', type: 'string', initialValue: 'Partner With Us', validation: (rule) => rule.required()}),
    defineField({name: 'organisationButtonLink', title: 'Organisation Button Link', type: 'string', initialValue: '/partner-with-us', validation: (rule) => rule.required()}),
    defineField({name: 'isActive', title: 'Active / Hidden', type: 'boolean', initialValue: true}),
  ],
  preview: {
    select: {title: 'sectionHeadline', isActive: 'isActive'},
    prepare({title, isActive}) {
      return {title: title || 'Homepage Closing CTA', subtitle: isActive === false ? 'Hidden' : 'Visible on Homepage'};
    },
  },
});
