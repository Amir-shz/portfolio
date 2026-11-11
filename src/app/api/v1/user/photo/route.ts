import { getCurrentUser } from "@/lib/session";
import User from "@/models/userModel";
import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Upload happens on the server so the storage credentials never reach the
// browser. Use server-only env names (WITHOUT the NEXT_PUBLIC_ prefix).
const accessKeyId = process.env.LIARA_ACCESS_KEY;
const secretAccessKey = process.env.LIARA_SECRET_KEY;
const endpoint = process.env.LIARA_ENDPOINT;
const bucket = process.env.LIARA_BUCKET_NAME;

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// detect the real file type from its first bytes (don't trust file.type)
function detectImageType(bytes: Uint8Array) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", contentType: "image/jpeg" };
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return { ext: "png", contentType: "image/png" };
  }
  const header = String.fromCharCode(...bytes.slice(0, 12));
  if (header.startsWith("RIFF") && header.slice(8, 12) === "WEBP") {
    return { ext: "webp", contentType: "image/webp" };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    console.error("Photo upload: LIARA_* environment variables are missing");
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
    const s3 = new S3({ accessKeyId, secretAccessKey, endpoint });

    const response = await s3
      .upload({
        Bucket: bucket,
        // random key: users cannot overwrite each other's (or any other) files
        Key: `users/${String(user._id)}-${randomUUID()}.${type.ext}`,
        Body: body,
        ContentType: type.contentType,
        ACL: "public-read",
      })
      .promise();

    await User.updateOne({ _id: user._id }, { photo: response.Location });

    revalidatePath("/dashboard", "layout");

    return NextResponse.json({ status: "success", url: response.Location });
  } catch (error) {
    console.error("Photo upload failed:", error);
    return NextResponse.json(
      { message: "آپلود عکس با مشکل مواجه شد" },
      { status: 500 },
    );
  }
}
