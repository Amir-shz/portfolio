export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

// , "/api/v1/reservation/:path*"
