import PageHeader from "@/components/dashboard/PageHeader";
import ScheduleAllDelBtn from "@/components/dashboard/ScheduleAllDelBtn";
import ScheduleOneDelBtn from "@/components/dashboard/ScheduleOneDelBtn";
import ScheduleReserveBtn from "@/components/dashboard/ScheduleReserveBtn";
import { deleteSchedule } from "@/lib/actions";
import dbConnect from "@/lib/mongoose";
import Schedule from "@/models/scheduleModel";
import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Clock3 } from "lucide-react";
import { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "زمان‌بندی",
};

async function page({ params }: { params: Promise<{ scheduleId: string }> }) {
  await requireSession();
  const scheduleId = (await params).scheduleId;

  await dbConnect();

  const schedule = await Schedule.findById(scheduleId);

  const { _id, date, hours } = schedule;
  const { day, monthName, year, dayName } = getJalaliDetails(new Date(date));
  const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
  const id = String(_id);
  const free = hours.filter((h: { isAvailable: boolean }) => h.isAvailable).length;

  return (
    <>
      <PageHeader
        title={formattedDate}
        backHref="/dashboard/schedules"
        description={`${digitsEnToFa(hours.length)} ساعت ثبت شده، ${digitsEnToFa(free)} ساعت آزاد`}
      >
        <form action={deleteSchedule}>
          <input type="hidden" name="id" value={id} />
          <ScheduleAllDelBtn />
        </form>
      </PageHeader>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {hours.map((hour: { hour: string; isAvailable: boolean; _id: string }) => (
          <li
            key={String(hour._id)}
            className="glass flex items-center justify-between gap-3 rounded-[1.25rem] p-4"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-iris-tint text-iris">
                <Clock3 className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-base font-bold text-ink">{digitsEnToFa(hour.hour)}</p>
                <p
                  className={`text-xs font-bold ${
                    hour.isAvailable ? "text-ok-deep" : "text-danger-deep"
                  }`}
                >
                  {hour.isAvailable ? "آزاد" : "رزرو شده"}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <ScheduleReserveBtn id={id} hour={hour.hour} />
              <ScheduleOneDelBtn id={id} hour={hour.hour} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default page;
