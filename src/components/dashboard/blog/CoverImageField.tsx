"use client";

import { useId, useState } from "react";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { pickImageFiles, uploadBlogImage } from "@/components/blog/editor/imageUpload";
import { useToast } from "@/hooks/use-toast";
import type { BlogImageData } from "@/lib/blog/types";

function CoverImageField({
  value,
  onChange,
  onUploadingChange,
}: {
  value: BlogImageData | null;
  onChange: (value: BlogImageData | null) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const altId = useId();

  async function choose() {
    const [file] = await pickImageFiles(false);
    if (!file) return;
    setUploading(true);
    onUploadingChange?.(true);
    try {
      const up = await uploadBlogImage(file);
      onChange({ url: up.url, width: up.width, height: up.height, alt: value?.alt ?? "" });
    } catch (error) {
      toast({
        variant: "destructive",
        description: error instanceof Error ? error.message : "آپلود عکس با مشکل مواجه شد.",
      });
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  return (
    <div>
      {value?.url ? (
        <div className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-iris-wash">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt={value.alt} className="size-full object-cover" />
          {uploading && (
            <span className="absolute inset-0 grid place-items-center bg-white/60">
              <span className="spinner text-iris" />
            </span>
          )}
          <div className="absolute inset-x-2 bottom-2 flex justify-end gap-1.5">
            <button type="button" onClick={choose} disabled={uploading} className="btn btn-glass btn-sm px-2.5 xl:bg-white/85">
              <RefreshCw className="size-3.5" aria-hidden />
              تعویض
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="حذف کاور"
              className="icon-btn size-9 bg-white/85 text-danger-deep hover:bg-danger hover:text-white"
            >
              <Trash2 className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={choose}
          disabled={uploading}
          className="grid aspect-[16/10] w-full cursor-pointer place-items-center rounded-xl border border-dashed border-iris/30 bg-white/40 text-center transition-colors hover:border-iris hover:bg-iris-wash"
        >
          {uploading ? (
            <span className="spinner text-iris" />
          ) : (
            <span className="grid justify-items-center gap-1.5">
              <ImagePlus className="size-6 text-iris" aria-hidden />
              <span className="text-[0.8125rem] font-medium text-ink">انتخاب عکس کاور</span>
              <span className="text-[0.6875rem] text-ink-faint">JPG، PNG یا WEBP تا ۸ مگابایت · نسبت ۱۶ به ۱۰</span>
            </span>
          )}
        </button>
      )}
      {value?.url && (
        <div className="mt-2">
          <label htmlFor={altId} className="text-[0.75rem] font-medium text-ink-soft">
            متن جایگزین کاور
          </label>
          <input
            id={altId}
            value={value.alt}
            maxLength={200}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            placeholder="توضیح کوتاه تصویر"
            className="input mt-1 min-h-0 py-2 text-sm"
          />
        </div>
      )}
    </div>
  );
}

export default CoverImageField;
