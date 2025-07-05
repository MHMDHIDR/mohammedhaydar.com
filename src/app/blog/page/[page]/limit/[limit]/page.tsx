import { BlogLayout } from "@/app/components/blog-layout";
import { BlogPostCard } from "@/components/Card";
import { SITE } from "@/constants";
import { getBlogPosts } from "@/app/data-access/posts/get-posts";
import BlogPagination from "@/app/blog/blog-pagination";
import { generateMetadata } from "@/app/seo";
import { notFound } from "next/navigation";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚",
});

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateStaticParams() {
  // Pre-render first 20 pages for limits 5, 10, 20
  const limits = [5, 10, 20];
  const { count } = await getBlogPosts();
  return limits.flatMap((limit) => {
    const totalPages = Math.ceil(count / limit);
    return Array.from({ length: Math.min(totalPages, 20) }, (_, i) => ({
      page: String(i + 1),
      limit: String(limit),
    }));
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string; limit: string }>;
}) {
  // Validate and parse params
  const { page: pageNumber, limit: pageLimit } = await params;
  let page = parseInt(pageNumber, 10);
  let limit = parseInt(pageLimit, 10);
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = SITE.postPerPage;

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set("page", String(page));
  urlSearchParams.set("limit", String(limit));

  const { posts: allBlogs, pagination: paginationInfo } = await getBlogPosts({
    isPublished: true,
    searchParams: urlSearchParams,
  });

  if (!allBlogs || allBlogs.length === 0) notFound();

  return (
    <BlogLayout pageTitle="Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚">
      <ul>
        {allBlogs.map((post) => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            publishedAt={String(post.publishedAt) || "Unknown Date"}
          />
        ))}
      </ul>
      <BlogPagination
        paginationInfo={paginationInfo}
        currentPage={page}
        currentLimit={limit}
      />
    </BlogLayout>
  );
}
