import Link from "next/link";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CalendarX2 } from "lucide-react";
import DashboardTableBtns from "./DashboardTableBtns";
import StatusPill from "./StatusPill";
import { planData } from "@/data/planData";

function DashboardTable({
  reservations,
}: {
  reservations: {
    fullName: string;
    phone: string;
    status: string;
    plan: number;
    _id: string;
  }[];
}) {
  return (
    <section className="glass flex flex-col rounded-[1.25rem] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-ink">رزروهای امروز</h2>
        <Link href="/dashboard/reservations" className="btn btn-ghost btn-sm text-iris">
          همه رزروها
        </Link>
      </div>

      {reservations.length === 0 ? (
        <div className="grid flex-1 place-items-center py-10 text-center">
          <div>
            <span className="mx-auto grid size-9 place-items-center rounded-xl bg-iris-tint text-iris">
              <CalendarX2 className="size-5" strokeWidth={1.6} aria-hidden />
            </span>
            <p className="mt-3 text-sm font-semibold text-ink-soft">
              امروز رزروی ثبت نشده است.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative -mx-2 mt-3 overflow-x-auto px-2">
          <table className="w-full min-w-[36rem] border-separate border-spacing-y-1 text-[0.8125rem]">
            <thead>
              <tr className="text-xs font-bold text-ink-faint">
                <th className="px-3 py-1 text-start font-bold">نام</th>
                <th className="px-3 py-1 text-start font-bold">شماره</th>
                <th className="px-3 py-1 text-start font-bold">وضعیت</th>
                <th className="px-3 py-1 text-start font-bold">طرح</th>
                <th className="px-3 py-1 text-start font-bold">قیمت</th>
                <th className="px-3 py-1 text-end font-bold">
                  <span className="sr-only">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => {
                const plan = planData.filter((el) => el.id === reservation.plan)[0];
                return (
                  <tr key={String(reservation._id)} className="bg-white/60 text-ink">
                    <td className="whitespace-nowrap rounded-s-xl px-3 py-2.5">
                      <Link
                        href={`/dashboard/reservations/${reservation._id}`}
                        className="hover:text-iris"
                      >
                        {reservation.fullName}
                      </Link>
                    </td>
                    <td dir="ltr" className="whitespace-nowrap px-3 py-2.5 text-right text-ink-soft">
                      {digitsEnToFa(reservation.phone)}
                    </td>
                    <td className="px-3 py-2.5">
                      <StatusPill status={reservation.status} />
                    </td>
                    <td className="px-3 py-2.5 text-ink-soft">{plan?.title}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-ink-soft">
                      {plan?.off ?? plan?.price}
                    </td>
                    <td className="rounded-e-xl px-3 py-2">
                      <div className="flex justify-end">
                        <DashboardTableBtns
                          id={String(reservation._id)}
                          status={reservation.status}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default DashboardTable;
