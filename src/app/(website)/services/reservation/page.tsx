"use client";

import { useReservationStore } from "@/hooks/useReservationStore";

function Page() {
  const { plan } = useReservationStore();
  console.log(plan);
  return <div className=" sm:hidden">reservation</div>;
}

export default Page;
