import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function CardNumberBox() {
  const cardNumber = "5859 8311 9630 5477";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-row-reverse items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-3 py-1 max-w-80 min-w-72 mt-4">
      <span className="text-lg font-medium" style={{ direction: "ltr" }}>
        {digitsEnToFa(cardNumber)}
      </span>
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:text-black"
      >
        <Copy size={20} />
      </button>
      {copied && (
        <span className="text-green-600 text-sm ml-2 max-sm:text-xs max-sm:-ml-4">
          کپی شد!
        </span>
      )}
    </div>
  );
}
