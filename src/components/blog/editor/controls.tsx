"use client";

// Small building blocks shared by the toolbar and the bubble menus.
import { useEffect, useId, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";
import { Check, Link2Off } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
  className,
  ...rest
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">) {
  return (
    <button
      type="button"
      data-tb=""
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-ink-soft transition-colors duration-150 hover:bg-iris-wash hover:text-ink disabled:pointer-events-none disabled:opacity-35 [&>svg]:size-4",
        active && "bg-iris-tint text-iris-deep hover:bg-iris-tint",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ToolDivider() {
  return <span aria-hidden className="mx-0.5 h-5 w-px shrink-0 bg-ink/10" />;
}

/** Button + floating panel that closes on outside click / Escape. */
export function ToolPopover({
  label,
  trigger,
  active = false,
  panelClassName,
  children,
}: {
  label: string;
  trigger: React.ReactNode;
  active?: boolean;
  panelClassName?: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        ref={btnRef}
        type="button"
        data-tb=""
        aria-label={label}
        title={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-8 shrink-0 cursor-pointer items-center gap-0.5 rounded-lg px-1.5 text-ink-soft transition-colors duration-150 hover:bg-iris-wash hover:text-ink [&>svg]:size-4",
          (active || open) && "bg-iris-tint text-iris-deep",
        )}
      >
        {trigger}
      </button>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={label}
          className={cn(
            "glass-strong absolute right-0 top-full z-40 mt-1.5 rounded-xl p-2",
            panelClassName,
          )}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
}

export const TEXT_COLORS = [
  { name: "پیش‌فرض", value: null },
  { name: "بنفش", value: "#5B2BD9" },
  { name: "بنفش تیره", value: "#4A1FBA" },
  { name: "خاکستری", value: "#4A4366" },
  { name: "سبز", value: "#147047" },
  { name: "آبی", value: "#255D85" },
  { name: "نارنجی", value: "#9A4A22" },
  { name: "کهربایی", value: "#8F5600" },
  { name: "قرمز", value: "#AE2342" },
] as const;

export const HIGHLIGHT_COLORS = [
  { name: "بدون هایلایت", value: null },
  { name: "یاسی", value: "#E6DEFB" },
  { name: "سبز ملایم", value: "#DCF3E6" },
  { name: "هلویی", value: "#FCEDE4" },
  { name: "آبی ملایم", value: "#E4F0F9" },
  { name: "زرد ملایم", value: "#FBEFD7" },
  { name: "صورتی ملایم", value: "#FBE2E7" },
] as const;

export function Swatches({
  colors,
  current,
  onPick,
  kind,
}: {
  colors: readonly { name: string; value: string | null }[];
  current: string | null;
  onPick: (value: string | null) => void;
  kind: "text" | "highlight";
}) {
  return (
    <div className="grid w-[11.5rem] grid-cols-5 gap-1.5">
      {colors.map((c) => {
        const selected = (current ?? null) === c.value;
        return (
          <button
            key={c.name}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={selected}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(c.value)}
            className={cn(
              "relative grid size-8 cursor-pointer place-items-center rounded-lg border text-sm font-bold transition-transform hover:scale-105",
              selected ? "border-iris ring-2 ring-iris/25" : "border-ink/10",
            )}
            style={
              c.value
                ? kind === "text"
                  ? { color: c.value, background: "#fff" }
                  : { background: c.value }
                : { background: "#fff" }
            }
          >
            {c.value ? (kind === "text" ? "آ" : "") : <span className="h-px w-5 rotate-45 bg-danger" />}
            {selected && c.value && kind === "highlight" && <Check className="size-3.5 text-ink" />}
          </button>
        );
      })}
    </div>
  );
}

/** Accepts full URLs, mailto:, site paths and bare domains (prefixed with https). */
export function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  if (/^(https?:\/\/|mailto:)/i.test(value)) {
    try {
      new URL(value);
      return value;
    } catch {
      return null;
    }
  }
  if (/^\/(?!\/)/.test(value) || value.startsWith("#")) return value;
  if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(value)) return `https://${value}`;
  return null;
}

/** Inline link field (no browser prompt). */
export function LinkForm({ editor, onDone }: { editor: Editor; onDone: () => void }) {
  const current = (editor.getAttributes("link").href as string | undefined) ?? "";
  const [value, setValue] = useState(current);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function apply() {
    const href = normalizeUrl(value);
    if (!href) {
      setError("آدرس معتبر نیست (مثلاً https://example.com).");
      return;
    }
    const { empty } = editor.state.selection;
    if (empty && !editor.isActive("link")) {
      editor
        .chain()
        .focus()
        .insertContent({ type: "text", text: value.trim(), marks: [{ type: "link", attrs: { href } }] })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    onDone();
  }

  return (
    <form
      className="w-[17rem]"
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      <label htmlFor={inputId} className="text-[0.75rem] font-medium text-ink-soft">
        آدرس لینک
      </label>
      <div className="mt-1 flex gap-1.5">
        <input
          ref={inputRef}
          id={inputId}
          dir="ltr"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder="https://"
          aria-invalid={error ? true : undefined}
          className="input min-h-0 py-1.5 text-left text-sm"
        />
        <button type="submit" className="btn btn-primary btn-sm shrink-0 px-3">
          ثبت
        </button>
      </div>
      {error && <p className="mt-1 text-[0.75rem] text-danger-deep">{error}</p>}
      {current && (
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            onDone();
          }}
          className="mt-2 inline-flex cursor-pointer items-center gap-1 text-[0.75rem] font-medium text-danger-deep hover:underline"
        >
          <Link2Off className="size-3.5" aria-hidden />
          حذف لینک
        </button>
      )}
    </form>
  );
}
