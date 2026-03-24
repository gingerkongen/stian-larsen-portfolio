import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 3}),
    defineField({name: 'scholarUrl', title: 'Google Scholar URL', type: 'url'}),
    defineField({name: 'scholarButtonText', title: 'Scholar Button Text', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'year', type: 'string', title: 'Year'}),
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'journal', type: 'string', title: 'Journal + Citations'}),
          ],
        },
      ],
    }),
  ],
})
