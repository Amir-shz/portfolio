// Server-only: checks an email/password pair against the database.
// Used by NextAuth's Credentials provider (src/auth.ts) and by the
// /api/v1/auth/login route, so both behave the same.
// NOTE: keep this file WITHOUT "use server".
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/userModel";
import { addHit, getHits, resetHits } from "@/lib/rateLimit";
import { loginApiSchema } from "@/lib/zod";

// max failed attempts per email before the account is temporarily locked
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCK_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
};

export type VerifyResult =
  | { ok: true; user: SessionUser }
  | { ok: false; reason: "invalid" | "locked" | "bad_request" };

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";

/** Persian/Arabic digits (typed on a Persian keyboard) -> 0-9 */
function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String(FA.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)));
}

export async function verifyCredentials(input: unknown): Promise<VerifyResult> {
  // validates types too: blocks NoSQL operator payloads like {"$ne": null}
  const parsed = loginApiSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "bad_request" };

  const { email, password } = parsed.data;
  const key = `login:${email}`;
  if (getHits(key) >= MAX_FAILED_ATTEMPTS) return { ok: false, reason: "locked" };

  await dbConnect();
  const user = await User.findOne({ email }).select("+password");

  let match = false;
  if (user?.password) {
    match = await bcrypt.compare(password, user.password);
    // same password typed with the Persian keyboard's digits
    const latin = toLatinDigits(password);
    if (!match && latin !== password) match = await bcrypt.compare(latin, user.password);
  }

  if (!user || !match) {
    addHit(key, LOCK_WINDOW_MS);
    return { ok: false, reason: "invalid" };
  }

  resetHits(key);
  return {
    ok: true,
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      image: user.photo || null,
      role: user.role,
    },
  };
}
