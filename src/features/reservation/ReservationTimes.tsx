import TimeRadio from "@/components/ui/TimeRadio";

function ReservationTimes({ hours }) {
  return (
    <div className="mt-4">
      <div className="mb-2">
        <p className="text-neutral-700 text-base font-semibold leading-4">
          زمان
        </p>
      </div>
      <div className=" grid grid-cols-6 gap-x-6 gap-y-2">
        {hours?.map((hour) => (
          <TimeRadio key={hour.hour} hour={hour} />
        ))}
      </div>
    </div>
  );
}

export default ReservationTimes;
