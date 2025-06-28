"use client";

import { BlogEditor } from "@/components/blog-editor";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { editPost } from "./actions";
import { updatePostContent } from "../actions";

export default function EditBlogPost() {
  const { postId } = useParams<{ postId: string }>() as { postId: string };
  const router = useRouter();
  const { data: post, isLoading } = api.posts.getPostById.useQuery({ postId });

  const handleSubmit = async ({
    title,
    content,
    published,
  }: {
    title: string;
    content: string;
    published: boolean;
  }) => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("published", published ? "true" : "false");

      // Update post
      const editedPostId = await editPost(formData, postId);
      await updatePostContent(editedPostId, title, content, published);

      router.push(`/dashboard/blogs/${editedPostId}`);
    } catch (error) {
      console.error("Error editing post", error);
    }
  };

  if (isLoading || !post) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl pt-10 pb-20">
      <h1 className="mb-8 text-3xl font-bold">Edit Blog Post</h1>
      <BlogEditor
        initialContent={post.content}
        initialTitle={post.title}
        onSubmit={handleSubmit}
        submitButtonText="Update Post"
        postId={postId}
        isPublished={post.published}
      />
    </div>
  );
}
