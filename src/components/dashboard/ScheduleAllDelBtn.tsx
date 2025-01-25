"use client";

import { useFormStatus } from "react-dom";

function ScheduleAllDelBtn() {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className="bg-red-500 hover:bg-red-700 duration-300 text-neutral-50 rounded-md w-56 h-12 flex justify-center items-center"
    >
      {status.pending && <div className="loaderDotMiniWhite"></div>}
      {!status.pending && "حذف همه زمان بندی ها"}
    </button>
  );
}

export default ScheduleAllDelBtn;
