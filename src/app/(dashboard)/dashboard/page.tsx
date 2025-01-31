import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardCircleChart from "@/components/dashboard/DashboardCircleChart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { Metadata } from "next";
import { headers } from "next/headers";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "داشبورد",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function page() {
  // get today reservations
  const header = await headers();

  const reservations = await fetch(`${baseUrl}/reservation`, {
    headers: header,
  })
    .then((data) => data.json())
    .then((data) => data.data);

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
    <div className="grid grid-cols-6 gap-6 items-start">
      <DashboardStats reservations={todayReservations} />
      <DashboardCircleChart
        newNum={newReservationNum}
        finishNum={finishReservationNum}
      />
      <DashboardTable reservations={todayReservations} />
      <DashboardChart />
    </div>
  );
}

export default page;
