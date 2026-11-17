"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const chartConfig = {
  num: {
    label: "کل رزروها",
  },
} satisfies ChartConfig;

// Same colours as the status pills: green = new, amber = finished.
const NEW_COLOR = "#1F9D61";
const DONE_COLOR = "#C77A00";

export default function DashboardCircleChart({
  newNum,
  finishNum,
}: {
  newNum: number;
  finishNum: number;
}) {
  const chartData = [
    { title: "رزرو جدید", num: newNum, fill: NEW_COLOR },
    { title: "رزرو تمام شده", num: finishNum, fill: DONE_COLOR },
  ];

  const totalNums = chartData.reduce((acc, curr) => acc + curr.num, 0);

  return (
    <section className="glass flex flex-col rounded-[1.25rem] p-4 sm:p-5">
      <h2 className="text-base font-bold text-ink">وضعیت رزروهای امروز</h2>
      {totalNums === 0 ? (
        <div className="grid flex-1 place-items-center py-10 text-center">
          <div>
            <p className="text-gradient py-1 text-4xl font-bold">۰</p>
            <p className="mt-2 text-sm text-ink-soft">امروز رزروی ثبت نشده است.</p>
          </div>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-h-[220px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="num"
              nameKey="title"
              innerRadius={58}
              strokeWidth={4}
              stroke="rgba(255,255,255,0.9)"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-ink text-2xl font-bold"
                        >
                          {digitsEnToFa(totalNums.toLocaleString())}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-ink-soft text-xs"
                        >
                          رزرو
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
      <ul className="mt-auto flex flex-wrap justify-center gap-x-5 gap-y-2 pt-3 text-[0.8125rem] text-ink-soft">
        <li className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full" style={{ background: NEW_COLOR }} />
          جدید: {digitsEnToFa(newNum)}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full" style={{ background: DONE_COLOR }} />
          تمام شده: {digitsEnToFa(finishNum)}
        </li>
      </ul>
    </section>
  );
}
