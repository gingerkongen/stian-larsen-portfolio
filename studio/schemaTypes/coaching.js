import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'coaching',
  title: 'Coaching & Education',
  type: 'document',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'description', type: 'text', title: 'Description'}),
            defineField({name: 'linkText', type: 'string', title: 'Link Text (optional)'}),
            defineField({name: 'linkUrl', type: 'url', title: 'Link URL (optional)'}),
          ],
        },
      ],
    }),
  ],
})
