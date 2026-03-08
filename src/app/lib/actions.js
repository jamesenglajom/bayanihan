"use server";

import { signIn, signOut, createUser } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(prevState, formData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { error: "Please enter both username and password." };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      // Change this to false if you want to control the flow,
      // or keep it true but ensure the catch block re-throws it.
      redirect: true,
      redirectTo: "/admin",
    });
  } catch (error) {
    // 1. If it's a redirect, we MUST let it happen.
    // Next.js uses errors to trigger redirects.
    if (
      error.message?.includes("NEXT_REDIRECT") ||
      error.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    // 2. Handle specific Auth.js errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid username or password." };
        default:
          return { error: "Something went wrong with the login." };
      }
    }

    // 3. Fallback for everything else
    return { error: "Internal server error. Please try again." };
  }
}

export async function handleLogout() {
  await signOut({ redirectTo: "/login" });
}
