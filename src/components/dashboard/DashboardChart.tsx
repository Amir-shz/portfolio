"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { getFourWeeksFromToday, splitIntoWeeks } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const chartConfig = {
  num: {
    label: "تعداد",
    color: "#5B2BD9",
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

  const countOn = (i: number) =>
    reservations.filter((el: { selectedDate: string }) => el.selectedDate === curWeek?.at(i))
      .length;

  const chartData = [
    { day: "جمعه", num: countOn(6) },
    { day: "پنجشنبه", num: countOn(5) },
    { day: "چهارشنبه", num: countOn(4) },
    { day: "سه شنبه", num: countOn(3) },
    { day: "دوشنبه", num: countOn(2) },
    { day: "یکشنبه", num: countOn(1) },
    { day: "شنبه", num: countOn(0) },
  ];

  return (
    <section className="glass rounded-[1.25rem] p-4 sm:p-5">
      <h2 className="text-base font-bold text-ink">رزروهای این هفته</h2>
      <p className="mt-0.5 text-[0.8125rem] text-ink-faint">تعداد نوبت‌های رزروشده برای هر روز هفته</p>
      <ChartContainer config={chartConfig} className="mt-3 aspect-auto h-52 w-full">
        <AreaChart accessibilityLayer data={chartData} margin={{ left: 4, right: 4, top: 12 }}>
          <defs>
            <linearGradient id="weekFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B2BD9" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5B2BD9" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="rgba(30,24,56,0.1)" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            width={28}
            orientation="right"
            tickFormatter={(v) => digitsEnToFa(v)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="num"
            type="monotone"
            fill="url(#weekFill)"
            stroke="#5B2BD9"
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: "#5B2BD9", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}

export default DashboardChart;
