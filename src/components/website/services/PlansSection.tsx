"use client";

import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowLeft, BriefcaseBusiness, Clock3 } from "lucide-react";
import Reservation from "@/features/reservation/Reservation";
import { useReservationStore } from "@/hooks/useReservationStore";
import { planData } from "@/data/planData";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

// Tier swatches for the three individual sessions (برنزی / نقره‌ای / طلایی).
const medals: Record<number, string> = {
  1: "bg-[conic-gradient(from_200deg,#8A5A3B,#D9A97E,#9C6744,#E8C3A0,#8A5A3B)]",
  2: "bg-[conic-gradient(from_200deg,#8D929C,#E6E8EC,#A3A8B1,#F4F5F7,#8D929C)]",
  3: "bg-[conic-gradient(from_200deg,#A67C1E,#F1D58A,#B98E2E,#F7E3A6,#A67C1E)]",
};

interface Plan {
  id: number;
  title: string;
  time: string;
  price: string;
  off?: string;
}

function Price({ value, className }: { value: string; className?: string }) {
  const [amount, ...unit] = value.split(" ");
  return (
    <span className={className}>
      <span className="text-[1.75rem] font-extrabold leading-none">{amount}</span>
      <span className="ms-1 text-[0.8125rem] font-medium opacity-70">{unit.join(" ")}</span>
    </span>
  );
}

function PlanTile({ plan }: { plan: Plan }) {
  const { show, setPlan } = useReservationStore();
  const router = useRouter();
  const business = !medals[plan.id];

  function reserve() {
    setPlan(plan.id);
    // Phones get the full-page booking flow; larger screens open the dialog.
    if (window.matchMedia("(max-width: 639px)").matches) {
      router.push("/reservation");
    } else {
      show();
    }
  }

  return (
    <li
      className={cn(
        "flex flex-col rounded-[1.25rem] p-5",
        business ? "glass-dark" : "glass text-ink",
      )}
    >
      <div className="flex items-center justify-between">
        {business ? (
          <span className="grid size-9 place-items-center rounded-full bg-white/10 text-lilac">
            <BriefcaseBusiness className="size-4" strokeWidth={1.7} aria-hidden />
          </span>
        ) : (
          <span
            aria-hidden
            className={cn(
              "size-9 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_10px_-5px_rgba(31,22,51,0.45)]",
              medals[plan.id],
            )}
          />
        )}
        <span
          className={cn(
            "chip",
            business ? "bg-white/10 text-white/80" : "bg-iris-wash text-iris-deep",
          )}
        >
          <Clock3 className="size-3.5" aria-hidden />
          {plan.time}
        </span>
      </div>

      <h3 className="mt-6 text-base font-bold leading-7">{plan.title}</h3>

      <div className="mb-6 mt-2 min-h-[3.75rem]">
        {plan.off ? (
          <>
            <del
              className={cn(
                "block text-[0.8125rem]",
                business ? "text-white/45" : "text-ink-faint",
              )}
            >
              {plan.price}
            </del>
            <Price value={plan.off} className="mt-1 block text-iris" />
          </>
        ) : (
          <Price value={plan.price} className="mt-5 block" />
        )}
      </div>

      <button
        type="button"
        onClick={reserve}
        className={cn("btn mt-auto w-full", business ? "btn-light" : "btn-primary")}
      >
        رزرو کردن
        <ArrowLeft className="size-4" aria-hidden />
      </button>
    </li>
  );
}

function PlansSection() {
  const { showModal } = useReservationStore();
  return (
    <QueryClientProvider client={queryClient}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(planData as Plan[]).map((plan) => (
          <PlanTile key={plan.id} plan={plan} />
        ))}
      </ul>
      {showModal === true && <Reservation />}
    </QueryClientProvider>
  );
}

export default PlansSection;
