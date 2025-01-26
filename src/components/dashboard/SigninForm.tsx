"use client";

import { login } from "@/lib/actions";
import { useActionState } from "react";

function SigninForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form
      action={action}
      className=" w-full flex flex-col items-center gap-8 [&_input]:border [&_input]:bg-neutral-50 [&_input]:rounded-lg [&_input]:border-neutral-400 [&_input]:py-3 [&_input]:pr-3 [&_input:focus]:border [&_input:focus]:border-purple-500 [&_input:focus]:outline-none [&_input:focus~p]:top-0 [&_input:focus~p]:text-neutral-800"
    >
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
      <label className=" relative w-full">
        <input
          type="password"
          name="password"
          className=" w-full notShownLogin"
          placeholder=""
          required
        />
        <p className="absolute -translate-y-1/2 -translate-x-3 text-neutral-400 text-[0.875rem] font-medium leading-4 transition-all duration-200 bg-transparent backdrop-blur-sm px-2 py-[0.12rem] top-1/2 rounded-2xl">
          رمزعبور
        </p>
      </label>
      {state?.errors?.password && (
        <>
          <p className=" text-right text-error-500 font-medium w-full text-sm -mb-4">
            رمزعبور باید:
          </p>
          <div className=" text-sm flex flex-col w-full items-end text-error-500 font-medium ">
            <ul>
              {state.errors.password.map((error) => (
                <li key={error} className=" text-left">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {state?.message && (
        <p className=" text-sm w-full text-right text-error-500 font-medium ">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-purple-500 hover:bg-purple-600 duration-300 text-neutral-50 rounded-md w-full h-12 flex justify-center items-center text-xl font-bold"
      >
        {pending && <div className="loaderDotMiniWhite"></div>}
        {!pending && "ورود"}
      </button>
    </form>
  );
}

export default SigninForm;
