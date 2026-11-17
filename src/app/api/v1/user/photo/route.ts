import { getCurrentUser } from "@/lib/session";
import { encodeProfilePhoto, isHeic } from "@/lib/profilePhoto";
import { detectImageType, isStorageConfigured, uploadPublicFile } from "@/lib/storage";
import User from "@/models/userModel";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Upload happens on the server so the storage credentials never reach the
// browser (see src/lib/storage.ts).
const MAX_SIZE = 10 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_SIZE + 64 * 1024; // Allow multipart overhead.

function photoTooLarge() {
  return NextResponse.json(
    { message: "حجم عکس باید حداکثر ۱۰ مگابایت باشد" },
    { status: 413 },
  );
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (!isStorageConfigured()) {
    console.error("Photo upload: Supabase Storage is not configured");
    return NextResponse.json(
      { message: "آپلود عکس در حال حاضر فعال نیست" },
      { status: 500 },
    );
  }

  if (Number(req.headers.get("content-length")) > MAX_REQUEST_SIZE) return photoTooLarge();

  let received = 0;
  const stream = req.body?.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      received += chunk.byteLength;
      if (received > MAX_REQUEST_SIZE) throw new RangeError("Photo request exceeds size limit");
      controller.enqueue(chunk);
    },
  }));
  const formData = await new Response(stream, {
    headers: { "content-type": req.headers.get("content-type") ?? "" },
  }).formData().catch(() => null);
  if (received > MAX_REQUEST_SIZE) return photoTooLarge();
  const file = formData?.get("photo");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "فایلی ارسال نشده است" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) return photoTooLarge();

  const input = Buffer.from(await file.arrayBuffer());
  const heic = isHeic(input);

  if (!heic && !detectImageType(input)) {
    return NextResponse.json(
      { message: "فقط عکس‌های JPG، PNG، WebP و HEIC مجاز هستند" },
      { status: 415 },
    );
  }

  let body: Buffer;
  try {
    body = await encodeProfilePhoto(input, heic);
  } catch {
    return NextResponse.json(
      { message: "عکس قابل پردازش نیست. یک عکس معتبر با حداکثر ۲۵ مگاپیکسل انتخاب کنید" },
      { status: 422 },
    );
  }

  try {
    const url = await uploadPublicFile({
      // random key: users cannot overwrite each other's (or any other) files
      key: `users/${String(user._id)}-${randomUUID()}.jpg`,
      body,
      contentType: "image/jpeg",
    });

    await User.updateOne({ _id: user._id }, { photo: url });

    revalidatePath("/dashboard", "layout");

    return NextResponse.json({ status: "success", url });
  } catch (error) {
    console.error("Photo upload failed:", error);
    return NextResponse.json(
      { message: "آپلود عکس با مشکل مواجه شد" },
      { status: 500 },
    );
  }
}
