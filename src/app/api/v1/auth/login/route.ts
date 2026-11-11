import dbConnect from "@/lib/mongoose";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginApiSchema } from "@/lib/zod";
import { addHit, getHits, resetHits } from "@/lib/rateLimit";

// max failed attempts per email before the account is temporarily locked
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

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

  // validates types too: blocks NoSQL operator payloads like {"$ne": null}
  const parsed = loginApiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ status: "fail", data: null }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const rateLimitKey = `login:${email}`;

  if (getHits(rateLimitKey) >= MAX_FAILED_ATTEMPTS) {
    return NextResponse.json(
      { status: "fail", data: null, message: "Too many attempts" },
      { status: 429 },
    );
  }

  await dbConnect();

  // get user
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    addHit(rateLimitKey, LOCK_WINDOW_MS);
    return NextResponse.json({ status: "fail", data: null }, { status: 401 });
  }

  resetHits(rateLimitKey);

  // never send the password hash (or any other internal field) back
  return NextResponse.json({
    status: "success",
    data: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      image: user.photo || null,
      role: user.role,
    },
  });
}
