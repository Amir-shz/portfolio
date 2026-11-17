import Link from "next/link";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { getJalaliDetails } from "@/utils/utils";
import { reservationType } from "@/types/types";
import { planData } from "@/data/planData";
import ReservationRowBtns from "./ReservationRowBtns";
import StatusPill from "./StatusPill";

function details(reservation: reservationType) {
  const plan = planData.filter((el) => el.id === Number(reservation.plan))[0];
  const { day, monthName, year } = getJalaliDetails(new Date(reservation.selectedDate));
  return {
    id: String(reservation._id),
    date: `${day} ${monthName} ${year}`,
    planName: plan?.title,
    planTime: plan?.time,
    planPrice: plan?.off ?? plan?.price,
  };
}

// One reservation as a table row (large screens).
export function ReservationRow({ reservation }: { reservation: reservationType }) {
  const { fullName, phone, selectedTime, status, description } = reservation;
  const { id, date, planName, planTime, planPrice } = details(reservation);

  return (
    <tr className="group bg-white/60 text-[0.8125rem] text-ink transition-colors hover:bg-white/90">
      <td className="whitespace-nowrap rounded-s-xl px-4 py-3">
        <Link href={`/dashboard/reservations/${id}`} className="font-semibold hover:text-iris">
          {fullName}
        </Link>
      </td>
      <td dir="ltr" className="whitespace-nowrap px-3 py-3 text-right text-ink-soft">
        {digitsEnToFa(phone)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">{date}</td>
      <td className="px-3 py-3">{digitsEnToFa(selectedTime)}</td>
      <td className="px-3 py-3">
        <StatusPill status={status} />
      </td>
      <td className="px-3 py-3">
        <span className="block">{planName}</span>
        <span className="block text-xs font-medium text-ink-faint">
          {planPrice} · {planTime}
        </span>
      </td>
      <td className="max-w-[16rem] px-3 py-3 font-medium text-ink-soft">
        <span className="line-clamp-2">{description || "—"}</span>
      </td>
      <td className="rounded-e-xl px-3 py-2">
        <div className="flex justify-end">
          <ReservationRowBtns id={id} status={status} />
        </div>
      </td>
    </tr>
  );
}

// The same reservation as a card (phones and tablets).
export function ReservationCard({ reservation }: { reservation: reservationType }) {
  const { fullName, phone, selectedTime, status, description } = reservation;
  const { id, date, planName, planPrice } = details(reservation);

  return (
    <li className="rounded-[1.125rem] border border-white bg-white/60 p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/dashboard/reservations/${id}`}
            className="block truncate text-[0.9375rem] font-semibold text-ink hover:text-iris"
          >
            {fullName}
          </Link>
          <p dir="ltr" className="text-right text-[0.8125rem] text-ink-soft">
            {digitsEnToFa(phone)}
          </p>
        </div>
        <StatusPill status={status} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
        <span className="chip bg-iris-wash py-1 text-xs text-iris-deep">
          {date} · {digitsEnToFa(selectedTime)}
        </span>
        <span className="chip bg-white py-1 text-xs text-ink-soft">
          {planName} · {planPrice}
        </span>
      </div>
      {description && (
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-soft">{description}</p>
      )}
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-3">
        <Link
          href={`/dashboard/reservations/${id}`}
          className="text-sm font-bold text-iris hover:text-iris-deep"
        >
          جزئیات رزرو
        </Link>
        <ReservationRowBtns id={id} status={status} />
      </div>
    </li>
  );
}

export default ReservationRow;
