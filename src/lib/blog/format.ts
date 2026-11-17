// Display helpers for blog dates and numbers (Persian calendar, Tehran time,
// so a post published after midnight in Iran never shows the previous day).

const TZ = "Asia/Tehran";

export function formatJalali(iso: string | null | undefined, withWeekday = false): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fa-IR", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withWeekday ? { weekday: "long" } : {}),
  });
}

export function formatJalaliDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("fa-IR", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const faNumber = (n: number) => n.toLocaleString("fa-IR");

export const readingTimeLabel = (minutes: number) => `${faNumber(Math.max(1, minutes))} دقیقه مطالعه`;
