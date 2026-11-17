"use client";

import { changePass } from "@/lib/actions";
import { useActionState } from "react";
import { CircleAlert } from "lucide-react";
import { Field } from "@/components/system/Field";
import { cn } from "@/lib/utils";

function ChangePassForm() {
  const [state, action, pending] = useActionState(changePass, undefined);

  return (
    <form action={action} className="grid gap-4">
      <Field
        label="رمزعبور فعلی"
        type="password"
        autoComplete="current-password"
        name="password"
        dir="ltr"
        className="text-right"
        required
        error={state?.errors?.password}
      />
      <Field
        label="رمزعبور جدید"
        type="password"
        autoComplete="new-password"
        name="newPassword"
        dir="ltr"
        className="text-right"
        required
      />
      {state?.errors?.newPassword && (
        <p
          className={cn(
            "-mt-2 text-sm font-semibold",
            state.status === "success" ? "text-ok-deep" : "text-danger-deep",
          )}
        >
          {state.errors.newPassword}
        </p>
      )}

      {state?.message && (
        <p className="flex items-center gap-2 rounded-xl bg-danger-tint px-4 py-3 text-sm font-semibold text-danger-deep">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {state?.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary btn-sm justify-self-start px-6">
        {pending ? <span className="loaderDotMiniWhite my-1.5" /> : "تغییر رمزعبور"}
      </button>
    </form>
  );
}

export default ChangePassForm;
