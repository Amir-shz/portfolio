"use client";

import { useFormStatus } from "react-dom";

function PlanRowBtn() {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className=" bg-purple-400 text-neutral-50 py-2 px-4 leading-4 rounded-md hover:bg-purple-500 duration-200 font-semibold text-sm h-8 "
      disabled={status.pending}
    >
      {status.pending && <div className="loaderDotMiniWhite"></div>}
      {!status.pending && "تغییر"}
    </button>
  );
}

export default PlanRowBtn;
