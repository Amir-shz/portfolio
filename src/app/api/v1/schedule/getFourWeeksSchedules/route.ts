import dbConnect from "@/lib/mongoose";
import Schedule from "@/models/scheduleModel";
import { getFourWeeksFromToday } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const fourWeek = getFourWeeksFromToday().map((el) => el.date);

  // get four weeks schedules
  const schedules = await Schedule.find({
    date: { $in: fourWeek },
  }).sort({ date: 1 });

  const formattedSchedules = schedules.map((obj) => {
    const date = new Date(obj.date);
    const formattedDate = date.toLocaleDateString("en-CA");
    return {
      date: formattedDate,
      available: obj.available,
      _id: obj._id,
      hours: obj.hours,
    };
  });

  return NextResponse.json({
    status: "success",
    length: schedules.length,
    data: formattedSchedules,
  });
}
