// Client helpers for putting images into a post: upload to our API, and the
// "placeholder while uploading" flow used by toolbar, slash menu, drop and paste.
import type { Editor } from "@tiptap/core";

export type UploadedImage = { url: string; width: number; height: number };

export const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 8 * 1024 * 1024;

export async function uploadBlogImage(file: File): Promise<UploadedImage> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
    throw new Error("فقط عکس‌های JPG، PNG یا WEBP مجاز هستند.");
  }
  if (file.size > MAX_BYTES) throw new Error("حجم عکس باید حداکثر ۸ مگابایت باشد.");

  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/v1/blog/upload", { method: "POST", body });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.url) throw new Error(data?.message ?? "آپلود عکس با مشکل مواجه شد.");
  return { url: data.url, width: data.width ?? 0, height: data.height ?? 0 };
}

function findImagePos(editor: Editor, uploadId: string) {
  let found: { pos: number; attrs: Record<string, unknown> } | null = null;
  editor.state.doc.descendants((node, pos) => {
    if (found) return false;
    if (node.type.name === "image" && node.attrs.uploadId === uploadId) {
      found = { pos, attrs: node.attrs };
      return false;
    }
    return true;
  });
  return found as { pos: number; attrs: Record<string, unknown> } | null;
}

/**
 * Inserts each image at `pos` (or the cursor) right away with a local
 * preview, uploads it, then swaps in the real URL. Failed uploads are removed.
 */
export async function insertImageFiles(
  editor: Editor,
  files: File[],
  {
    pos,
    onError,
    onPendingChange,
  }: {
    pos?: number;
    onError: (message: string) => void;
    onPendingChange?: (delta: number) => void;
  },
) {
  let at = pos;
  for (const file of files) {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      onError("فقط عکس‌های JPG، PNG یا WEBP مجاز هستند.");
      continue;
    }
    if (file.size > MAX_BYTES) {
      onError("حجم عکس باید حداکثر ۸ مگابایت باشد.");
      continue;
    }

    const uploadId = crypto.randomUUID();
    const preview = URL.createObjectURL(file);
    const node = { type: "image", attrs: { src: preview, uploadId, alt: "" } };

    if (typeof at === "number") {
      editor.chain().insertContentAt(at, node).run();
      at = editor.state.selection.to;
    } else {
      editor.chain().focus().insertContent(node).run();
    }

    onPendingChange?.(1);
    try {
      const uploaded = await uploadBlogImage(file);
      const found = findImagePos(editor, uploadId);
      if (found) {
        editor.view.dispatch(
          editor.state.tr.setNodeMarkup(found.pos, undefined, {
            ...found.attrs,
            src: uploaded.url,
            width: uploaded.width || null,
            height: uploaded.height || null,
            uploadId: null,
          }),
        );
      }
    } catch (error) {
      const found = findImagePos(editor, uploadId);
      if (found) {
        const node = editor.state.doc.nodeAt(found.pos);
        if (node) editor.view.dispatch(editor.state.tr.delete(found.pos, found.pos + node.nodeSize));
      }
      onError(error instanceof Error ? error.message : "آپلود عکس با مشکل مواجه شد.");
    } finally {
      onPendingChange?.(-1);
      URL.revokeObjectURL(preview);
    }
  }
}

/** Opens the OS file picker and resolves with the chosen images. */
export function pickImageFiles(multiple = true): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ACCEPTED_IMAGE_TYPES;
    input.multiple = multiple;
    input.onchange = () => resolve(Array.from(input.files ?? []));
    input.click();
  });
}
