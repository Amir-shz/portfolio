import dbConnect from "@/lib/mongoose";
import Plan from "@/models/planModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const plans = await Plan.find();

  return NextResponse.json({
    status: "success",
    length: plans.length,
    data: plans,
  });
}
