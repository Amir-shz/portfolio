import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const reservations = await Reservation.find();

  return NextResponse.json({
    status: "success",
    length: reservations.length,
    data: reservations,
  });
}
