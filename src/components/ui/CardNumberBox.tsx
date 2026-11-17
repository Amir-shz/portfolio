import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CardNumberBox() {
  const cardNumber = "6393 4610 4455 1410";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-5 flex w-full max-w-xs items-center justify-between gap-3 rounded-xl border border-white bg-white/70 p-1.5 ps-4">
      <span dir="ltr" className="select-all text-[0.9375rem] font-semibold text-ink">
        {digitsEnToFa(cardNumber)}
      </span>
      <button
        type="button"
        onClick={copyToClipboard}
        className="btn btn-sm shrink-0 bg-iris-wash text-iris-deep hover:bg-iris-tint"
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        <span aria-live="polite">{copied ? "کپی شد" : "کپی"}</span>
      </button>
    </div>
  );
}
