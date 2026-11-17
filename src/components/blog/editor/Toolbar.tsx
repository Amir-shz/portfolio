"use client";

import { useEffect, useRef } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  ChevronDown,
  Code,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  Subscript,
  Superscript,
  Table2,
  Underline,
  Undo2,
} from "lucide-react";
import {
  HIGHLIGHT_COLORS,
  LinkForm,
  Swatches,
  TEXT_COLORS,
  ToolButton,
  ToolDivider,
  ToolPopover,
} from "./controls";
import { cn } from "@/lib/utils";

const BLOCKS = [
  { key: "p", label: "متن معمولی", level: 0 },
  { key: "h2", label: "تیتر ۲", level: 2 },
  { key: "h3", label: "تیتر ۳", level: 3 },
  { key: "h4", label: "تیتر ۴", level: 4 },
] as const;

/**
 * One Tab stop for the whole toolbar; arrow keys move between controls
 * (Left = next in RTL), Home/End jump to the ends.
 */
function useRovingToolbar(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = () =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-tb]")).filter(
        (el) => !(el as HTMLButtonElement).disabled,
      );
    const setActive = (target: HTMLElement) => {
      for (const el of root.querySelectorAll<HTMLElement>("[data-tb]")) {
        el.tabIndex = el === target ? 0 : -1;
      }
    };
    const first = items()[0];
    if (first) setActive(first);

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (t.hasAttribute("data-tb")) setActive(t);
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (!t.hasAttribute("data-tb")) return;
      const list = items();
      const i = list.indexOf(t);
      if (i < 0) return;
      let next: HTMLElement | undefined;
      if (e.key === "ArrowLeft") next = list[(i + 1) % list.length];
      else if (e.key === "ArrowRight") next = list[(i - 1 + list.length) % list.length];
      else if (e.key === "Home") next = list[0];
      else if (e.key === "End") next = list[list.length - 1];
      if (next) {
        e.preventDefault();
        setActive(next);
        next.focus();
      }
    };
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("keydown", onKey);
    };
  }, [ref]);
}

