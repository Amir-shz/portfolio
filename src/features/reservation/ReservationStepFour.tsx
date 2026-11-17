import { CircleCheckBig } from "lucide-react";
import { useReservationStore } from "@/hooks/useReservationStore";
import { useRouter } from "next/navigation";
import StepActions from "./StepActions";

function ReservationStepFour() {
  const { handleStep, hide, resetAll, showModal } = useReservationStore();
  const router = useRouter();

  function finish() {
    if (showModal) {
      // desktop dialog
      hide();
      handleStep(1);
    } else {
      // phone page
      router.push("/services");
      setTimeout(() => {
        resetAll();
      }, 200);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-ok-tint text-ok">
          <CircleCheckBig className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="mt-4 text-base font-bold text-ink">نوبت شما ثبت شد</h3>
        <p className="mt-1 max-w-md text-sm leading-7 text-ink-soft">
          بعد از واریز، لطفا عکس فیش یا رسیدش رو به تلگرام یا شماره تماسی که در
          قسمت ارتباط با ما هستن، ارسال کنید.
        </p>
      </div>
      <StepActions>
        <button type="button" className="btn btn-primary w-full" autoFocus onClick={finish}>
          بسیار خوب
        </button>
      </StepActions>
    </div>
  );
}

export default ReservationStepFour;
