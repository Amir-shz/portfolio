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

export default function DashboardCircleChart({
  newNum,
  finishNum,
}: {
  newNum: number;
  finishNum: number;
}) {
  const chartData = [
    { title: "رزرو جدید", num: newNum, fill: "#22c55e" },
    { title: "رزرو تمام شده", num: finishNum, fill: "#eab308" },
  ];

  const totalNums = chartData.reduce((acc, curr) => acc + curr.num, 0);

  return (
    <div className=" col-span-2 shadow-md rounded-lg bg-violet-50 border border-violet-100 p-1 max-sm:col-span-full">
      <p className=" text-neutral-500 font-semibold text-xl p-2 max-sm:text-lg">
        وضعیت رزروهای امروز
      </p>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="num"
            nameKey="title"
            innerRadius={60}
            strokeWidth={5}
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
                        className="fill-foreground text-3xl font-bold"
                      >
                        {digitsEnToFa(totalNums.toLocaleString())}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground font-semibold text-base"
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
    </div>
  );
}
