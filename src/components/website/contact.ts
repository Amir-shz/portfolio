export type SocialKey = "instagram" | "linkedin" | "telegram" | "email";

export interface SocialLink {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
}

export const socials: SocialLink[] = [
  {
    key: "instagram",
    label: "اینستاگرام",
    handle: "fatemeshafiei_",
    href: "https://www.instagram.com/fatemeshafiei_/",
  },
  {
    key: "linkedin",
    label: "لینکدین",
    handle: "fatemeshafiei",
    href: "https://www.linkedin.com/in/fatemeshafiei/",
  },
  {
    key: "telegram",
    label: "تلگرام",
    handle: "io_Psychology1",
    href: "https://t.me/io_Psychology1",
  },
];

export const email: SocialLink = {
  key: "email",
  label: "ایمیل",
  handle: "shf.iopsy@gmail.com",
  href: "mailto:shf.iopsy@gmail.com",
};

export const phone = {
  display: "۰۹۹۳۴۲۰۵۴۰۵",
  href: "tel:09934205405",
  note: "شماره منشی",
};
