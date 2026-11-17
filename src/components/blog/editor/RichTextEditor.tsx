"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState, type JSONContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { blogExtensions } from "@/lib/blog/extensions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Toolbar from "./Toolbar";
import { ImageBubbleMenu, TableBubbleMenu, TextBubbleMenu } from "./Menus";
import { SlashCommand } from "./SlashCommand";
import { insertImageFiles, pickImageFiles, uploadBlogImage } from "./imageUpload";

const fa = (n: number) => n.toLocaleString("fa-IR");

function EditorStats({ editor }: { editor: Editor }) {
  const { words, chars } = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      words: e.storage.characterCount.words() as number,
      chars: e.storage.characterCount.characters() as number,
    }),
  });
  return (
    <div
      aria-live="polite"
      className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-ink-faint"
    >
      <span>{fa(words)} کلمه</span>
      <span>{fa(chars)} حرف</span>
      <span>حدود {fa(Math.max(1, Math.round(words / 200)))} دقیقه مطالعه</span>
      <span className="ms-auto hidden sm:inline">
        برای درج سریع بلوک، در خط خالی <kbd className="rounded border border-ink/15 bg-white px-1">/</kbd> را بزنید
      </span>
    </div>
  );
}

function RichTextEditor({
  initialContent,
  onChange,
  onPendingUploadsChange,
  invalid = false,
}: {
  initialContent: JSONContent | null;
  onChange: (json: JSONContent) => void;
  onPendingUploadsChange?: (count: number) => void;
  invalid?: boolean;
}) {
  const { toast } = useToast();
  const editorRef = useRef<Editor | null>(null);
  const pending = useRef(0);

  const onError = useCallback(
    (message: string) => toast({ variant: "destructive", description: message }),
    [toast],
  );
  const onPendingChange = useCallback(
    (delta: number) => {
      pending.current = Math.max(0, pending.current + delta);
      onPendingUploadsChange?.(pending.current);
    },
    [onPendingUploadsChange],
  );

  const insertFiles = useCallback(
    (files: File[], pos?: number) => {
      const editor = editorRef.current;
      if (!editor || !files.length) return;
      void insertImageFiles(editor, files, { pos, onError, onPendingChange });
    },
    [onError, onPendingChange],
  );

  const pickAndInsert = useCallback(async () => {
    const files = await pickImageFiles(true);
    insertFiles(files);
  }, [insertFiles]);

  // The editor is created once; callbacks it uses are read through refs so
  // re-renders never rebuild it (and never lose the cursor).
  const insertRef = useRef(insertFiles);
  const pickRef = useRef(pickAndInsert);
  const changeRef = useRef(onChange);
  useEffect(() => {
    insertRef.current = insertFiles;
    pickRef.current = pickAndInsert;
    changeRef.current = onChange;
  });

  const [extensions] = useState(() => [
    ...blogExtensions(),
    Placeholder.configure({
      placeholder: ({ node }) =>
        node.type.name === "heading"
          ? "تیتر بخش…"
          : "متن نوشته را اینجا بنویسید؛ برای درج عکس، جدول یا تیتر کلید / را بزنید.",
    }),
    CharacterCount,
    SlashCommand.configure({ onPickImage: () => void pickRef.current() }),
  ]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: initialContent ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class: "prose-blog prose-editor min-h-[55vh] px-1 py-5 outline-none sm:px-2",
        dir: "rtl",
        "aria-label": "متن نوشته",
        "aria-multiline": "true",
        role: "textbox",
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (!files.length) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        insertRef.current(files, pos);
        return true;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (!files.length) return false;
        event.preventDefault();
        insertRef.current(files);
        return true;
      },
    },
    onUpdate: ({ editor: e }) => changeRef.current(e.getJSON()),
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  /** Swaps the selected image for a newly uploaded file. */
  const replaceSelectedImage = useCallback(async () => {
    const e = editorRef.current;
    if (!e || !e.isActive("image")) return;
    const [file] = await pickImageFiles(false);
    if (!file) return;
    const uploadId = crypto.randomUUID();
    e.chain().updateAttributes("image", { uploadId }).run();
    onPendingChange(1);
    const findPos = () => {
      let at = -1;
      e.state.doc.descendants((node, pos) => {
        if (node.type.name === "image" && node.attrs.uploadId === uploadId) at = pos;
        return at < 0;
      });
      return at;
    };
    try {
      const up = await uploadBlogImage(file);
      const pos = findPos();
      if (pos >= 0) {
        const node = e.state.doc.nodeAt(pos)!;
        e.view.dispatch(
          e.state.tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            src: up.url,
            width: up.width || null,
            height: up.height || null,
            uploadId: null,
          }),
        );
      }
    } catch (error) {
      const pos = findPos();
      if (pos >= 0) {
        const node = e.state.doc.nodeAt(pos)!;
        e.view.dispatch(e.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, uploadId: null }));
      }
      onError(error instanceof Error ? error.message : "آپلود عکس با مشکل مواجه شد.");
    } finally {
      onPendingChange(-1);
    }
  }, [onError, onPendingChange]);

  if (!editor) {
    return (
      <div className="grid gap-3">
        <div className="glass h-12 animate-pulse rounded-2xl" />
        <div className="h-[55vh] animate-pulse rounded-2xl bg-white/40" />
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <Toolbar
        editor={editor}
        onPickImage={() => void pickAndInsert()}
        className="sticky top-[4.75rem] z-20"
      />
      <div
        className={cn(
          "rounded-2xl border bg-white px-3 shadow-sm transition-colors sm:px-6 xl:bg-white/70 xl:shadow-glass xl:backdrop-blur-lg",
          invalid ? "border-danger/50" : "border-white/80 focus-within:border-iris/40",
        )}
      >
        <EditorContent editor={editor} />
      </div>
      <EditorStats editor={editor} />
      <TextBubbleMenu editor={editor} />
      <ImageBubbleMenu editor={editor} onReplace={() => void replaceSelectedImage()} />
      <TableBubbleMenu editor={editor} />
    </div>
  );
}

export default RichTextEditor;
