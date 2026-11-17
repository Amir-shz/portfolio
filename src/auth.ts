import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { verifyCredentials } from "@/lib/credentials";

/** Too many failed attempts: shown to the user instead of "wrong password". */
export class TooManyAttempts extends CredentialsSignin {
  code = "rate_limited";
}

/** Database unreachable etc.: not the user's fault, so say so. */
export class LoginUnavailable extends CredentialsSignin {
  code = "unavailable";
}

// Credentials are checked directly against the database. (They used to be
// sent over HTTP to this app's own /api/v1/auth/login, which broke every
// login whenever NEXT_PUBLIC_API_BASE_URL pointed somewhere unreachable.)
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let result;
        try {
          result = await verifyCredentials(credentials);
        } catch (error) {
          console.error("Login check failed:", error);
          throw new LoginUnavailable();
        }
        if (result.ok) return result.user;
        if (result.reason === "locked") throw new TooManyAttempts();
        return null;
      },
    }),
  ],
});
