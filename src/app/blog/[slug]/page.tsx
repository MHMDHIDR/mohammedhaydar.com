import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format-date";
import { baseUrl } from "@/app/sitemap";
import type { Metadata } from "next";
import { BlogLayout } from "@/app/components/blog-layout";
import GoBackbtn from "@/app/components/go-back-btn";
import { auth } from "@/server/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/app/data-access/posts/get-posts";
import { SyntaxHighlighter } from "@/app/components/syntax-highlighter";
import { api } from "@/trpc/server";
import { SITE, SOCIALS } from "@/constants";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateReadTime } from "@/lib/read-time";
import { ShareButtons } from "@/app/components/share-buttons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.posts.getPostBySlug({ slug });
  if (!post) return {};

  const { title, publishedAt } = post;
  const openGraphTitle = `${title} | ${SITE.title}`;

  return {
    title: openGraphTitle,
    description: title,
    openGraph: {
      title: openGraphTitle,
      description: title,
      type: "article",
      publishedTime: String(new Date(publishedAt!.toISOString())),
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: SITE.title,
      images: [SITE.socialBanner],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title,
      images: [SITE.socialBanner],
    },
  };
}

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const { posts } = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const { slug } = await params;
  const post = await api.posts.getPostBySlug({ slug });

  if (!post) {
    notFound();
  }

  // Modify the content to add draggable to images = false
  function modifyContent(content: string) {
    return content.replace(/<img/g, '<img draggable="false"');
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-4xl px-4 py-5">
        <GoBackbtn />
      </div>
      <div className="mx-auto flex w-full max-w-4xl justify-between px-4 py-0 md:py-7">
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
          <div className="flex items-center gap-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border-primary/30 hover:bg-primary/10 hover:border-primary hoverEffect flex items-center gap-x-2 rounded-full border p-2.5 text-blue-500 dark:text-blue-400">
                    <Image
                      alt={SITE.author}
                      className="size-6 rounded-full shadow shadow-blue-200"
                      height={48}
                      src={post.author.image ?? "/images/logo.svg"}
                      width={48}
                    />
                    <span className="text-sm font-semibold select-none">
                      {post.author.name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="max-w-sm rounded-lg border bg-white p-0 shadow-lg dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="relative overflow-hidden">
                    {/* Header/Banner Section */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 dark:from-blue-950/30 dark:to-indigo-950/30" />

                    <div className="relative flex flex-col gap-y-4 p-4">
                      {/* Author Info Section */}
                      <figure className="flex items-start gap-x-4">
                        <Image
                          alt={post.author.name ?? SITE.author}
                          className="size-16 rounded-full border-2 border-white shadow-md dark:border-gray-800"
                          height={64}
                          src={post.author.image ?? "/images/logo.svg"}
                          width={64}
                        />
                        <figcaption className="flex flex-col gap-y-1">
                          <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            {post.author.name ?? SITE.author}
                          </span>
                          <span className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                            {SITE.desc}
                          </span>
                        </figcaption>
                      </figure>

                      {/* Social Links Section */}
                      <div className="flex items-center gap-x-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                        {SOCIALS.filter((social) => social.active).map(
                          (social, index) => (
                            <Link
                              key={index}
                              href={social.href}
                              title={social.linkTitle}
                              className="group rounded-full bg-gray-100 p-2 transition-colors hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-blue-900/50"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <social.icon className="size-4 text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                              <span className="sr-only">
                                {social.linkTitle}
                              </span>
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-neutral-900 dark:text-neutral-400">
              {formatDate(String(post.publishedAt))}
            </span>
          </div>
          <span className="text-neutral-900 dark:text-neutral-400">
            {calculateReadTime(post.content)}
          </span>
        </div>

        <SyntaxHighlighter content={modifyContent(post.content)} />

        <div className="mt-8 text-center">
          <h3 className="mb-4 text-lg font-semibold select-none">
            {`Share "${post.title}"`}
          </h3>
          <ShareButtons
            url={`${baseUrl}/blog/${post.slug}`}
            title={post.title}
          />
        </div>
      </BlogLayout>
    </>
  );
}
