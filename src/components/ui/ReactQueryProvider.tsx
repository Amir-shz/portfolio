"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlansBox from "./PlansBox";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default ReactQueryProvider;
