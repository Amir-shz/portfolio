import { planType } from "@/types/types";
import PlanRowBtn from "./PlanRowBtn";
import { changePlanData } from "@/lib/actions";

async function PlanRow({ plan }: { plan: planType }) {
  const { _id, title, time, price, plan: planNumber } = plan;

  return (
    <form
      action={changePlanData}
      className="w-full grid grid-cols-9 items-center p-3 [&>div]:flex [&>div]:justify-center [&_input]:outline-none [&_input]:py-2 [&_input]:px-4 [&_input]:rounded-md [&_input]:bg-neutral-50 [&_input]:border [&_input]:border-purple-200"
    >
      <div className=" col-span-2">
        <input type="text" name="title" defaultValue={title} />
      </div>
      <div className=" col-span-2">
        <input type="text" name="time" defaultValue={time} />
      </div>
      <div className=" col-span-2">
        <input type="text" name="price" defaultValue={price} />
      </div>
      <div className=" col-span-2">
        <input type="text" name="plan" defaultValue={planNumber} />
      </div>
      <input type="hidden" name="id" defaultValue={_id} />
      <div>
        <PlanRowBtn />
      </div>
    </form>
  );
}

export default PlanRow;
