"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlansBox from "./PlansBox";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function ReactQueryProvider() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PlansBox />
      </QueryClientProvider>
    </>
  );
}

export default ReactQueryProvider;
