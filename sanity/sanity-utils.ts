import { createClient, groq } from 'next-sanity'
import clientConfig from './config/client-config'
import type {
  informationProps,
  skillsProps,
  servicesProps,
  Project,
  ProjectFiltersProps,
  WorkEducationProps,
  BlogProps
} from '@/types'

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

export async function getAllBlogs(): Promise<BlogProps[]> {
  const blogs: BlogProps[] = await createClient(clientConfig).fetch(
    groq`*[_type == "blogs"]{
        _id,
        _createdAt,
        title,
        'slug': slug.current,
        'category': category[]->title,
        cover,
        thumb,
        content
    }`
  )

  return blogs.map(blog => ({
    ...blog,
    slug: blog.slug || '',
    category: blog.category || []
  }))
}

export async function getBlogBySlug(slug: string): Promise<BlogProps | null> {
  const blog = await createClient(clientConfig).fetch(
    groq`*[_type == "blogs" && slug.current == $slug]{
        _id,
        _createdAt,
        title,
        'slug': slug.current,
        'category': category[]->title,
        cover,
        thumb,
        content
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
