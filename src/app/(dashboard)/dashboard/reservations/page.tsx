import ReservationHeader from "@/components/dashboard/ReservationHeader";
import ReservationRow from "@/components/dashboard/ReservationRow";
import { reservationType } from "@/types/types";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "رزروها",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page() {
  const reservations = await fetch(`${baseUrl}/reservation`)
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <div className="w-full max-h-[calc(100vh-5.5rem)] overflow-y-scroll flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 ">
      <ReservationHeader />
      {reservations.length > 0 &&
        reservations.map((reservation: reservationType) => (
          <ReservationRow key={reservation._id} reservation={reservation} />
        ))}
    </div>
  );
}

export default page;
