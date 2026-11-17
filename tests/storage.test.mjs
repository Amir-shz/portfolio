import assert from "node:assert/strict";
import { test } from "node:test";

process.env.SUPABASE_URL = "https://test.supabase.co/";
process.env.SUPABASE_STORAGE_BUCKET = "images";
process.env.SUPABASE_SECRET_KEY = "sb_secret_test";

const { isAllowedImageSrc, isStorageConfigured, uploadPublicFile } = await import("../src/lib/storage.ts");

test("uploads images to Supabase and only accepts URLs from trusted storage", async (t) => {
  assert.equal(isStorageConfigured(), true);
  const data = { key: "blog/2026/11/test image.webp", body: Buffer.from([12, 34]), contentType: "image/webp" };
  const fetch = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://test.supabase.co/storage/v1/object/images/blog/2026/11/test%20image.webp");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.apikey, "sb_secret_test");
    assert.equal(options.headers["Content-Type"], "image/webp");
    assert.deepEqual([...options.body], [12, 34]);
    return new Response(null, { status: 200 });
  });

  const url = await uploadPublicFile(data);
  assert.equal(url, "https://test.supabase.co/storage/v1/object/public/images/blog/2026/11/test%20image.webp");
  assert.equal(isAllowedImageSrc(url), true);
  assert.equal(isAllowedImageSrc(url.replace("/public/images/", "/public/elsewhere/")), false);
  assert.equal(isAllowedImageSrc(url.replace("test.supabase.co", "other.supabase.co")), false);
  assert.equal(isAllowedImageSrc("https://upbeat-lalande-wgsbtfocx.storage.c2.liara.space/users/old.png"), true);

  fetch.mock.mockImplementation(async () => new Response(null, { status: 403 }));
  await assert.rejects(uploadPublicFile(data), /HTTP 403/);
});
