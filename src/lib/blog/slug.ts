// Persian-safe slugs for post and category URLs.
// "روانشناسی سازمانی در ۱۴۰۵!" -> "روانشناسی-سازمانی-در-1405"

const ARABIC_TO_PERSIAN: Record<string, string> = {
  "ي": "ی",
  "ى": "ی",
  "ك": "ک",
  "ة": "ه",
  "ۀ": "ه",
  "أ": "ا",
  "إ": "ا",
};

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export const MAX_SLUG_LENGTH = 80;

export function slugify(input: string): string {
  let s = (input ?? "").normalize("NFKC").trim().toLowerCase();
  s = s.replace(/[يىكةۀأإ]/g, (c) => ARABIC_TO_PERSIAN[c] ?? c);
  // Arabic diacritics and tatweel
  s = s.replace(/[ً-ٰٟـ]/g, "");
  // digits to Latin so URLs stay readable everywhere
  s = s
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));
  // ZWNJ, whitespace and underscores become dashes
  s = s.replace(/[‌‍\s_]+/g, "-");
  // keep letters, numbers and dashes only
  s = s.replace(/[^\p{L}\p{N}-]+/gu, "");
  s = s.replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (s.length > MAX_SLUG_LENGTH) {
    const cut = s.slice(0, MAX_SLUG_LENGTH);
    s = cut.includes("-") ? cut.slice(0, cut.lastIndexOf("-")) : cut;
  }
  return s;
}

/**
 * Returns `base`, or `base-2`, `base-3`… — the first one `isTaken` rejects.
 */
export async function uniqueSlug(
  base: string,
  isTaken: (slug: string) => Promise<boolean>,
): Promise<string> {
  const root = base || `post-${Date.now().toString(36)}`;
  if (!(await isTaken(root))) return root;
  for (let i = 2; i < 200; i++) {
    const candidate = `${root.slice(0, MAX_SLUG_LENGTH - 4)}-${i}`;
    if (!(await isTaken(candidate))) return candidate;
  }
  return `${root.slice(0, MAX_SLUG_LENGTH - 8)}-${Date.now().toString(36)}`;
}

/** Normalises a tag the way it is stored: trimmed, no leading #, single spaces. */
export function normalizeTag(tag: string): string {
  return (tag ?? "")
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/^#+/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .slice(0, 30);
}
