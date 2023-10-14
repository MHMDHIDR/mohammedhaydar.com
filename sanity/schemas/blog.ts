import { createSlug } from '@/lib'

export default {
  name: 'blogs',
  title: 'Blogs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // Adjust the maximum length as needed
        slugify: (input: string) => createSlug(input)
      },
      validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogsCategories' }] }],
      validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {
        hotspot: true // Enables hotspot for image cropping
      },
      validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
      name: 'thumb',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true // Enables hotspot for image cropping
      },
      validation: (Rule: { required: () => any }) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule: { required: () => any }) => Rule.required()
    }
  ]
}
