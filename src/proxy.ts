// Route guard (Next.js 16 "proxy", formerly middleware). Uses only the
// edge-safe auth config, so no database code is bundled here.
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/blog/preview/:path*"],
};
