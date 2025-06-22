import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format-date";
import { baseUrl } from "@/app/sitemap";
import type { Metadata } from "next";
import { getPostBySlug } from "@/app/data-access/posts/get-post-bySlug";
import { BlogLayout } from "@/app/components/blog-layout";
import GoBackbtn from "@/app/components/go-back-btn";
import { auth } from "@/server/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/app/data-access/posts/get-posts";
import { SyntaxHighlighter } from "@/app/components/syntax-highlighter";

export async function generateStaticParams() {
  const { posts } = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug({ slug });
  if (!post) return {};

  const { title, publishedAt } = post;

  return {
    title,
    description: title,
    openGraph: {
      title,
      description: title,
      type: "article",
      publishedTime: String(new Date(publishedAt!.toISOString())),
      url: `${baseUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title,
    },
  };
}

export const dynamic = "force-static";
export const revalidate = 86400;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const { slug } = await params;
  const post = await getPostBySlug({ slug });

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-4xl justify-between px-4 py-16">
        <GoBackbtn />
        {session && (
          <Link
            href={`/dashboard/blogs/${post.id}`}
            className="focus-outline group mt-4 mb-2 flex px-0 hover:opacity-75"
          >
            <Button>Edit</Button>
          </Link>
        )}
      </div>
      <BlogLayout pageTitle={post.title}>
        <div className="mt-2 mb-8 flex items-center justify-between text-sm">
          <span className="text-neutral-900 dark:text-neutral-400">
            {formatDate(String(post.publishedAt))}
          </span>
        </div>

        <SyntaxHighlighter content={post.content} />
      </BlogLayout>
    </>
  );
}
