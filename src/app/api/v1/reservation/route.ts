import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const reservations = await Reservation.find().sort({ selectedDate: 1 });

  return NextResponse.json({
    status: "success",
    length: reservations.length,
    data: reservations,
  });
}
