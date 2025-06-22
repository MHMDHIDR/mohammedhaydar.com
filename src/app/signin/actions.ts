"use server";

import { signIn } from "@/server/auth";

export async function handleSignIn() {
  return signIn("google", { redirectTo: "/dashboard/blogs" });
}
