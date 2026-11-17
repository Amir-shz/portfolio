"use client";

import ReservationFlow from "@/features/reservation/ReservationFlow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-1 flex-col">
        <ReservationFlow />
      </div>
    </QueryClientProvider>
  );
}

export default Page;
