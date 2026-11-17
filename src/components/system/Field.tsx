import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Floating-label inputs shared by every form in the app (booking, login,
// dashboard). The label sits inside the field and rises when it has focus
// or a value; it relies on `placeholder=" "` and the .field CSS in globals.

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: React.ReactNode;
  wrapperClassName?: string;
};

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, className, wrapperClassName, id, ...props },
  ref,
) {
  return (
    <div className={wrapperClassName}>
      <label className="field">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          className={cn(
            "input peer",
            error && "border-danger/60 focus:border-danger",
            className,
          )}
          {...props}
        />
        <span className="field-label">{label}</span>
      </label>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
});

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: React.ReactNode;
  wrapperClassName?: string;
};

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField({ label, error, className, wrapperClassName, ...props }, ref) {
    return (
      <div className={wrapperClassName}>
        <label className="field">
          <textarea
            ref={ref}
            placeholder=" "
            aria-invalid={error ? true : undefined}
            className={cn("input peer min-h-28 resize-none pt-6 leading-7", className)}
            {...props}
          />
          <span className="field-label">{label}</span>
        </label>
        {error && <div className="field-error">{error}</div>}
      </div>
    );
  },
);
