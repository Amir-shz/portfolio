import { Clock3, Wallet } from "lucide-react";
import { planData } from "@/data/planData";
import { useReservationStore } from "@/hooks/useReservationStore";

// Summary of the chosen plan at the top of the booking flow.
function ReservationDetail() {
  const { plan } = useReservationStore();

  const detail = planData?.filter(
    (el: { id: number; title: string; time: string; price: string; off?: string }) =>
      el.id === plan,
  )[0];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white bg-white/65 p-3">
      <div>
        <p className="text-[0.6875rem] text-ink-faint">جلسه انتخابی</p>
        <p className="text-[0.9375rem] font-bold text-ink">{detail.title}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="chip bg-iris-wash text-iris-deep">
          <Wallet className="size-3.5" aria-hidden />
          {detail.off ? detail.off : detail.price}
        </span>
        <span className="chip bg-iris-wash text-iris-deep">
          <Clock3 className="size-3.5" aria-hidden />
          {detail.time}
        </span>
      </div>
    </div>
  );
}

export default ReservationDetail;
