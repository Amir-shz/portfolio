"use server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";

// const delay = (ms: number): Promise<void> => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

export async function createReservation(data: object) {
  // console.log(data);
  await dbConnect();
  await Reservation.create(data);
  // await delay(5000);
}
