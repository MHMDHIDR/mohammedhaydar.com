import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { env } from "@/env";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [Google],
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user }) {
      if (user.email !== env.ADMIN_EMAIL) {
        // throw new AuthError("Unauthorized access")
        notFound();
      }
      return true;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: { signIn: "/signin", error: "/not-found" },
} satisfies NextAuthConfig;
