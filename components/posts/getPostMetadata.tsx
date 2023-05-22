import fs from 'fs'
import matter from 'gray-matter'
import { BlogPostProps } from '@/types'

const getPostMetadata = (): BlogPostProps[] => {
  const folder = 'posts/'
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter(file => file.endsWith('.md'))

  // Get gray-matter data from each file.
  const posts = markdownPosts.map(fileName => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, 'utf8')
    const matterResult = matter(fileContents)
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
      thumb: matterResult.data.thumb,
      slug: fileName.replace('.md', '')
    }
  })

  return posts
}

export default getPostMetadata
