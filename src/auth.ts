import { signInSchema } from "@/lib/zod";
// import User from "@/models/userModel";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/mongoose";
// import { login } from "./utils/get";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // await dbConnect();

          const user = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          })
            .then((data) => data.json())
            .then((data) => data.data);

          // const user = await login({ email, password });

          if (!user) {
            throw new Error("Invalid credentials.");
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // for authorization in middleware
    authorized: async ({ auth }) => {
      return !!auth?.user;
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
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});
