import dbConnect from "@/lib/mongoose";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;

  await dbConnect();
  const user = await User.findOne({ email });

  return NextResponse.json({
    status: "success",
    data: user,
  });
}
