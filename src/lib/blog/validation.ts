import { z } from "zod";

const objectId = z.string().regex(/^[a-f0-9]{24}$/i, "شناسه نامعتبر است.");

export const coverImageSchema = z.object({
  url: z.string().url("آدرس عکس نامعتبر است.").max(500),
  alt: z.string().trim().max(200, "متن جایگزین حداکثر ۲۰۰ حرف است.").default(""),
  width: z.number().int().min(0).max(10000).default(0),
  height: z.number().int().min(0).max(10000).default(0),
});

export const postInputSchema = z.object({
  title: z
    .string({ required_error: "عنوان را وارد کنید." })
    .trim()
    .min(3, "عنوان باید حداقل ۳ حرف باشد.")
    .max(120, "عنوان حداکثر ۱۲۰ حرف است."),
  slug: z.string().trim().max(90, "نامک حداکثر ۹۰ حرف است.").default(""),
  excerpt: z.string().trim().max(300, "خلاصه حداکثر ۳۰۰ حرف است.").default(""),
  coverImage: coverImageSchema.nullable().default(null),
  content: z.record(z.unknown()),
  categoryId: objectId.nullable().default(null),
  tags: z.array(z.string().max(40)).max(10, "حداکثر ۱۰ برچسب مجاز است.").default([]),
  status: z.enum(["draft", "published"]),
  publishedAt: z
    .string()
    .datetime({ offset: true, message: "تاریخ انتشار نامعتبر است." })
    .nullable()
    .default(null),
  featured: z.boolean().default(false),
  seo: z
    .object({
      title: z.string().trim().max(70, "عنوان سئو حداکثر ۷۰ حرف است.").default(""),
      description: z.string().trim().max(170, "توضیح سئو حداکثر ۱۷۰ حرف است.").default(""),
    })
    .default({ title: "", description: "" }),
});

export type PostInput = z.input<typeof postInputSchema>;

export const categoryInputSchema = z.object({
  name: z
    .string({ required_error: "نام دسته را وارد کنید." })
    .trim()
    .min(2, "نام دسته باید حداقل ۲ حرف باشد.")
    .max(60, "نام دسته حداکثر ۶۰ حرف است."),
  slug: z.string().trim().max(80).default(""),
  order: z.number().int().min(0).max(999).default(0),
});

export type CategoryInput = z.input<typeof categoryInputSchema>;

export { objectId };
