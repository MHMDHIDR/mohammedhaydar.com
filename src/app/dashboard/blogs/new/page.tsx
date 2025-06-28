"use client";

import { BlogEditor } from "@/components/blog-editor";
import { createPost } from "./actions";
import { updatePostContent } from "../actions";
import { useRouter } from "next/navigation";

export default function NewBlogPost() {
  const router = useRouter();

  const handleSubmit = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    try {
      const newPostId = await createPost();
      await updatePostContent(newPostId, title, content);
      router.push(`/dashboard/blogs/${newPostId}`);
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Create New Blog Post</h1>
      <BlogEditor onSubmit={handleSubmit} submitButtonText="Create Post" />
    </div>
  );
}
