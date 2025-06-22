"use server";

import { auth } from "@/server/auth";
import { db } from "@/prisma";
import { AuthError } from "next-auth";
import { slugify } from "@/lib/slugify";
import { type posts } from "@prisma/client";

export async function updatePostContent(
  postId: posts["id"],
  title: posts["title"],
  content: posts["content"],
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    throw new AuthError("Unauthorized");
  }

  try {
    const updatedPost = await db.posts.update({
      where: { id: postId, authorId: user.id },
      data: { content, title, slug: slugify(title), published: true },
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post", error);
    throw new Error("Error updating post");
  }
}
