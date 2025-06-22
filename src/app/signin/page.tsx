import { auth } from "@/server/auth";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { handleSignIn } from "./actions";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    redirect("/");
  }

  return (
    <form
      action={handleSignIn as unknown as string}
      className="my-80 grid place-items-center"
    >
      <button
        type="submit"
        className="flex gap-x-2.5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        <IconBrandGoogleFilled className="h-6 w-6" />
        Sign in with Google
      </button>
    </form>
  );
}
