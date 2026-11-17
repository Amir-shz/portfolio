import sharp from "sharp";

const MAX_PIXELS = 25_000_000;
const MAX_EDGE = 512;
const HEIC_BRANDS = new Set(["heic", "heix", "hevc", "hevx"]);

export function isHeic(input: Buffer) {
  if (input.length < 16 || input.toString("latin1", 4, 8) !== "ftyp") return false;
  const size = input.readUInt32BE(0);
  if (size < 16 || size > input.length || size % 4 !== 0) return false;

  if (HEIC_BRANDS.has(input.toString("latin1", 8, 12))) return true;
  for (let offset = 16; offset < size; offset += 4) {
    if (HEIC_BRANDS.has(input.toString("latin1", offset, offset + 4))) return true;
  }
  return false;
}

async function decodeHeic(input: Buffer) {
  const { default: libheif } = await import("libheif-js/wasm-bundle.js");
  const context = libheif.heif_context_alloc();
  if (!context) throw new Error("Unable to allocate HEIC context");

  try {
    const { code } = libheif.heif_context_read_from_memory(context, input);
    if (code !== libheif.heif_error_Ok) throw new Error("Invalid HEIC container");

    const handle = libheif.heif_js_context_get_primary_image_handle(context);
    if ("code" in handle) throw new Error("Missing primary HEIC image");
    try {
      const width = libheif.heif_image_handle_get_width(handle);
      const height = libheif.heif_image_handle_get_height(handle);
      if (width <= 0 || height <= 0 || width * height > MAX_PIXELS) {
        throw new Error("Invalid HEIC image dimensions");
      }

      const decoded = libheif.heif_js_decode_image2(
        handle,
        libheif.heif_colorspace_RGB,
        libheif.heif_chroma_interleaved_RGBA,
      );
      if ("code" in decoded) throw new Error("Invalid HEIC image");
      try {
        const plane = decoded.channels.find((channel) => channel.id === libheif.heif_channel_interleaved);
        const rowBytes = width * 4;
        if (!plane || plane.stride < rowBytes || plane.data.length < plane.stride * height) {
          throw new Error("Missing or incomplete HEIC pixels");
        }

        // Copy the plane before releasing its WebAssembly memory.
        const data = Buffer.alloc(rowBytes * height);
        for (let row = 0; row < height; row++) {
          const offset = row * plane.stride;
          data.set(plane.data.subarray(offset, offset + rowBytes), row * rowBytes);
        }
        return { data, width, height };
      } finally {
        libheif.heif_image_release(decoded.image);
      }
    } finally {
      libheif.heif_image_handle_release(handle);
    }
  } finally {
    libheif.heif_context_free(context);
  }
}

export async function encodeProfilePhoto(input: Buffer, heic: boolean) {
  const options = { failOn: "error", limitInputPixels: MAX_PIXELS } as const;
  const pixels = heic ? await decodeHeic(input) : null;
  const source = pixels
    ? sharp(pixels.data, {
        ...options,
        raw: { width: pixels.width, height: pixels.height, channels: 4 },
      })
    : sharp(input, options).rotate();

  return source
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#fff" })
    .jpeg({ quality: 80 })
    .toBuffer();
}
