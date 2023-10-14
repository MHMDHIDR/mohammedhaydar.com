import { createClient, groq } from 'next-sanity'
import clientConfig from '@/sanity/config/client-config'
import type {
  informationProps,
  skillsProps,
  servicesProps,
  Project,
  ProjectFiltersProps,
  WorkEducationProps,
  BlogProps,
  getPreviousAndNextBlogsProps
} from '@/types'
import { ITEMS_PER_RENDER } from '@/constants'

export async function getInformation(): Promise<informationProps> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "information"][0]{
      firstName,
      lastName,
      fullName,
      thumbImage,
      largeImage,
      bio,
      age,
      nationality,
      languages,
      address,
      freelance,
      socialAddress,
      phoneNumbers,
      emailAddress,
      resumeLink
    }`
  )
}

export async function getTechskills(): Promise<skillsProps[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "skills"]{
      id,
      title,
      skills,
      percentage
    }`
  )
}

export async function getServices(): Promise<servicesProps[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "services"]{
      id,
      title,
      text,
      icon
    }`
  )
}

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      title,
      subtitle,
      "slug": slug.current,
      "coverimage": coverimage,
      "imagegallery": imagegallery,
      "videogallery": videogallery,
      url,
      github,
      filter,
      description
    }`
  )
}

export async function getFilters(): Promise<ProjectFiltersProps[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "projectFilters"]{
      _id,
      title,
      value
    }`
  )
}

export async function getAllBlogs(
  pageNumber: number
): Promise<{ blogs: BlogProps[]; total: number }> {
  const limit = ITEMS_PER_RENDER * 3 // Number of blogs per page
  const offset = (pageNumber - 1) * limit

  const blogs: BlogProps[] = await createClient(clientConfig).fetch(
    groq`*[_type == "blogs"]{
        _id,
        _createdAt,
        title,
        'slug': slug.current,
        'category': category[]->title,
        'cover': cover.asset->url,
        'thumb': thumb.asset->url,
        content
    }[${offset}...${offset + limit}]` // Fetch blogs for the current page
  )

  const total: number = await createClient(clientConfig).fetch(
    groq`count(*[_type == "blogs"])` // Fetch the total count of blogs
  )

  return {
    blogs: blogs.map(blog => ({
      ...blog,
      slug: blog.slug || '',
      category: blog.category || []
    })),
    total
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogProps | null> {
  const blog = await createClient(clientConfig).fetch(
    groq`*[_type == "blogs" && slug.current == $slug]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'category': category[]->title,
      'cover': cover.asset->url,
      'thumb': thumb.asset->url,
      content,
      'comments': *[_type == "comment" && references(^._id)]{
        _id,
        name,
        email,
        comment,
        _createdAt,
        approved
      }
    }`,
    { slug }
  )

  if (blog.length === 0) {
    return null // No blog post found with the given slug
  }

  const singleBlog = blog[0]

  return {
    ...singleBlog,
    slug: singleBlog.slug || '',
    category: singleBlog.category || []
  }
}

export async function getPreviousAndNextBlogs(
  slug: string
): Promise<getPreviousAndNextBlogsProps> {
  const blogs: BlogProps[] = await createClient(clientConfig).fetch(
    groq`*[_type == "blogs"] | order(_createdAt desc) {
      'slug': slug.current,
      title
    }`
  )

  let previousSlug: string | null = null
  let previousTitle: string | null = null
  let nextSlug: string | null = null
  let nextTitle: string | null = null
  const currentBlogIndex = blogs.findIndex(blog => blog.slug === slug)

  if (currentBlogIndex > 0) {
    previousSlug = blogs[currentBlogIndex - 1].slug
    previousTitle = blogs[currentBlogIndex - 1].title
  }
  if (currentBlogIndex < blogs.length - 1) {
    nextSlug = blogs[currentBlogIndex + 1].slug
    nextTitle = blogs[currentBlogIndex + 1].title
  }

  return { previous: { previousSlug, previousTitle }, next: { nextSlug, nextTitle } }
}

export async function getEducationBackground(): Promise<WorkEducationProps[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "educationbackground"]{
      id,
      title,
      meta,
      text,
      year
    }`
  )
}

export async function getJobExperience(): Promise<WorkEducationProps[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "jobExperience"]{
      id,
      title,
      meta,
      link,
      text,
      year
    }`
  )
}
