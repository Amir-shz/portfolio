// Server-only helpers for reading the signed-in user.
// NOTE: keep this file WITHOUT "use server" — otherwise every export
// becomes a publicly callable Server Action.
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/userModel";
import { isValidObjectId } from "mongoose";

export async function getCurrentUser() {
  const session = await auth();
  const id = session?.user?.id;
  const email = session?.user?.email;

  if (!id && !email) return null;

  await dbConnect();

  if (id && isValidObjectId(id)) {
    const user = await User.findById(id);
    if (user) return user;
  }

  // Fallback for sessions created before the user id was stored in the JWT
  if (email) return User.findOne({ email: email.toLowerCase() });

  return null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

export async function requireOwner() {
  const user = await requireUser();
  if (user.role !== "OWNER") throw new Error("Forbidden");
  return user;
}
