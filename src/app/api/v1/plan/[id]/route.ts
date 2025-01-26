import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Plan from "@/models/planModel";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();

  const plan = await Plan.findById(id);

  return NextResponse.json({
    status: "success",
    data: plan,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await auth();

  if (!user?.user)
    return NextResponse.json(
      {
        status: "fail",
      },
      { status: 401 }
    );

  const { id } = await params;
  const body = await req.json();

  await dbConnect();
  const plan = await Plan.findByIdAndUpdate(id, body);

  return NextResponse.json({
    status: "success",
    data: plan,
  });
}
