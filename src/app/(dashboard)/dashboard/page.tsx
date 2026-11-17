import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardCircleChart from "@/components/dashboard/DashboardCircleChart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardTable from "@/components/dashboard/DashboardTable";
import PageHeader from "@/components/dashboard/PageHeader";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "داشبورد",
};

async function page() {
  await requireSession();
  await dbConnect();
  const reservations = await Reservation.find().sort({ selectedDate: 1 });

  const todayReservations = reservations.filter(
    (reservation: { selectedDate: string }) =>
      new Date(reservation.selectedDate).toLocaleDateString("en-CA") ===
      new Date().toLocaleDateString("en-CA"),
  );

  const newReservationNum = todayReservations.reduce(
    (acc: number, cur: { status: string }) => (cur.status === "new" ? acc + 1 : acc),
    0,
  );

  const finishReservationNum = todayReservations.length - newReservationNum;

  // client components only get plain values
  const chartReservations = reservations.map((r: { selectedDate: string }) => ({
    selectedDate: String(r.selectedDate),
  }));

  return (
    <>
      <PageHeader title="خلاصه امروز" description="نگاهی سریع به نوبت‌های امروز و این هفته" />
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        <DashboardStats reservations={todayReservations} />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
          <DashboardCircleChart newNum={newReservationNum} finishNum={finishReservationNum} />
          <div className="min-w-0 xl:col-span-2">
            <DashboardTable reservations={todayReservations} />
          </div>
        </div>
        <DashboardChart reservations={chartReservations} />
      </div>
    </>
  );
}

export default page;
