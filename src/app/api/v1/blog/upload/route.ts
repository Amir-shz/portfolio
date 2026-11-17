import { getCurrentUser } from "@/lib/session";
import { addHit } from "@/lib/rateLimit";
import { detectImageType, isStorageConfigured, uploadPublicFile } from "@/lib/storage";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Images for blog posts (cover and inline). Admin only.
// Every upload is re-encoded with sharp: EXIF rotation applied, metadata
// stripped, resized to at most 1920px wide and stored as WebP.
const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_WIDTH = 1920;
const UPLOADS_PER_HOUR = 60;

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "ابتدا وارد حساب شوید" }, { status: 401 });
  }

  if (addHit(`blog-upload:${String(user._id)}`, 60 * 60 * 1000) > UPLOADS_PER_HOUR) {
    return NextResponse.json(
      { message: "تعداد آپلودها زیاد است؛ کمی بعد دوباره تلاش کنید" },
      { status: 429 },
    );
  }

  if (!isStorageConfigured()) {
    console.error("Blog upload: Supabase Storage is not configured");
    return NextResponse.json(
      { message: "آپلود عکس در حال حاضر فعال نیست" },
      { status: 500 },
    );
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "فایلی ارسال نشده است" }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_SIZE) {
    return NextResponse.json(
      { message: "حجم عکس باید حداکثر ۸ مگابایت باشد" },
      { status: 413 },
    );
  }

  const input = Buffer.from(await file.arrayBuffer());
  if (!detectImageType(input)) {
    return NextResponse.json(
      { message: "فقط عکس‌های JPG، PNG یا WEBP مجاز هستند" },
      { status: 415 },
    );
  }

  let output: { data: Buffer; info: sharp.OutputInfo };
  try {
    output = await sharp(input, { failOn: "error" })
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true });
  } catch {
    return NextResponse.json({ message: "فایل عکس معتبر نیست" }, { status: 415 });
  }

  try {
    const now = new Date();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const url = await uploadPublicFile({
      key: `blog/${now.getUTCFullYear()}/${month}/${randomUUID()}.webp`,
      body: output.data,
      contentType: "image/webp",
    });

    return NextResponse.json({
      url,
      width: output.info.width,
      height: output.info.height,
    });
  } catch (error) {
    console.error("Blog upload failed:", error);
    return NextResponse.json({ message: "آپلود عکس با مشکل مواجه شد" }, { status: 500 });
  }
}
