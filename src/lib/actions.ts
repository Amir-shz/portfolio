"use server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";

export async function createReservation(data: object) {
  console.log(data);
  await dbConnect();
  await Reservation.create(data);
}
