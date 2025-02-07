"use client";

import ReservationForm from "@/features/reservation/ReservationForm";
import ReservationStepOne from "@/features/reservation/ReservationStepOne";
import ReservationStepThree from "@/features/reservation/ReservationStepThree";
import { useReservationStore } from "@/hooks/useReservationStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function Page() {
  const { step } = useReservationStore();

  useEffect(() => {
    document.title = "رزرو نوبت";
  }, []);

  return (
    <div className=" sm:hidden">
      <QueryClientProvider client={queryClient}>
        {step === 1 && <ReservationStepOne />}
        {step === 2 && (
          <>
            <p className=" text-neutral-700 text-xl font-semibold leading-7 mx-44 max-sm:mx-2 max-sm:mt-6 max-sm:text-base">
              لطفا اطلاعات مورد نیاز را برای ارتباط بهتر وارد کنید.
            </p>
            <ReservationForm />
          </>
        )}
        {step === 3 && <ReservationStepThree />}
      </QueryClientProvider>
    </div>
  );
}

export default Page;
