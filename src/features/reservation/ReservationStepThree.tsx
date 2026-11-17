import CardNumberBox from "@/components/ui/CardNumberBox";
import { useReservationStore } from "@/hooks/useReservationStore";
import { CreditCard } from "lucide-react";
import StepActions from "./StepActions";

function ReservationStepThree() {
  const { handleStep } = useReservationStore();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-iris-tint text-iris">
          <CreditCard className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="mt-4 text-base font-bold text-ink">واریز مبلغ جلسه</h3>
        <p className="mt-1 max-w-md text-sm leading-7 text-ink-soft">
          لطفا برای فیکس کردن نوبتتون، مبلغ پلن رزرو شدتون رو به شماره کارت زیر
          واریز فرمایید
        </p>
        <CardNumberBox />
      </div>
      <StepActions>
        <button
          type="button"
          className="btn btn-primary w-full"
          autoFocus
          onClick={() => handleStep(4)}
        >
          بسیار خوب
        </button>
      </StepActions>
    </div>
  );
}

export default ReservationStepThree;
