import { createClient, type ClientConfig } from '@sanity/client'

const config: ClientConfig = {
  projectId: 'nnrx9w3l',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
  apiVersion: '2023-05-03'
}
export const client = createClient(config)
