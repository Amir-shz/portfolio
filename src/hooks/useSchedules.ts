import { useQuery } from "@tanstack/react-query";

async function getSchedules() {
  const plans = await fetch("/api/v1/schedule/getFourWeeksSchedules")
    .then((data) => data.json())
    .then((data) => data.data);

  return plans;
}

export default function useSchedules() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
  });

  return { isLoading, isSuccess, data };
}
