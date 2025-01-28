import dbConnect from "@/lib/mongoose";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log(email);
  console.log(password);

  await dbConnect();

  // get user
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ status: "fail", data: null }, { status: 401 });
  }

  return NextResponse.json({ status: "fail", data: user });
}
