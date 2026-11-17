// Server-only: turns the editor's Tiptap JSON into safe HTML for visitors.
// The JSON is cleaned first (only allowed image hosts, no in-progress
// uploads), rendered with the same extensions the editor uses, then passed
// through an explicit sanitize-html allowlist as a second line of defence.
import { renderToHTMLString } from "@tiptap/static-renderer/pm/html-string";
import sanitizeHtml from "sanitize-html";
import { blogExtensions } from "./extensions";
import { slugify } from "./slug";
import type { Heading } from "./types";
import { isAllowedImageSrc } from "@/lib/storage";

export const MAX_CONTENT_BYTES = 1.5 * 1024 * 1024;
const WORDS_PER_MINUTE = 200;

type JSONNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  content?: JSONNode[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
};

export type RenderedPost = {
  html: string;
  headings: Heading[];
  plainText: string;
  wordCount: number;
  readingTime: number;
  imageCount: number;
  content: JSONNode;
};

export class ContentError extends Error {}

/** Drops image nodes that are uploading or come from elsewhere. */
function cleanNode(node: JSONNode): JSONNode | null {
  if (node.type === "image") {
    if (node.attrs?.uploadId || !isAllowedImageSrc(node.attrs?.src)) return null;
    return { ...node, attrs: { ...node.attrs, uploadId: null } };
  }
  if (!node.content) return node;
  const content = node.content.map(cleanNode).filter((n): n is JSONNode => n !== null);
  return { ...node, content };
}

function nodeText(node: JSONNode): string {
  if (node.type === "text") return node.text ?? "";
  return (node.content ?? []).map(nodeText).join("");
}

const BLOCKS = new Set([
  "paragraph",
  "heading",
  "blockquote",
  "listItem",
  "codeBlock",
  "tableCell",
  "tableHeader",
]);

/** Text blocks for search/reading time (each block once). */
function collectBlocks(node: JSONNode, out: string[]) {
  if (node.type && BLOCKS.has(node.type) && node.type !== "listItem" && node.type !== "blockquote") {
    const text = nodeText(node).trim();
    if (text) out.push(text);
    if (node.type !== "tableCell" && node.type !== "tableHeader") return;
  }
  (node.content ?? []).forEach((child) => collectBlocks(child, out));
}

/** Every node of `type`, in document (pre-)order — the same order as the HTML. */
function collectNodes(node: JSONNode, type: string, out: JSONNode[] = []) {
  if (node.type === type) out.push(node);
  (node.content ?? []).forEach((child) => collectNodes(child, type, out));
  return out;
}

const COLOR = /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\))$/i;

function sanitize(html: string, siteHost: string | null) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "em", "u", "s", "code", "pre",
      "blockquote", "ul", "ol", "li", "hr", "a", "span", "mark", "sub", "sup",
      "figure", "figcaption", "img", "table", "colgroup", "col", "thead",
      "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      figure: ["class", "data-align", "data-width"],
      mark: ["data-color", "style"],
      span: ["style"],
      p: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      th: ["colspan", "rowspan", "style"],
      td: ["colspan", "rowspan", "style"],
      col: ["style", "span"],
      table: ["style"],
      pre: ["dir"],
      code: ["class"],
      ol: ["start", "type"],
    },
    allowedClasses: {
      figure: ["blog-figure", "align-center", "align-wide", "align-right", "align-left", "w-50", "w-75", "w-100"],
      code: [/^language-[a-z0-9-]+$/],
    },
    allowedStyles: {
      "*": {
        color: [COLOR, /^inherit$/],
        "background-color": [COLOR],
        "text-align": [/^(right|left|center|justify)$/],
      },
      table: { "min-width": [/^\d{1,4}px$/], width: [/^\d{1,4}px$/] },
      col: { "min-width": [/^\d{1,4}px$/], width: [/^\d{1,4}px$/] },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    exclusiveFilter: (frame) => frame.tag === "img" && !isAllowedImageSrc(frame.attribs.src),
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        let external = false;
        try {
          const url = new URL(href);
          external = /^https?:$/.test(url.protocol) && url.hostname !== siteHost;
        } catch {
          external = false;
        }
        const out: Record<string, string> = { href };
        if (external) {
          out.target = "_blank";
          out.rel = "noopener noreferrer nofollow";
        }
        return { tagName: "a", attribs: out };
      },
    },
  });
}

/** Adds ids to h2–h4 in document order and wraps tables for horizontal scroll. */
function decorate(html: string, headingIds: string[]) {
  let index = 0;
  return html
    .replace(/<h([2-4])(\s[^>]*)?>/g, (match, level: string, attrs = "") => {
      const id = headingIds[index++];
      return id ? `<h${level} id="${id}"${attrs}>` : match;
    })
    .replace(/<table/g, '<div class="table-wrap"><table')
    .replace(/<\/table>/g, "</table></div>");
}

export function renderPost(raw: unknown): RenderedPost {
  const serialized = JSON.stringify(raw ?? null);
  if (serialized.length > MAX_CONTENT_BYTES) {
    throw new ContentError("حجم متن نوشته بیش از حد مجاز است.");
  }
  const doc = raw as JSONNode;
  if (!doc || typeof doc !== "object" || doc.type !== "doc" || !Array.isArray(doc.content)) {
    throw new ContentError("ساختار متن نوشته نامعتبر است.");
  }

  const content = cleanNode(doc) as JSONNode;

  let html: string;
  try {
    html = renderToHTMLString({ content, extensions: blogExtensions() });
  } catch (error) {
    console.error("renderPost failed:", error);
    throw new ContentError("متن نوشته قابل پردازش نیست.");
  }

  const blocks: string[] = [];
  collectBlocks(content, blocks);
  const headingNodes = collectNodes(content, "heading");
  const imageCount = collectNodes(content, "image").length;

  const used = new Set<string>();
  const headingIds: string[] = [];
  const headings: Heading[] = [];
  headingNodes.forEach((node, i) => {
    const text = nodeText(node).trim();
    let id = slugify(text) || `section-${i + 1}`;
    let n = 2;
    while (used.has(id)) id = `${slugify(text) || "section"}-${n++}`;
    used.add(id);
    headingIds.push(id);
    const level = Number(node.attrs?.level ?? 2);
    if (text && (level === 2 || level === 3)) headings.push({ id, text, level });
  });

  let siteHost: string | null = null;
  try {
    siteHost = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "").hostname;
  } catch {
    siteHost = null;
  }

  const safe = decorate(sanitize(html, siteHost), headingIds);
  const plainText = blocks.join("\n");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  return {
    html: safe,
    headings,
    plainText,
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    imageCount,
    content,
  };
}
