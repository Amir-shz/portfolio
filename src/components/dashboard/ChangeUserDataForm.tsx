"use client";

import { changeUserData } from "@/lib/actions";
import { useActionState } from "react";

function ChangeUserDataForm({
  user,
}: {
  user: {
    email: string;
    name: string;
  };
}) {
  // const { data: session } = useSession();
  const [state, action, pending] = useActionState(changeUserData, undefined);

  return (
    <form
      action={action}
      className=" w-full px-4 flex flex-col items-center gap-3 [&_input]:border [&_input]:bg-neutral-50 [&_input]:rounded-lg [&_input]:border-neutral-400 [&_input]:py-2 [&_input]:pr-3 [&_input:focus]:border [&_input:focus]:border-purple-500 [&_input:focus]:outline-none [&_input:focus~p]:top-0 [&_input:focus~p]:text-neutral-800 [&_input:focus~p]:text-xs"
    >
      <input type="hidden" name="oldName" defaultValue={user?.name} />
      <input type="hidden" name="oldEmail" defaultValue={user?.email} />
      <label className=" relative w-full">
        <input
          type="text"
          name="name"
          className=" w-full notShownLogin"
          placeholder=""
          required
        />
        <p className="absolute -translate-y-1/2 -translate-x-3 text-neutral-400 text-[0.875rem] font-medium leading-4 transition-all duration-200 bg-transparent backdrop-blur-sm px-2 py-[0.12rem] top-1/2 rounded-2xl">
          نام و نام خانوادگی
        </p>
      </label>
      {state?.errors?.name && (
        <p className="text-sm w-full text-left text-error-500 font-medium ">
          {state.errors.name}
        </p>
      )}
      <label className=" relative w-full">
        <input
          type="email"
          name="email"
          className=" w-full notShownLogin"
          placeholder=""
          required
        />
        <p className="absolute -translate-y-1/2 -translate-x-3 text-neutral-400 text-[0.875rem] font-medium leading-4 transition-all duration-200 bg-transparent backdrop-blur-sm px-2 py-[0.12rem] top-1/2 rounded-2xl">
          ایمیل
        </p>
      </label>
      {state?.errors?.email && (
        <p className=" text-sm w-full text-left text-error-500 font-medium ">
          {state.errors.email}
        </p>
      )}
      {state?.message && (
        <p className=" text-sm w-full text-right text-error-500 font-medium ">
          {state?.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-purple-500 hover:bg-purple-600 duration-300 text-neutral-50 rounded-md w-1/3 h-9 flex justify-center items-center text-md font-semibold"
      >
        {pending && <div className="loaderDotMiniWhite"></div>}
        {!pending && "تغییر اطلاعات"}
      </button>
    </form>
  );
}

export default ChangeUserDataForm;
