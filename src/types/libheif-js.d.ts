declare module "libheif-js/wasm-bundle.js" {
  type HeifError = { code: object };
  type HeifHandle = { delete(): void };
  type HeifChannel = { id: object; stride: number; data: Uint8Array };

  const libheif: {
    heif_error_Ok: object;
    heif_colorspace_RGB: object;
    heif_chroma_interleaved_RGBA: object;
    heif_channel_interleaved: object;
    heif_context_alloc(): object | null;
    heif_context_free(context: object): void;
    heif_context_read_from_memory(context: object, input: Uint8Array): HeifError;
    heif_js_context_get_primary_image_handle(context: object): HeifHandle | HeifError;
    heif_image_handle_get_width(handle: HeifHandle): number;
    heif_image_handle_get_height(handle: HeifHandle): number;
    heif_image_handle_release(handle: HeifHandle): void;
    heif_js_decode_image2(handle: HeifHandle, colorspace: object, chroma: object):
      | { image: object; channels: HeifChannel[] }
      | HeifError;
    heif_image_release(image: object): void;
  };

  export default libheif;
}
