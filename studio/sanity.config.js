import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['hero', 'about', 'research', 'publications', 'coaching', 'speaking', 'contact'])

const singletonItems = [
  {type: 'hero', title: 'Hero'},
  {type: 'about', title: 'About'},
  {type: 'research', title: 'Research'},
  {type: 'publications', title: 'Publications'},
  {type: 'coaching', title: 'Coaching & Education'},
  {type: 'speaking', title: 'Speaking'},
  {type: 'contact', title: 'Contact'},
]

export default defineConfig({
  name: 'default',
  title: 'Stian Larsen Portfolio',

  projectId: '9wvm16ml',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items(
            singletonItems.map((item) =>
              S.listItem()
                .title(item.title)
                .id(item.type)
                .child(S.document().schemaType(item.type).documentId(item.type))
            )
          ),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
})
