"use client";

import { signup } from "@/lib/actions";
import { useActionState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Field } from "@/components/system/Field";
import { cn } from "@/lib/utils";

function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form action={action} className="grid gap-4">
      <Field label="نام و نام خانوادگی" type="text" name="name" required error={state?.errors?.name} />
      <Field
        label="ایمیل"
        type="email"
        name="email"
        dir="ltr"
        className="text-right"
        required
        error={state?.errors?.email}
      />
      <Field
        label="رمزعبور"
        type="password"
        name="password"
        autoComplete="new-password"
        dir="ltr"
        className="text-right"
        required
        error={
          state?.errors?.password && (
            <>
              <p>رمزعبور باید:</p>
              <ul className="list-inside list-disc">
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </>
          )
        }
      />

      {state?.message && (
        <p
          role="status"
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold",
            state.status === "success" ? "bg-ok-tint text-ok-deep" : "bg-danger-tint text-danger-deep",
          )}
        >
          {state.status === "success" ? (
            <CircleCheck className="size-4 shrink-0" aria-hidden />
          ) : (
            <CircleAlert className="size-4 shrink-0" aria-hidden />
          )}
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary mt-1 w-full">
        {pending ? <span className="loaderDotMiniWhite my-2" /> : "ایجاد حساب"}
      </button>
    </form>
  );
}

export default SignupForm;
