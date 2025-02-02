import ClockIcon from "@/components/icons/ClockIcon";
import DollarIcon from "@/components/icons/DollarIcon";
import { planData } from "@/data/planData";
import { useReservationStore } from "@/hooks/useReservationStore";

function ReservationDetail() {
  const { plan } = useReservationStore();

  const detail = planData?.filter(
    (el: {
      id: number;
      title: string;
      description: string;
      time: string;
      price: string;
    }) => el.id === plan
  )[0];

  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-col gap-3 ">
        <p className=" text-neutral-700 text-xl font-bold leading-7 flex justify-center">
          {detail.title}
        </p>
        <p className=" text-neutral-700 text-lg font-semibold leading-5 flex justify-center">
          {detail.description}
        </p>
        <div className=" flex gap-4">
          <div className=" flex gap-1 items-center">
            <DollarIcon />
            <p className=" text-neutral-500 text-base font-semibold leading-4">
              {detail.price === "free" ? "رایگان" : detail.price}
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
