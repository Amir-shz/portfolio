"use client";

import ReservationRowBtns from "./ReservationRowBtns";

// Same actions as the reservations list, so both tables behave alike.
function DashboardTableBtns({ id, status }: { id: string; status: string }) {
  return <ReservationRowBtns id={id} status={status} />;
}

export default DashboardTableBtns;
