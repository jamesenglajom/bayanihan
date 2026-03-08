import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { redis } from "@/app/lib/upstash";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: UpstashRedisAdapter(redis),
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

          // Log this to see if Upstash is responding
          const result = await redis.get(`user:${credentials.username}`);
          const user = typeof result === "string" ? JSON.parse(result) : result;

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

  // 2. Prepare the user object
  const newUser = {
    id: Date.now(), // Or a UUID
    username: username.toLowerCase(),
    password: hashedPassword, // Store the HASH, not the plain text
    role: "user",
    createdAt: new Date().toISOString(),
  };

  // 3. Save to Redis
  // Key format: user:username
  await redis.set(`user:${newUser.username}`, JSON.stringify(newUser));
  
  return { success: true };
}