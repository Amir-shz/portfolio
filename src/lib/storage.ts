// Server-only Supabase Storage uploads and image URL validation.
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
const bucket = process.env.SUPABASE_STORAGE_BUCKET?.trim();

function getSupabaseObjectUrl() {
  if (!bucket || bucket === "." || bucket === "..") return null;
  const value = process.env.SUPABASE_URL?.trim();
  if (!value || !URL.canParse(value)) return null;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.port || url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
  return `${url.origin}/storage/v1/object`;
}

const objectUrl = getSupabaseObjectUrl();
const bucketPath = encodeURIComponent(bucket ?? "");
export const supabasePublicBucketUrl = objectUrl && `${objectUrl}/public/${bucketPath}/`;

export type ImageType = { ext: "jpg" | "png" | "webp"; contentType: string };

/** Detects the real image type from its first bytes (never trust file.type). */
export function detectImageType(bytes: Uint8Array): ImageType | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", contentType: "image/jpeg" };
  }
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { ext: "png", contentType: "image/png" };
  }
  const header = String.fromCharCode(...bytes.slice(0, 12));
  if (header.startsWith("RIFF") && header.slice(8, 12) === "WEBP") {
    return { ext: "webp", contentType: "image/webp" };
  }
  return null;
}

export function isStorageConfigured() {
  return Boolean(objectUrl && secretKey?.startsWith("sb_secret_"));
}

/** Uploads a public file and returns its URL. */
export async function uploadPublicFile({
  key,
  body,
  contentType,
}: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<string> {
  if (!supabasePublicBucketUrl || !secretKey?.startsWith("sb_secret_")) {
    throw new Error("Supabase Storage is not configured");
  }
  const path = key.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${objectUrl}/${bucketPath}/${path}`, {
    method: "POST",
    redirect: "error",
    headers: {
      apikey: secretKey,
      "Content-Type": contentType,
      "Cache-Control": "max-age=31536000",
    },
    body: new Uint8Array(body),
  });
  if (!response.ok) throw new Error(`Supabase Storage upload failed (HTTP ${response.status})`);
  return `${supabasePublicBucketUrl}${path}`;
}

// Existing posts can still contain links to Liara.
function legacyImageHosts() {
  const hosts = new Set<string>(["upbeat-lalande-wgsbtfocx.storage.c2.liara.space"]);
  const endpoint = process.env.LIARA_ENDPOINT ?? process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const legacyBucket = process.env.LIARA_BUCKET_NAME ?? process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;
  if (endpoint && legacyBucket) {
    const value = endpoint.includes("://") ? endpoint : `https://${endpoint}`;
    if (URL.canParse(value)) hosts.add(`${legacyBucket}.${new URL(value).hostname}`);
  }
  return hosts;
}

const liaraHosts = legacyImageHosts();

/** True for our public Supabase bucket and legacy Liara image URLs. */
export function isAllowedImageSrc(src: unknown): src is string {
  if (typeof src !== "string" || !URL.canParse(src)) return false;
  const url = new URL(src);
  if (url.protocol !== "https:" || url.port || url.username || url.password || url.search) return false;
  return liaraHosts.has(url.hostname) || Boolean(supabasePublicBucketUrl && url.href.startsWith(supabasePublicBucketUrl));
}
