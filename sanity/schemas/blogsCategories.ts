const blogsCategories = {
  name: 'blogsCategories',
  title: 'Blog Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}

export default blogsCategories
