import { getBlogPosts } from '@/app/data-access/posts/get-posts'

export const baseUrl = 'https://mohammedhaydar.com'

export default async function sitemap() {
  const { posts } = await getBlogPosts()
  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }))

  const routes = ['', '/blog', '/projects', '/resume', '/services', '/contact'].map(
    route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )

  return [...routes, ...postUrls]
}
