"use client";

import { useId, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { normalizeTag } from "@/lib/blog/slug";
import { cn } from "@/lib/utils";

const MAX_TAGS = 10;

/** Chip input: Enter or comma adds, Backspace on empty removes the last tag. */
function TagInput({
  value,
  onChange,
  suggestions,
  error,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions: string[];
  error?: string;
}) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const listId = useId();

  const add = (raw: string) => {
    const tag = normalizeTag(raw);
    if (!tag || value.includes(tag) || value.length >= MAX_TAGS) return;
    onChange([...value, tag]);
    setText("");
  };

  const matches = useMemo(() => {
    const q = normalizeTag(text);
    return suggestions.filter((s) => !value.includes(s) && (!q || s.includes(q))).slice(0, 6);
  }, [suggestions, text, value]);

  return (
    <div className="relative">
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-ink-soft">
        برچسب‌ها
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "mt-1.5 flex min-h-11 cursor-text flex-wrap items-center gap-1.5 rounded-xl border bg-white/70 p-1.5 transition-colors",
          error ? "border-danger/50" : "border-ink/10 focus-within:border-iris focus-within:shadow-[0_0_0_3px_rgba(91,43,217,0.14)]",
        )}
      >
        {value.map((tag) => (
          <span key={tag} className="chip bg-iris-wash py-0.5 pe-1 text-[0.75rem] text-iris-deep">
            #{tag}
            <button
              type="button"
              aria-label={`حذف برچسب ${tag}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(value.filter((t) => t !== tag));
              }}
              className="grid size-4 cursor-pointer place-items-center rounded-full hover:bg-iris hover:text-white"
            >
              <X className="size-3" aria-hidden />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          value={text}
          role="combobox"
          aria-expanded={focused && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          disabled={value.length >= MAX_TAGS}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => setFocused(false), 120);
            if (text.trim()) add(text);
          }}
          onChange={(e) => {
            const v = e.target.value;
            if (/[,،]$/.test(v)) add(v.slice(0, -1));
            else setText(v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(text);
            } else if (e.key === "Backspace" && !text && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          placeholder={value.length ? "" : "مثلاً: کنکور، مدیریت زمان"}
          className="min-w-[6rem] flex-1 bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-ink-faint"
        />
      </div>
      <p className="mt-1 text-[0.6875rem] text-ink-faint">
        با Enter یا ویرگول اضافه کنید · حداکثر {MAX_TAGS.toLocaleString("fa-IR")} برچسب
      </p>
      {error && <p className="field-error">{error}</p>}
      {focused && matches.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="glass-strong absolute inset-x-0 top-full z-30 mt-1 max-h-48 overflow-y-auto rounded-xl p-1"
        >
          {matches.map((m) => (
            <li key={m} role="option" aria-selected={false}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => add(m)}
                className="w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-start text-sm hover:bg-iris-wash"
              >
                #{m}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagInput;
