import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

// sign up

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

// change userData
export const userDataFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

// change password

export const changePassSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
  newPassword: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

// login API (server side)
export const loginApiSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128),
});

// public reservation (server side)
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return value;
  let phone = value
    .replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(arabicDigits.indexOf(d)))
    .replace(/[\s-]/g, "");
  if (phone.startsWith("+98")) phone = "0" + phone.slice(3);
  else if (phone.startsWith("0098")) phone = "0" + phone.slice(4);
  else if (phone.startsWith("98") && phone.length === 12)
    phone = "0" + phone.slice(2);
  else if (phone.startsWith("9") && phone.length === 10) phone = "0" + phone;
  return phone;
}

export const reservationSchema = z.object({
  plan: z.number().int().positive(),
  fullName: z
    .string()
    .trim()
    .min(2, "نام و نام‌خانوادگی را کامل وارد کنید.")
    .max(100, "نام وارد شده بیش از حد طولانی است."),
  phone: z.preprocess(
    normalizePhone,
    z.string().regex(/^09\d{9}$/, "شماره همراه وارد شده نامعتبر است."),
  ),
  description: z
    .string()
    .trim()
    .max(1000, "توضیحات حداکثر می‌تواند ۱۰۰۰ کاراکتر باشد.")
    .optional()
    .default(""),
  selectedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "تاریخ انتخاب شده نامعتبر است."),
  selectedTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت انتخاب شده نامعتبر است."),
});

// create schedule (dashboard)
export const scheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "لطفا تاریخ را انتخاب کنید."),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "لطفا ساعت را انتخاب کنید."),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        newPassword?: string[];
      };
      message?: string;
    }
  | undefined;
