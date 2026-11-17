"use client";

import { login } from "@/lib/actions";
import { useActionState } from "react";
import { CircleAlert } from "lucide-react";
import { Field } from "@/components/system/Field";

function SigninForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 grid gap-3">
      <Field
        label="ایمیل"
        type="email"
        name="email"
        autoComplete="email"
        dir="ltr"
        className="text-right"
        required
        error={state?.errors?.email?.[0]}
      />
      <Field
        label="رمزعبور"
        type="password"
        name="password"
        autoComplete="current-password"
        dir="ltr"
        className="text-right"
        required
        error={state?.errors?.password?.[0]}
      />

      {state?.message && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl bg-danger-tint px-3.5 py-2.5 text-[0.8125rem] font-medium text-danger-deep"
        >
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary mt-2 w-full">
        {pending ? <span className="loaderDotMiniWhite my-2" /> : "ورود"}
      </button>
    </form>
  );
}

export default SigninForm;
