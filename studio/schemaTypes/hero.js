import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({name: 'tag', title: 'Tag Line', type: 'string'}),
    defineField({name: 'firstName', title: 'First Name', type: 'string'}),
    defineField({name: 'lastName', title: 'Last Name', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}),
    defineField({
      name: 'ctas',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'text', type: 'string', title: 'Button Text'}),
            defineField({name: 'href', type: 'string', title: 'Link (e.g. #research or https://...)'}),
            defineField({
              name: 'style',
              type: 'string',
              title: 'Style',
              options: {list: ['primary', 'secondary']},
            }),
          ],
        },
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'number', type: 'string', title: 'Number (e.g. 41+)'}),
            defineField({name: 'label', type: 'string', title: 'Label'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Hero Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'badgeText', title: 'Rotating Badge Text', type: 'string'}),
  ],
})
