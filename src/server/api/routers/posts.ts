import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/prisma";

export const postsRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const fetchedPost = await db.posts.findFirst({
        where: { id: input.postId },
        include: {
          author: true,
        },
      });

      return fetchedPost;
    }),

  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const fetchedPost = await db.posts.findFirst({
        where: { slug: input.slug },
        include: {
          author: true,
        },
      });

      return fetchedPost;
    }),
});
