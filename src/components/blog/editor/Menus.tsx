"use client";

import { useEffect, useId, useState } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Columns3,
  Highlighter,
  ImageUp,
  Italic,
  Link2,
  PanelTop,
  RectangleHorizontal,
  Rows3,
  Strikethrough,
  Trash2,
  TriangleAlert,
  Underline,
} from "lucide-react";
import { HIGHLIGHT_COLORS, LinkForm, ToolButton, ToolDivider } from "./controls";
import type { ImageAlign, ImageWidth } from "@/lib/blog/extensions";
import { cn } from "@/lib/utils";

const menuClass = "glass-strong flex items-center gap-0.5 rounded-xl p-1";

/** Quick marks for a text selection. */
export function TextBubbleMenu({ editor }: { editor: Editor }) {
  const [linkOpen, setLinkOpen] = useState(false);
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      highlight: e.isActive("highlight"),
      link: e.isActive("link"),
    }),
  });
  const chain = () => editor.chain().focus();

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textBubble"
      options={{ placement: "top" }}
      shouldShow={({ editor: e, state }) => {
        const { empty } = state.selection;
        return !empty && !e.isActive("image") && !e.isActive("codeBlock") && e.isEditable;
      }}
    >
      {linkOpen ? (
        <div className="glass-strong rounded-xl p-2">
          <LinkForm editor={editor} onDone={() => setLinkOpen(false)} />
        </div>
      ) : (
        <div className={menuClass} role="toolbar" aria-label="قالب‌بندی متن انتخاب‌شده">
          <ToolButton label="پررنگ" active={s.bold} onClick={() => chain().toggleBold().run()}>
            <Bold />
          </ToolButton>
          <ToolButton label="ایتالیک" active={s.italic} onClick={() => chain().toggleItalic().run()}>
            <Italic />
          </ToolButton>
          <ToolButton label="زیرخط" active={s.underline} onClick={() => chain().toggleUnderline().run()}>
            <Underline />
          </ToolButton>
          <ToolButton label="خط‌خورده" active={s.strike} onClick={() => chain().toggleStrike().run()}>
            <Strikethrough />
          </ToolButton>
          <ToolDivider />
          <ToolButton
            label="هایلایت"
            active={s.highlight}
            onClick={() =>
              s.highlight
                ? chain().unsetHighlight().run()
                : chain().setHighlight({ color: HIGHLIGHT_COLORS[1].value }).run()
            }
          >
            <Highlighter />
          </ToolButton>
          <ToolButton label="لینک" active={s.link} onClick={() => setLinkOpen(true)}>
            <Link2 />
          </ToolButton>
        </div>
      )}
    </BubbleMenu>
  );
}

const ALIGNS: { value: ImageAlign; label: string; icon: typeof AlignRight }[] = [
  { value: "right", label: "کنار متن، راست", icon: AlignRight },
  { value: "center", label: "وسط", icon: AlignCenter },
  { value: "left", label: "کنار متن، چپ", icon: AlignLeft },
  { value: "wide", label: "تمام‌عرض", icon: RectangleHorizontal },
];
const WIDTHS: ImageWidth[] = [50, 75, 100];
const faPct = (n: number) => `${n.toLocaleString("fa-IR")}٪`;

