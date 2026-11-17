"use client";

// Typing "/" at the start of an empty line opens a menu of blocks to insert.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Extension, type Editor, type Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, { type SuggestionProps } from "@tiptap/suggestion";
import { computePosition, flip, offset, shift } from "@floating-ui/dom";
import {
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  SquareCode,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SlashItem = {
  title: string;
  hint: string;
  keywords: string;
  icon: LucideIcon;
  run: (editor: Editor, range: Range) => void;
};

function buildItems(onPickImage: () => void): SlashItem[] {
  return [
    { title: "متن معمولی", hint: "پاراگراف", keywords: "p paragraph text متن", icon: Pilcrow, run: (e, r) => e.chain().focus().deleteRange(r).setParagraph().run() },
    { title: "تیتر ۲", hint: "عنوان بخش", keywords: "h2 heading تیتر عنوان", icon: Heading2, run: (e, r) => e.chain().focus().deleteRange(r).setHeading({ level: 2 }).run() },
    { title: "تیتر ۳", hint: "زیرعنوان", keywords: "h3 heading تیتر", icon: Heading3, run: (e, r) => e.chain().focus().deleteRange(r).setHeading({ level: 3 }).run() },
    { title: "تیتر ۴", hint: "عنوان کوچک", keywords: "h4 heading تیتر", icon: Heading4, run: (e, r) => e.chain().focus().deleteRange(r).setHeading({ level: 4 }).run() },
    { title: "عکس", hint: "آپلود و درج عکس", keywords: "image img photo عکس تصویر", icon: ImagePlus, run: (e, r) => { e.chain().focus().deleteRange(r).run(); onPickImage(); } },
    { title: "فهرست نقطه‌ای", hint: "لیست ساده", keywords: "ul bullet list فهرست لیست", icon: List, run: (e, r) => e.chain().focus().deleteRange(r).toggleBulletList().run() },
    { title: "فهرست شماره‌دار", hint: "مراحل", keywords: "ol ordered number فهرست شماره", icon: ListOrdered, run: (e, r) => e.chain().focus().deleteRange(r).toggleOrderedList().run() },
    { title: "نقل قول", hint: "جمله برجسته", keywords: "quote blockquote نقل قول", icon: Quote, run: (e, r) => e.chain().focus().deleteRange(r).toggleBlockquote().run() },
    { title: "جدول", hint: "۳×۳ با سطر عنوان", keywords: "table جدول", icon: Table2, run: (e, r) => e.chain().focus().deleteRange(r).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { title: "بلوک کد", hint: "کد چپ‌چین", keywords: "code کد", icon: SquareCode, run: (e, r) => e.chain().focus().deleteRange(r).toggleCodeBlock().run() },
    { title: "خط جداکننده", hint: "جدا کردن بخش‌ها", keywords: "hr divider line خط جدا", icon: Minus, run: (e, r) => e.chain().focus().deleteRange(r).setHorizontalRule().run() },
  ];
}

type ListHandle = { onKeyDown: (event: KeyboardEvent) => boolean };

const SlashList = forwardRef<ListHandle, SuggestionProps<SlashItem>>(function SlashList(
  { items, command },
  ref,
) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => setIndex(0), [items]);
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  useImperativeHandle(ref, () => ({
    onKeyDown: (event) => {
      if (!items.length) return false;
      if (event.key === "ArrowDown") {
        setIndex((i) => (i + 1) % items.length);
        return true;
      }
      if (event.key === "ArrowUp") {
        setIndex((i) => (i - 1 + items.length) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        command(items[index]);
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="glass-strong w-64 overflow-hidden rounded-xl p-1">
      {items.length === 0 ? (
        <p className="px-3 py-2 text-[0.8125rem] text-ink-faint">موردی پیدا نشد</p>
      ) : (
        <ul ref={listRef} role="listbox" aria-label="درج بلوک" className="max-h-72 overflow-y-auto">
          {items.map((item, i) => (
            <li key={item.title} role="option" aria-selected={i === index} data-index={i}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setIndex(i)}
                onClick={() => command(item)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-start",
                  i === index && "bg-iris-wash",
                )}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-ink/10 bg-white text-ink-soft">
                  <item.icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.8125rem] font-semibold text-ink">{item.title}</span>
                  <span className="block text-[0.6875rem] text-ink-faint">{item.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export const SlashCommand = Extension.create<{ onPickImage: () => void }>({
  name: "slashCommand",

  addOptions() {
    return { onPickImage: () => {} };
  },

  addProseMirrorPlugins() {
    const items = buildItems(() => this.options.onPickImage());
    return [
      Suggestion<SlashItem>({
        editor: this.editor,
        char: "/",
        startOfLine: true,
        allowSpaces: false,
        items: ({ query }) => {
          const q = query.trim().toLowerCase();
          return q
            ? items.filter((i) => i.title.includes(q) || i.keywords.toLowerCase().includes(q))
            : items;
        },
        command: ({ editor, range, props }) => props.run(editor, range),
        render: () => {
          let renderer: ReactRenderer<ListHandle, SuggestionProps<SlashItem>> | null = null;
          let el: HTMLElement | null = null;

          const place = (props: SuggestionProps<SlashItem>) => {
            const rect = props.clientRect?.();
            if (!el || !rect) return;
            computePosition({ getBoundingClientRect: () => rect }, el, {
              placement: "bottom-start",
              strategy: "fixed",
              middleware: [offset(8), flip(), shift({ padding: 8 })],
            }).then(({ x, y }) => {
              if (el) Object.assign(el.style, { left: `${x}px`, top: `${y}px` });
            });
          };

          return {
            onStart: (props) => {
              renderer = new ReactRenderer(SlashList, { props, editor: props.editor });
              el = renderer.element as HTMLElement;
              Object.assign(el.style, { position: "fixed", zIndex: "70", left: "0", top: "0" });
              el.setAttribute("dir", "rtl");
              document.body.appendChild(el);
              place(props);
            },
            onUpdate: (props) => {
              renderer?.updateProps(props);
              place(props);
            },
            onKeyDown: ({ event }) => {
              if (event.key === "Escape") {
                el?.remove();
                return true;
              }
              return renderer?.ref?.onKeyDown(event) ?? false;
            },
            onExit: () => {
              el?.remove();
              renderer?.destroy();
              renderer = null;
              el = null;
            },
          };
        },
      }),
    ];
  },
});
