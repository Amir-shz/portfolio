import PageHeader from "@/components/dashboard/PageHeader";
import ScheduleForm from "@/components/dashboard/ScheduleForm";
import ScheduleRow from "@/components/dashboard/ScheduleRow";
import dbConnect from "@/lib/mongoose";
import Schedule from "@/models/scheduleModel";
import { CalendarPlus, CalendarRange } from "lucide-react";
import { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "زمان بندی",
};

async function page() {
  await requireSession();
  await dbConnect();
  const schedules = await Schedule.find({}).sort({ date: 1 });

  schedules.forEach((schedule) => {
    schedule.hours.sort((a: { hour: string }, b: { hour: string }) =>
      a.hour.localeCompare(b.hour),
    );
  });

  const formattedSchedules = schedules.map((obj) => {
    const date = new Date(obj.date);
    const formattedDate = date.toLocaleDateString("en-CA");
    return {
      date: formattedDate,
      available: obj.available,
      _id: String(obj._id),
      hours: obj.hours.map((h: { hour: string; isAvailable: boolean }) => ({
        hour: h.hour,
        isAvailable: h.isAvailable,
      })),
    };
  });

  return (
    <>
      <PageHeader
        title="زمان‌بندی"
        description="ساعت‌های خالی را اضافه کنید تا مراجعان بتوانند نوبت بگیرند."
      />
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <section className="glass rounded-[1.25rem] p-4 sm:p-5 lg:sticky lg:top-24">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-iris text-white shadow-iris">
              <CalendarPlus className="size-4" aria-hidden />
            </span>
            <h2 className="text-base font-bold text-ink">افزودن زمان</h2>
          </div>
          <form action="">
            <ScheduleForm schedules={formattedSchedules} />
          </form>
        </section>

        <section className="glass min-w-0 rounded-[1.25rem] p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <CalendarRange className="size-5 text-iris" aria-hidden />
              روزهای ثبت‌شده
            </h2>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-full bg-ok" />
                آزاد
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-full bg-danger" />
                رزرو شده
              </span>
            </div>
          </div>
          {formattedSchedules.length === 0 ? (
            <p className="rounded-xl bg-white/50 px-4 py-10 text-center font-semibold text-ink-soft">
              هنوز زمانی ثبت نشده است.
            </p>
          ) : (
            <ul className="grid gap-2">
              {[...formattedSchedules].reverse().map((el) => (
                <ScheduleRow key={el._id} schedule={el} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default page;
