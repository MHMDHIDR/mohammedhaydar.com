import { createSlug } from '@/lib'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'blogs',
  title: 'Blogs',
  type: 'document',
  fields: [
    {
      name: 'articleId',
      title: 'Article ID',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required(),
      initialValue: () => uuidv4(),
      hidden: true,
      readOnly: true
    },
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
