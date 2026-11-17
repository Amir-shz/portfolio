// Edge-safe part of the NextAuth setup (no database code), shared by the
// route guard (src/proxy.ts) and by src/auth.ts, which adds the Credentials provider.
import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [],

  trustHost: true,

  callbacks: {
    // for authorization in the route guard (src/proxy.ts)
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
  logger: {
    error(error) {
      // A wrong password or a locked account is an expected result, not a
      // server fault, so Auth.js's red stack trace is skipped for it. Real
      // failures inside authorize() are logged in src/auth.ts.
      if ((error as { type?: string }).type === "CredentialsSignin") return;
      console.error("[auth][error]", error);
    },
  },
  // Prefer AUTH_SECRET (server-only). NEXT_PUBLIC_* variables can be inlined
  // into browser bundles, so the old name is kept only as a fallback until
  // the env variable is renamed everywhere (local .env and Liara).
  secret: process.env.AUTH_SECRET ?? process.env.NEXT_PUBLIC_AUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;
