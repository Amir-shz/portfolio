import ClockIcon from "@/components/icons/ClockIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import usePlans from "@/hooks/usePlans";
import { useReservationStore } from "@/hooks/useReservationStore";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function ReservationDetail() {
  const { plan } = useReservationStore();
  const { data: planData } = usePlans();

  const detail = planData?.filter(
    (el: {
      _id: string;
      title: string;
      time: string;
      price: string;
      plan: string;
    }) => el._id === plan
  )[0];

  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-col gap-3 ">
        <p className=" text-neutral-700 text-xl font-bold leading-7 flex justify-center">
          پلن {digitsEnToFa(detail.plan)}
        </p>
        <p className=" text-neutral-700 text-lg font-semibold leading-5 flex justify-center">
          {detail.title}
        </p>
        <div className=" flex gap-4">
          <div className=" flex gap-1 items-center">
            <DollarIcon />
            <p className=" text-neutral-500 text-base font-semibold leading-4">
              {detail.price === "free" ? "رایگان" : detail.price}
              {detail.price !== "free" && (
                <span className=" text-neutral-400 text-xs font-semibold">
                  {" "}
                  تومان
                </span>
              )}
            </p>
          </div>
          <div className=" flex gap-1 items-center">
            <ClockIcon />
            <p className=" text-neutral-500 text-base font-semibold leading-4">
              {detail.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;
