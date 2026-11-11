import { signInSchema } from "@/lib/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          const parsed = await signInSchema.safeParseAsync(credentials);
          if (!parsed.success) return null;

          const { email, password } = parsed.data;

          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          });

          if (!res.ok) return null;

          const user = (await res.json())?.data;
          if (!user?.id) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  trustHost: true,

  callbacks: {
    // for authorization in middleware
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
    jwt: async ({ token, user }) => {
      // `user` is only present right after sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        if (typeof token.id === "string") session.user.id = token.id;
        if (typeof token.role === "string") session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24h
  },

  jwt: {
    maxAge: 24 * 60 * 60, // 24h
  },
  pages: {
    signIn: "/login",
  },
  // Prefer AUTH_SECRET (server-only). NEXT_PUBLIC_* variables can be inlined
  // into browser bundles, so the old name is kept only as a fallback until
  // the env variable is renamed everywhere (local .env and Liara).
  secret: process.env.AUTH_SECRET ?? process.env.NEXT_PUBLIC_AUTH_SECRET,
});
