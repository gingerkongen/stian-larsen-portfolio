import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 3}),
    defineField({
      name: 'links',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', type: 'string', title: 'Icon (emoji)'}),
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'handle', type: 'string', title: 'Handle / Display Text'}),
            defineField({name: 'url', type: 'url', title: 'URL'}),
          ],
        },
      ],
    }),
  ],
})
