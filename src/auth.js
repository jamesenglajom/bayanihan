import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { supabase } from "@/app/lib/supabase";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) return null;

          const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("username", credentials.username)
            .maybeSingle();

          if (!user || !user.password) return null;

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isMatch) return null;

          return {
            id: user.id.toString(),
            username: user.username,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore - If using TypeScript, you'll need to augment the Session type
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});


export const createUser = async(username, plainPassword) =>  {
  // 1. Generate a salt and hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  // 2. Prepare the user row
  const newUser = {
    id: Date.now(), // Or a UUID
    username: username.toLowerCase(),
    password: hashedPassword, // Store the HASH, not the plain text
    role: "user",
  };

  // 3. Save to Supabase
  const { error } = await supabase.from("users").insert(newUser);
  if (error) throw new Error(error.message);

  return { success: true };
}

export const generateHash = async(plainPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}