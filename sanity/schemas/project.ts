export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'coverimage',
      title: 'Cover Image',
      type: 'string'
    },
    {
      name: 'imagegallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'videogallery',
      title: 'Video Gallery',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url'
    },
    {
      name: 'github',
      title: 'Github',
      type: 'url'
    },
    {
      name: 'filter',
      title: 'Filter',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'projectFilters' }] }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional: Add a description for the project.'
    }
  ]
}
