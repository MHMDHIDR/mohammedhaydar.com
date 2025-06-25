import { BlogLayout } from "@/app/components/blog-layout";
import { BlogPostCard } from "@/components/Card";
import { SITE } from "@/constants";
import { getBlogPosts } from "@/app/data-access/posts/get-posts";
import BlogPagination from "./blog-pagination";
import { generateMetadata } from "@/app/seo";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚",
});

export const dynamic = "auto";
export const revalidate = 86400;

export async function generateStaticParams() {
  const { count } = await getBlogPosts();
  const totalPages = Math.ceil(count / SITE.postPerPage);

  // Pre-render all pages
  return Array.from({ length: totalPages }, (_, i) => ({
    searchParams: {
      page: String(i + 1),
      limit: String(SITE.postPerPage),
    },
  }));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set("page", String(params?.page ?? 1));
  urlSearchParams.set("limit", String(params?.limit ?? SITE.postPerPage));

  const { posts: allBlogs, pagination: paginationInfo } = await getBlogPosts({
    isPublished: true,
    searchParams: urlSearchParams,
  });

  return (
    <BlogLayout
      pageTitle="Posts"
      pageDesc="Behold, my treasure of wisdom and wonder my collection of articles! 🚀📚"
    >
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

      <BlogPagination paginationInfo={paginationInfo} />
    </BlogLayout>
  );
}
