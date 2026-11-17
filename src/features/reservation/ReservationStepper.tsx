"use client";

import { Check } from "lucide-react";
import { useReservationStore } from "@/hooks/useReservationStore";
import { cn } from "@/lib/utils";

const labels = ["زمان", "اطلاعات", "پرداخت", "پایان"];
const faDigits = ["۱", "۲", "۳", "۴"];

// Where the visitor is in the four booking steps.
function ReservationStepper({ className }: { className?: string }) {
  const { step } = useReservationStore();

  return (
    <ol aria-label="مراحل رزرو" className={cn("flex items-center gap-2", className)}>
      {labels.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const current = n === step;
        return (
          <li
            key={label}
            aria-current={current ? "step" : undefined}
            className={cn("flex items-center gap-2", i < labels.length - 1 && "flex-1")}
          >
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full text-[0.6875rem] font-semibold transition-colors duration-300",
                done && "bg-iris text-white",
                current && "bg-iris text-white ring-[3px] ring-iris/20",
                !done && !current && "border border-ink/10 bg-white/70 text-ink-faint",
              )}
            >
              {done ? <Check className="size-3" aria-hidden /> : faDigits[i]}
            </span>
            <span
              className={cn(
                "text-[0.8125rem] font-medium",
                current ? "text-ink" : "text-ink-faint max-sm:sr-only",
              )}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "h-0.5 min-w-3 flex-1 rounded-full transition-colors duration-300",
                  done ? "bg-iris" : "bg-ink/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default ReservationStepper;
