"use client";

import { changeUserData } from "@/lib/actions";
import { useActionState } from "react";
import { CircleAlert } from "lucide-react";
import { Field } from "@/components/system/Field";

// The server action reads the current user from the session, so no
// user identifiers are sent from the browser.
function ChangeUserDataForm() {
  const [state, action, pending] = useActionState(changeUserData, undefined);

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
      {state?.message && (
        <p className="flex items-center gap-2 rounded-xl bg-danger-tint px-4 py-3 text-sm font-semibold text-danger-deep">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {state?.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary btn-sm justify-self-start px-6">
        {pending ? <span className="loaderDotMiniWhite my-1.5" /> : "ذخیره اطلاعات"}
      </button>
    </form>
  );
}

export default ChangeUserDataForm;
