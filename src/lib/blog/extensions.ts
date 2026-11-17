// One Tiptap extension list shared by the dashboard editor and the server
// renderer, so the HTML visitors get matches what the author saw.
import { mergeAttributes, type Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

export const IMAGE_ALIGNS = ["center", "wide", "right", "left"] as const;
export const IMAGE_WIDTHS = [50, 75, 100] as const;
export type ImageAlign = (typeof IMAGE_ALIGNS)[number];
export type ImageWidth = (typeof IMAGE_WIDTHS)[number];

/**
 * Block image with layout options. Rendered as
 * <figure class="blog-figure align-* w-*"><img><figcaption></figure>.
 * `uploadId` only exists while the file is uploading in the editor.
 */
export const BlogImage = Image.extend({
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => Number(el.getAttribute("width")) || null,
        renderHTML: (attrs) => (attrs.width ? { width: attrs.width } : {}),
      },
      height: {
        default: null,
        parseHTML: (el) => Number(el.getAttribute("height")) || null,
        renderHTML: (attrs) => (attrs.height ? { height: attrs.height } : {}),
      },
      align: {
        default: "center",
        parseHTML: (el) => el.closest("figure")?.getAttribute("data-align") ?? "center",
        renderHTML: () => ({}),
      },
      widthPct: {
        default: 100,
        parseHTML: (el) => Number(el.closest("figure")?.getAttribute("data-width")) || 100,
        renderHTML: () => ({}),
      },
      caption: {
        default: "",
        parseHTML: (el) => el.closest("figure")?.querySelector("figcaption")?.textContent ?? "",
        renderHTML: () => ({}),
      },
      uploadId: {
        default: null,
        renderHTML: (attrs) => (attrs.uploadId ? { "data-uploading": "true" } : {}),
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const align = (IMAGE_ALIGNS as readonly string[]).includes(node.attrs.align)
      ? node.attrs.align
      : "center";
    const widthPct = (IMAGE_WIDTHS as readonly number[]).includes(node.attrs.widthPct)
      ? node.attrs.widthPct
      : 100;
    const figure = {
      class: `blog-figure align-${align} w-${widthPct}`,
      "data-align": align,
      "data-width": String(widthPct),
    };
    const img = ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)] as const;
    const caption = String(node.attrs.caption ?? "").trim();
    return caption
      ? ["figure", figure, img, ["figcaption", {}, caption]]
      : ["figure", figure, img];
  },
});

export function blogExtensions(): Extensions {
  return [
    StarterKit.configure({
      heading: { levels: [2, 3, 4] },
      codeBlock: { HTMLAttributes: { dir: "ltr" } },
      dropcursor: { color: "#5B2BD9", width: 2 },
      link: {
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: "https",
        protocols: ["http", "https", "mailto"],
        HTMLAttributes: { rel: null, target: null },
        isAllowedUri: (url, ctx) =>
          /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(url) && ctx.defaultValidate(url),
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
      alignments: ["right", "center", "left", "justify"],
      defaultAlignment: "right",
    }),
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    Subscript,
    Superscript,
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    BlogImage.configure({ allowBase64: false, inline: false }),
  ];
}
