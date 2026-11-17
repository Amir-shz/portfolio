import PageHeader from "@/components/dashboard/PageHeader";
import { ReservationCard, ReservationRow } from "@/components/dashboard/ReservationRow";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { reservationType } from "@/types/types";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CalendarX2 } from "lucide-react";
import { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "رزروها",
};

const columns = ["نام", "شماره همراه", "تاریخ", "ساعت", "وضعیت", "پلن", "توضیحات"];

async function page() {
  await requireSession();
  await dbConnect();
  const reservations: reservationType[] = (
    await Reservation.find().sort({ selectedDate: 1 })
  ).reverse();

  return (
    <>
      <PageHeader
        title="رزروها"
        description={`${digitsEnToFa(reservations.length)} رزرو ثبت شده، از جدیدترین تاریخ`}
      />

      {reservations.length === 0 ? (
        <div className="glass grid place-items-center rounded-[1.25rem] px-6 py-16 text-center">
          <span className="grid size-9 place-items-center rounded-xl bg-iris-tint text-iris">
            <CalendarX2 className="size-5" strokeWidth={1.6} aria-hidden />
          </span>
          <p className="mt-3 font-semibold text-ink-soft">هنوز رزروی ثبت نشده است.</p>
        </div>
      ) : (
        <>
          <section className="glass hidden rounded-[1.25rem] p-3 lg:block">
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[56rem] border-separate border-spacing-y-1">
                <thead>
                  <tr className="text-xs text-ink-faint">
                    {columns.map((c) => (
                      <th key={c} className="px-3 py-2 text-start font-bold first:px-4">
                        {c}
                      </th>
                    ))}
                    <th className="px-3 py-2">
                      <span className="sr-only">عملیات</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <ReservationRow key={String(reservation._id)} reservation={reservation} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {reservations.map((reservation) => (
              <ReservationCard key={String(reservation._id)} reservation={reservation} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default page;