function Toolbar({
  editor,
  onPickImage,
  className,
}: {
  editor: Editor;
  onPickImage: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useRovingToolbar(ref);

  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
      level: ([2, 3, 4] as const).find((l) => e.isActive("heading", { level: l })) ?? 0,
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      code: e.isActive("code"),
      color: (e.getAttributes("textStyle").color as string | undefined) ?? null,
      highlight: (e.getAttributes("highlight").color as string | undefined) ?? null,
      isHighlight: e.isActive("highlight"),
      link: e.isActive("link"),
      align: (["right", "center", "left", "justify"] as const).find((a) =>
        e.isActive({ textAlign: a }),
      ),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      codeBlock: e.isActive("codeBlock"),
      sub: e.isActive("subscript"),
      sup: e.isActive("superscript"),
      table: e.isActive("table"),
    }),
  });

  const chain = () => editor.chain().focus();
  const currentBlock = BLOCKS.find((b) => b.level === s.level) ?? BLOCKS[0];

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label="ابزارهای قالب‌بندی متن"
      aria-orientation="horizontal"
      className={cn(
        "glass flex flex-wrap items-center gap-0.5 rounded-2xl p-1.5 shadow-glass",
        className,
      )}
    >
      <ToolButton label="واگرد (Ctrl+Z)" disabled={!s.canUndo} onClick={() => chain().undo().run()}>
        <Undo2 />
      </ToolButton>
      <ToolButton label="از نو (Ctrl+Y)" disabled={!s.canRedo} onClick={() => chain().redo().run()}>
        <Redo2 />
      </ToolButton>
      <ToolDivider />

      <ToolPopover
        label="نوع بلوک"
        active={s.level > 0}
        trigger={
          <>
            <span className="min-w-[4.25rem] text-start text-[0.8125rem] font-medium">
              {currentBlock.label}
            </span>
            <ChevronDown className="!size-3.5" aria-hidden />
          </>
        }
        panelClassName="w-40 p-1"
      >
        {(close) => (
          <ul className="grid">
            {BLOCKS.map((b) => (
              <li key={b.key}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (b.level === 0) chain().setParagraph().run();
                    else chain().toggleHeading({ level: b.level }).run();
                    close();
                  }}
                  className={cn(
                    "w-full cursor-pointer rounded-lg px-2.5 py-1.5 text-start hover:bg-iris-wash",
                    b.level === 2 && "text-lg font-bold",
                    b.level === 3 && "text-base font-bold",
                    b.level === 4 && "text-[0.9375rem] font-semibold",
                    b.level === 0 && "text-sm",
                    b.level === s.level && "bg-iris-tint text-iris-deep",
                  )}
                >
                  {b.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </ToolPopover>
      <ToolDivider />

      <ToolButton label="پررنگ (Ctrl+B)" active={s.bold} onClick={() => chain().toggleBold().run()}>
        <Bold />
      </ToolButton>
      <ToolButton label="ایتالیک (Ctrl+I)" active={s.italic} onClick={() => chain().toggleItalic().run()}>
        <Italic />
      </ToolButton>
      <ToolButton label="زیرخط (Ctrl+U)" active={s.underline} onClick={() => chain().toggleUnderline().run()}>
        <Underline />
      </ToolButton>
      <ToolButton label="خط‌خورده" active={s.strike} onClick={() => chain().toggleStrike().run()}>
        <Strikethrough />
      </ToolButton>
      <ToolButton label="کد درون‌خطی" active={s.code} onClick={() => chain().toggleCode().run()}>
        <Code />
      </ToolButton>
      <ToolDivider />

      <ToolPopover
        label="رنگ متن"
        active={Boolean(s.color)}
        trigger={
          <span className="relative grid place-items-center">
            <Baseline className="size-4" aria-hidden />
            <span
              aria-hidden
              className="absolute -bottom-1 h-0.5 w-4 rounded-full"
              style={{ background: s.color ?? "currentColor" }}
            />
          </span>
        }
      >
        {(close) => (
          <Swatches
            kind="text"
            colors={TEXT_COLORS}
            current={s.color}
            onPick={(value) => {
              if (value) chain().setColor(value).run();
              else chain().unsetColor().run();
              close();
            }}
          />
        )}
      </ToolPopover>
      <ToolPopover label="هایلایت" active={s.isHighlight} trigger={<Highlighter className="size-4" aria-hidden />}>
        {(close) => (
          <Swatches
            kind="highlight"
            colors={HIGHLIGHT_COLORS}
            current={s.highlight}
            onPick={(value) => {
              if (value) chain().setHighlight({ color: value }).run();
              else chain().unsetHighlight().run();
              close();
            }}
          />
        )}
      </ToolPopover>
      <ToolPopover label="لینک (Ctrl+K)" active={s.link} trigger={<Link2 className="size-4" aria-hidden />}>
        {(close) => <LinkForm editor={editor} onDone={close} />}
      </ToolPopover>
      <ToolDivider />

      <ToolButton label="راست‌چین" active={!s.align || s.align === "right"} onClick={() => chain().setTextAlign("right").run()}>
        <AlignRight />
      </ToolButton>
      <ToolButton label="وسط‌چین" active={s.align === "center"} onClick={() => chain().setTextAlign("center").run()}>
        <AlignCenter />
      </ToolButton>
      <ToolButton label="چپ‌چین" active={s.align === "left"} onClick={() => chain().setTextAlign("left").run()}>
        <AlignLeft />
      </ToolButton>
      <ToolButton label="تراز دوطرفه" active={s.align === "justify"} onClick={() => chain().setTextAlign("justify").run()}>
        <AlignJustify />
      </ToolButton>
      <ToolDivider />

      <ToolButton label="فهرست نقطه‌ای" active={s.bullet} onClick={() => chain().toggleBulletList().run()}>
        <List />
      </ToolButton>
      <ToolButton label="فهرست شماره‌دار" active={s.ordered} onClick={() => chain().toggleOrderedList().run()}>
        <ListOrdered />
      </ToolButton>
      <ToolButton label="نقل قول" active={s.quote} onClick={() => chain().toggleBlockquote().run()}>
        <Quote />
      </ToolButton>
      <ToolButton label="بلوک کد" active={s.codeBlock} onClick={() => chain().toggleCodeBlock().run()}>
        <SquareCode />
      </ToolButton>
      <ToolButton label="خط جداکننده" onClick={() => chain().setHorizontalRule().run()}>
        <Minus />
      </ToolButton>
      <ToolDivider />

      <ToolButton label="درج عکس" onClick={onPickImage}>
        <ImagePlus />
      </ToolButton>
      <ToolButton
        label="درج جدول"
        active={s.table}
        disabled={s.table}
        onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table2 />
      </ToolButton>
      <ToolDivider />

      <ToolButton label="زیرنویس" active={s.sub} onClick={() => chain().toggleSubscript().run()}>
        <Subscript />
      </ToolButton>
      <ToolButton label="بالانویس" active={s.sup} onClick={() => chain().toggleSuperscript().run()}>
        <Superscript />
      </ToolButton>
      <ToolButton label="پاک کردن قالب‌بندی" onClick={() => chain().unsetAllMarks().clearNodes().run()}>
        <RemoveFormatting />
      </ToolButton>
    </div>
  );
}

export default Toolbar;
