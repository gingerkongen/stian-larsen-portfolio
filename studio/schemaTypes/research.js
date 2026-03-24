import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 4}),
    defineField({
      name: 'areas',
      title: 'Research Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', type: 'string', title: 'Icon (emoji)'}),
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'description', type: 'text', title: 'Description'}),
          ],
        },
      ],
    }),
  ],
})
