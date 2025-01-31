// "use client";

// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "../ui/chart";

// const chartConfig = {
//   num: {
//     label: "تعداد",
//   },
// } satisfies ChartConfig;

// function DashboardChart({
//   reservations,
// }: {
//   reservations: { selectedDate: string }[];
// }) {
//   const curWeek = getCurrentWeekDates();

//   const firstDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[0]
//   ).length;

//   const secondDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[1]
//   ).length;

//   const thirdDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[2]
//   ).length;

//   const fourthDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[3]
//   ).length;

//   const fifthDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[4]
//   ).length;

//   const sixthtDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[5]
//   ).length;

//   const seventhDay = reservations.filter(
//     (el: { selectedDate: string }) => el.selectedDate === curWeek[6]
//   ).length;

//   const chartData = [
//     { day: "جمعه", num: seventhDay },
//     { day: "پنجشنبه", num: sixthtDay },
//     { day: "چهارشنبه", num: fifthDay },
//     { day: "سه شنبه", num: fourthDay },
//     { day: "دوشنبه", num: thirdDay },
//     { day: "یکشنبه", num: secondDay },
//     { day: "شنبه", num: firstDay },
//   ];
//   return (
//     <div className=" col-span-full shadow-md rounded-lg bg-violet-50 border border-violet-100 p-8">
//       <p className=" text-center text-xl font-bold text-neutral-500 mb-2">
//         رزروهای این هفته
//       </p>
//       <ChartContainer config={chartConfig} className="h-56 w-full">
//         <AreaChart
//           accessibilityLayer
//           data={chartData}
//           margin={{
//             left: 12,
//             right: 12,
//           }}
//         >
//           <CartesianGrid />
//           <XAxis dataKey="day" tickMargin={8} />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent indicator="line" />}
//           />
//           <Area dataKey="num" type="natural" fill="#84cc16" stroke="#4d7c0f" />
//         </AreaChart>
//       </ChartContainer>
//     </div>
//   );
// }

// export default DashboardChart;

// function getCurrentWeekDates() {
//   const today = new Date();
//   const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday

//   // تنظیم اولین روز هفته (از شنبه)
//   const weekStart = new Date(today);
//   weekStart.setDate(
//     today.getDate() - (currentDay === 0 ? 6 : currentDay - 1) - 2
//   );

//   // ایجاد آرایه شامل 7 روز هفته
//   return Array.from({ length: 7 }, (_, i) => {
//     const date = new Date(weekStart);
//     date.setDate(weekStart.getDate() + i);
//     return date.toISOString().split("T")[0]; // فرمت YYYY-MM-DD
//   });
// }
