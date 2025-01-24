import ReservationHeader from "@/components/dashboard/ReservationHeader";
import ReservationRow from "@/components/dashboard/ReservationRow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "رزروها",
};

async function page() {
  const reservations = await fetch("http://localhost:3000/api/v1/reservation")
    .then((data) => data.json())
    .then((data) => data.data);

  return (
    <div className="w-full flex flex-col rounded-md bg-purple-50 shadow-shadow4 border border-purple-100 ">
      <ReservationHeader />
      {reservations.map((reservation) => (
        <ReservationRow key={reservation._id} reservation={reservation} />
      ))}
    </div>
  );
}

export default page;
