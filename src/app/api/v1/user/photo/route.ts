import { getCurrentUser } from "@/lib/session";
import { detectImageType, isStorageConfigured, uploadPublicFile } from "@/lib/storage";
import User from "@/models/userModel";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Upload happens on the server so the storage credentials never reach the
// browser (see src/lib/storage.ts).
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

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

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("photo");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "فایلی ارسال نشده است" }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_SIZE) {
    return NextResponse.json(
      { message: "حجم عکس باید حداکثر ۵ مگابایت باشد" },
      { status: 413 },
    );
  }

  const body = Buffer.from(await file.arrayBuffer());
  const type = detectImageType(body);

  if (!type) {
    return NextResponse.json(
      { message: "فقط عکس‌های JPG، PNG یا WEBP مجاز هستند" },
      { status: 415 },
    );
  }

  try {
    const url = await uploadPublicFile({
      // random key: users cannot overwrite each other's (or any other) files
      key: `users/${String(user._id)}-${randomUUID()}.${type.ext}`,
      body,
      contentType: type.contentType,
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
