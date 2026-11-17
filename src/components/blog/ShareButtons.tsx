"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { FaLinkedinIn, FaTelegram, FaWhatsapp } from "react-icons/fa6";

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  // decided after mount so server and client render the same markup
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "اشتراک در تلگرام", href: `https://t.me/share/url?url=${u}&text=${t}`, icon: FaTelegram },
    { label: "اشتراک در واتساپ", href: `https://wa.me/?text=${t}%20${u}`, icon: FaWhatsapp },
    { label: "اشتراک در لینکدین", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: FaLinkedinIn },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const btn =
    "icon-btn size-9 border border-white/70 bg-white text-ink-soft hover:bg-iris hover:text-white xl:bg-white/55 xl:backdrop-blur-lg xl:hover:bg-iris";

  return (
    <div className="flex items-center gap-1.5">
      <span className="me-1 text-[0.75rem] text-ink-faint">اشتراک:</span>
      {canShare && (
        <button
          type="button"
          aria-label="اشتراک‌گذاری"
          className={btn}
          onClick={() => navigator.share({ title, url }).catch(() => {})}
        >
          <Share2 className="size-4" aria-hidden />
        </button>
      )}
      {links.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={btn}>
          <Icon className="size-4" aria-hidden />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="کپی لینک نوشته" className={btn}>
        {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "لینک کپی شد" : ""}
      </span>
    </div>
  );
}

export default ShareButtons;
