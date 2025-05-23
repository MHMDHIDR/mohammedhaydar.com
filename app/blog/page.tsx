import { BlogLayout } from '@/app/components/blog-layout'
import { BlogPostCard } from '@/components/Card'
import { SITE } from '@/constants'
import { getBlogPosts } from '@/app/data-access/posts/get-posts'
import BlogPagination from './blog-pagination'
import { PaginationResult } from '@/lib/pagination'

export const metadata = {
  title: 'Blog | Mohammed Haydar',
  description: 'Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚',
}

export const dynamic = 'auto'
export const revalidate = 86400

export async function generateStaticParams() {
  // Pre-render the first 10 pages
  return Array.from({ length: 10 }, (_, i) => ({
    searchParams: { page: String(i + 1), limit: String(SITE.postPerPage) },
  }))
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const urlSearchParams = new URLSearchParams()
  urlSearchParams.set('page', String(params?.page ?? 1))
  urlSearchParams.set('limit', String(params?.limit ?? SITE.postPerPage))

  const { posts: allBlogs, pagination: paginationInfo } = await getBlogPosts({
    isPublished: true,
    searchParams: urlSearchParams,
  })

  return (
    <BlogLayout
      pageTitle='Posts'
      pageDesc='Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚'
    >
      <ul>
        {allBlogs.map(post => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            publishedAt={String(post.publishedAt) || 'Unknown Date'}
          />
        ))}
      </ul>

      <BlogPagination paginationInfo={paginationInfo as PaginationResult} />
    </BlogLayout>
  )
}
