import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Plan from "@/models/planModel";

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
