import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Schedule from "@/models/scheduleModel";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (session?.user) {
    const { id } = await params;
    await dbConnect();

    const schedule = await Schedule.findById(id);

    return NextResponse.json({
      status: "success",
      data: schedule,
    });
  }
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
}
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const body = await req.json();

//   await dbConnect();
//   const reservation = await Reservation.findByIdAndUpdate(id, body);

//   return NextResponse.json({
//     status: "success",
//     data: reservation,
//   });
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;

//   await dbConnect();
//   await Reservation.findByIdAndDelete(id);

//   return NextResponse.json({
//     status: "success",
//     data: null,
//   });
// }
