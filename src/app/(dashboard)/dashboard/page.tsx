import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardCircleChart from "@/components/dashboard/DashboardCircleChart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardTable from "@/components/dashboard/DashboardTable";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "داشبورد",
};

async function page() {
  await dbConnect();
  const reservations = await Reservation.find().sort({ selectedDate: 1 });

  const todayReservations = reservations.filter(
    (reservation: { selectedDate: string }) =>
      new Date(reservation.selectedDate).toLocaleDateString("en-CA") ===
      new Date().toLocaleDateString("en-CA")
  );

  const newReservationNum = todayReservations.reduce(
    (acc: number, cur: { status: string }) =>
      cur.status === "new" ? acc + 1 : acc,
    0
  );

  const finishReservationNum = todayReservations.length - newReservationNum;

  return (
    <div className="grid grid-cols-6 gap-6 max-h-[calc(100vh-5.5rem)] overflow-y-scroll p-2 noScrollBar max-sm:gap-3 max-sm:max-h-dvh max-sm:p-4">
      <DashboardStats reservations={todayReservations} />
      <DashboardCircleChart
        newNum={newReservationNum}
        finishNum={finishReservationNum}
      />
      <DashboardTable reservations={todayReservations} />
      <DashboardChart reservations={reservations} />
    </div>
  );
}

export default page;
