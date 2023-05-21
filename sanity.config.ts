import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './sanity/schemas'

const config = defineConfig({
  projectId: 'nnrx9w3l',
  dataset: 'production',
  title: 'Mohammed Haydar',
  apiVersion: '2023-05-21',
  basePath: '/dashboard',
  plugins: [deskTool()],
  schema: { types: schemas }
})

export default config
