import ReservationHeader from "@/components/dashboard/ReservationHeader";
import ReservationRow from "@/components/dashboard/ReservationRow";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { reservationType } from "@/types/types";
import { Metadata } from "next";
// import { headers } from "next/headers";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "رزروها",
};

// const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page() {
  // const header = await headers();

  // const reservations = await fetch(`${baseUrl}/reservation`, {
  //   headers: header,
  // })
  //   .then((data) => data.json())
  //   .then((data) => data.data.reverse());

  await dbConnect();
  const reservations = await Reservation.find().sort({ selectedDate: 1 });

  return (
    <div className="max-h-dvh overflow-hidden p-2 max-sm:p-3 ">
      <div className=" bg-purple-50 shadow-shadow4 border border-purple-100 w-full rounded-md px-2 overflow-y-scroll max-h-[calc(100dvh-100px)] hide-scrollbar">
        <ReservationHeader />
        {reservations.length > 0 &&
          reservations.map((reservation: reservationType) => (
            <ReservationRow key={reservation._id} reservation={reservation} />
          ))}
      </div>
    </div>
  );
}

export default page;
