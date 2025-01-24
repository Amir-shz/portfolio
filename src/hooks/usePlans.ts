import { useQuery } from "@tanstack/react-query";

async function getPlans() {
  const plans = await fetch("/api/v1/plan")
    .then((data) => data.json())
    .then((data) => data.data);

  return plans;
}

export default function usePlans() {
  const { isLoading, data } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return { isLoading, data };
}