/** Layout, alt text and caption for the selected image. */
export function ImageBubbleMenu({
  editor,
  onReplace,
}: {
  editor: Editor;
  onReplace: () => void;
}) {
  const attrs = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e.isActive("image")
        ? (e.getAttributes("image") as {
            alt?: string;
            caption?: string;
            align?: ImageAlign;
            widthPct?: ImageWidth;
            uploadId?: string | null;
          })
        : null,
  });
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const altId = useId();
  const capId = useId();

  useEffect(() => {
    setAlt(attrs?.alt ?? "");
    setCaption(attrs?.caption ?? "");
  }, [attrs?.alt, attrs?.caption]);

  const update = (value: Record<string, unknown>) =>
    editor.chain().updateAttributes("image", value).run();

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="imageBubble"
      options={{ placement: "bottom", offset: 10 }}
      shouldShow={({ editor: e, element, view }) =>
        e.isActive("image") &&
        e.isEditable &&
        (view.hasFocus() || element.contains(document.activeElement))
      }
    >
      <div className="glass-strong w-[19rem] rounded-xl p-2.5 sm:w-[21rem]">
        {attrs?.uploadId ? (
          <p className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
            <span className="spinner size-3.5 border-2 text-iris" />
            در حال آپلود عکس…
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-0.5">
              {ALIGNS.map(({ value, label, icon: Icon }) => (
                <ToolButton
                  key={value}
                  label={label}
                  active={(attrs?.align ?? "center") === value}
                  onClick={() => update({ align: value })}
                >
                  <Icon />
                </ToolButton>
              ))}
              <ToolDivider />
              {WIDTHS.map((w) => (
                <button
                  key={w}
                  type="button"
                  aria-pressed={(attrs?.widthPct ?? 100) === w}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => update({ widthPct: w })}
                  className={cn(
                    "h-8 cursor-pointer rounded-lg px-2 text-[0.75rem] font-medium text-ink-soft hover:bg-iris-wash",
                    (attrs?.widthPct ?? 100) === w && "bg-iris-tint text-iris-deep",
                  )}
                >
                  {faPct(w)}
                </button>
              ))}
              <ToolDivider />
              <ToolButton label="جایگزینی عکس" onClick={onReplace}>
                <ImageUp />
              </ToolButton>
              <ToolButton
                label="حذف عکس"
                className="text-danger-deep hover:bg-danger-tint hover:text-danger-deep"
                onClick={() => editor.chain().focus().deleteSelection().run()}
              >
                <Trash2 />
              </ToolButton>
            </div>
            <div className="mt-2 grid gap-1.5">
              <label htmlFor={altId} className="text-[0.6875rem] font-medium text-ink-soft">
                متن جایگزین (برای نابینایان و سئو)
              </label>
              <input
                id={altId}
                value={alt}
                maxLength={200}
                onChange={(e) => setAlt(e.target.value)}
                onBlur={() => update({ alt: alt.trim() })}
                onKeyDown={(e) => e.key === "Enter" && update({ alt: alt.trim() })}
                placeholder="مثلاً: جلسه کارگاه مدیریت زمان"
                className="input min-h-0 py-1.5 text-sm"
              />
              {!alt.trim() && (
                <p className="flex items-center gap-1 text-[0.6875rem] text-warn-deep">
                  <TriangleAlert className="size-3" aria-hidden />
                  بهتر است برای هر عکس متن جایگزین بنویسید.
                </p>
              )}
              <label htmlFor={capId} className="mt-1 text-[0.6875rem] font-medium text-ink-soft">
                زیرنویس (اختیاری)
              </label>
              <input
                id={capId}
                value={caption}
                maxLength={200}
                onChange={(e) => setCaption(e.target.value)}
                onBlur={() => update({ caption: caption.trim() })}
                onKeyDown={(e) => e.key === "Enter" && update({ caption: caption.trim() })}
                className="input min-h-0 py-1.5 text-sm"
              />
            </div>
          </>
        )}
      </div>
    </BubbleMenu>
  );
}

/** Row/column controls while the cursor is inside a table. */
export function TableBubbleMenu({ editor }: { editor: Editor }) {
  const chain = () => editor.chain().focus();
  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableBubble"
      options={{ placement: "top" }}
      shouldShow={({ editor: e, state }) => e.isActive("table") && state.selection.empty && e.isEditable}
    >
      <div className={cn(menuClass, "flex-wrap")} role="toolbar" aria-label="ابزارهای جدول">
        <ToolButton label="سطر بالا" onClick={() => chain().addRowBefore().run()}>
          <Rows3 />
        </ToolButton>
        <ToolButton label="سطر پایین" onClick={() => chain().addRowAfter().run()}>
          <Rows3 className="rotate-180" />
        </ToolButton>
        <ToolButton label="ستون قبل" onClick={() => chain().addColumnBefore().run()}>
          <Columns3 />
        </ToolButton>
        <ToolButton label="ستون بعد" onClick={() => chain().addColumnAfter().run()}>
          <Columns3 className="-scale-x-100" />
        </ToolButton>
        <ToolButton label="سطر عنوان" onClick={() => chain().toggleHeaderRow().run()}>
          <PanelTop />
        </ToolButton>
        <ToolDivider />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => chain().deleteRow().run()}
          className="h-8 cursor-pointer rounded-lg px-2 text-[0.75rem] text-ink-soft hover:bg-danger-tint hover:text-danger-deep"
        >
          حذف سطر
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => chain().deleteColumn().run()}
          className="h-8 cursor-pointer rounded-lg px-2 text-[0.75rem] text-ink-soft hover:bg-danger-tint hover:text-danger-deep"
        >
          حذف ستون
        </button>
        <ToolButton
          label="حذف جدول"
          className="text-danger-deep hover:bg-danger-tint hover:text-danger-deep"
          onClick={() => chain().deleteTable().run()}
        >
          <Trash2 />
        </ToolButton>
      </div>
    </BubbleMenu>
  );
}
