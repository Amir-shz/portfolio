// import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { NextResponse } from "next/server";

// export const GET = auth(async function GET(req) {
//   if (req.auth) {
//     await dbConnect();
//     const reservations = await Reservation.find().sort({ selectedDate: 1 });

//     return NextResponse.json({
//       status: "success",
//       length: reservations.length,
//       data: reservations,
//     });
//   }
//   return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
// });

export async function GET() {
  await dbConnect();
  const reservations = await Reservation.find().sort({ selectedDate: 1 });

  return NextResponse.json({
    status: "success",
    length: reservations.length,
    data: reservations,
  });
}
