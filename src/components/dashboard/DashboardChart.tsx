"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { getFourWeeksFromToday, splitIntoWeeks } from "@/utils/utils";

const chartConfig = {
  num: {
    label: "تعداد",
  },
} satisfies ChartConfig;

function DashboardChart({
  reservations,
}: {
  reservations: { selectedDate: string }[];
}) {
  const curWeek: string[] | undefined = splitIntoWeeks(getFourWeeksFromToday())
    .at(0)
    ?.dates.map((el) => el.date);

  const firstDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(0)
  ).length;

  const secondDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(1)
  ).length;

  const thirdDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(2)
  ).length;

  const fourthDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(3)
  ).length;

  const fifthDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(4)
  ).length;

  const sixthtDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(5)
  ).length;

  const seventhDay = reservations.filter(
    (el: { selectedDate: string }) => el.selectedDate === curWeek?.at(6)
  ).length;

  const chartData = [
    { day: "جمعه", num: seventhDay },
    { day: "پنجشنبه", num: sixthtDay },
    { day: "چهارشنبه", num: fifthDay },
    { day: "سه شنبه", num: fourthDay },
    { day: "دوشنبه", num: thirdDay },
    { day: "یکشنبه", num: secondDay },
    { day: "شنبه", num: firstDay },
  ];
  return (
    <div className=" col-span-full shadow-md rounded-lg bg-violet-50 border border-violet-100 p-8 max-sm:p-4 max-sm:mb-14">
      <p className=" text-center text-xl font-bold text-neutral-500 mb-2 max-sm:text-lg">
        رزروهای این هفته
      </p>
      <ChartContainer config={chartConfig} className="max-h-56 w-full ">
        <AreaChart
          accessibilityLayer
          data={chartData}
          height={224}
          margin={{
            left: 16,
            right: 16,
            top: 16,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="day" tickMargin={8} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area dataKey="num" type="natural" fill="#84cc16" stroke="#4d7c0f" />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export default DashboardChart;
