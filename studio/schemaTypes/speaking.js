import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'speaking',
  title: 'Speaking',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 3}),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'year', type: 'string', title: 'Year'}),
            defineField({name: 'title', type: 'string', title: 'Event Title'}),
            defineField({name: 'location', type: 'string', title: 'Location'}),
            defineField({name: 'description', type: 'text', title: 'Description'}),
            defineField({name: 'linkText', type: 'string', title: 'Link Text (optional)'}),
            defineField({name: 'linkUrl', type: 'url', title: 'Link URL (optional)'}),
          ],
        },
      ],
    }),
  ],
})
