import dbConnect from "@/lib/mongoose";
import Schedule from "@/models/scheduleModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const schedules = await Schedule.find({}).sort({ date: 1 });

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
