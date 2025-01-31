"use client";

import PlanCard from "./PlanCard";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
// import PlanBoxLoader from "./PlanBoxLoader";
// import usePlans from "@/hooks/usePlans";
import { planData } from "@/data/planData";

function PlansBox() {
  const { showModal } = useReservationStore();

  // const { isLoading, data: planData } = usePlans();

  // if (isLoading) return <PlanBoxLoader />;

  return (
    <>
      {planData?.map(
        (plan: {
          id: number;
          title: string;
          time: string;
          description: string;
          points: string[];
          price: string;
        }) => (
          <PlanCard
            key={plan.id}
            id={plan.id}
            title={plan.title}
            time={plan.time}
            price={plan.price}
            description={plan.description}
            points={plan.points}
          />
        )
      )}
      {showModal === true && <Reservation />}
    </>
  );
}

export default PlansBox;
