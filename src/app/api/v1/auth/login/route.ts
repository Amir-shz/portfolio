import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/credentials";

// Kept for API clients. The website itself signs in through NextAuth, which
// uses the same verifyCredentials() directly (see src/auth.ts).
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { status: "fail", data: null, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const result = await verifyCredentials(body);

  if (!result.ok) {
    const status = result.reason === "locked" ? 429 : result.reason === "bad_request" ? 400 : 401;
    return NextResponse.json(
      {
        status: "fail",
        data: null,
        ...(result.reason === "locked" ? { message: "Too many attempts" } : {}),
      },
      { status },
    );
  }

  // never send the password hash (or any other internal field) back
  return NextResponse.json({ status: "success", data: result.user });
}
