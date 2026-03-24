import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({name: 'lead', title: 'Lead Paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'degree', type: 'string', title: 'Degree'}),
            defineField({name: 'school', type: 'string', title: 'School / Details'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Certification Title'}),
          ],
        },
      ],
    }),
  ],
})
