import { useReservationStore } from "@/hooks/useReservationStore";

function TimeRadio({ hour }: { hour: { hour: string; isAvailable: boolean } }) {
  const { selectedTime, handleSelectedTimeChange } = useReservationStore();

  return (
    <label>
      <input
        type="radio"
        name="time"
        disabled={!hour.isAvailable}
        value={hour.hour}
        checked={selectedTime === hour.hour}
        onChange={handleSelectedTimeChange}
        className="size-0 absolute invisible opacity-0 "
      />
      <div
        className={`rounded-xl border py-[1.2rem] flex justify-center
          ${selectedTime === hour.hour && "border-purple-500"}
          ${
            hour.isAvailable
              ? " border-neutral-300 cursor-pointer"
              : " border-neutral-200"
          }`}
      >
        <p
          className={`
            text-base font-medium leading-[1.125rem]
          ${hour.isAvailable ? " text-neutral-800" : " text-neutral-300"}
          `}
        >
          {hour.hour}
        </p>
      </div>
    </label>
  );
}

export default TimeRadio;
