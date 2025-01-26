import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await User.find();

  return NextResponse.json({
    status: "success",
    length: users.length,
    data: users,
  });
}
