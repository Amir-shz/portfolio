"use server";
// SECURITY NOTE: every exported function in this file is a Server Action,
// i.e. a public POST endpoint that can be called from any page. The
// route guard (src/proxy.ts) does NOT protect them, so each dashboard action must check the
// session itself (requireUser / requireOwner).

import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import Schedule from "@/models/scheduleModel";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isValidObjectId } from "mongoose";
import { signIn, signOut } from "../auth";
import bcrypt from "bcryptjs";
import {
  changePassSchema,
  FormState,
  reservationSchema,
  scheduleSchema,
  loginFormSchema,
  SignupFormSchema,
  userDataFormSchema,
} from "./zod";
import { requireOwner, requireUser } from "./session";
import { addHit } from "./rateLimit";
import { planData } from "@/data/planData";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SLOT_TAKEN_MESSAGE =
  "این تایم در همین لحظه رزرو شد. ساعت دیگری را برای رزرو انتخاب  کنید.";

// max reservation attempts per IP in one hour
const RESERVATION_IP_LIMIT = 5;
const RESERVATION_IP_WINDOW_MS = 60 * 60 * 1000;
// max open ("new") reservations for one phone number
const MAX_OPEN_RESERVATIONS_PER_PHONE = 3;

async function getClientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

function tehranToday() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Tehran" });
}

// PUBLIC: used by the reservation form on the website
export async function createReservation(data: {
  plan: number;
  fullName: string;
  phone: string;
  description: string;
  selectedDate: string;
  selectedTime: string;
}) {
  const parsed = reservationSchema.safeParse(data);
  if (!parsed.success) {
    return (
      parsed.error.issues[0]?.message ?? "اطلاعات وارد شده نامعتبر است."
    );
  }

  const { plan, fullName, phone, description, selectedDate, selectedTime } =
    parsed.data;

  if (!planData.some((el) => el.id === plan)) {
    return "پلن انتخاب شده نامعتبر است.";
  }

  if (selectedDate <= tehranToday()) {
    return "امکان رزرو برای این تاریخ وجود ندارد.";
  }

  const ip = await getClientIp();
  if (addHit(`reservation:${ip}`, RESERVATION_IP_WINDOW_MS) > RESERVATION_IP_LIMIT) {
    return "تعداد درخواست‌های رزرو شما زیاد است. لطفا کمی بعد دوباره تلاش کنید.";
  }

  await dbConnect();

  const openReservations = await Reservation.countDocuments({
    phone,
    status: "new",
  });
  if (openReservations >= MAX_OPEN_RESERVATIONS_PER_PHONE) {
    return "برای این شماره همراه چند رزرو فعال ثبت شده است. لطفا از راه‌های ارتباطی با ما در تماس باشید.";
  }

  const alreadyReserved = await Reservation.exists({
    selectedDate,
    selectedTime,
  });
  if (alreadyReserved) return SLOT_TAKEN_MESSAGE;

  // Claim the slot atomically: only succeeds if this hour exists in the
  // schedule AND is still available. Prevents double booking and booking
  // of times that were never offered.
  const slot = await Schedule.findOneAndUpdate(
    {
      date: new Date(selectedDate),
      hours: { $elemMatch: { hour: selectedTime, isAvailable: true } },
    },
    { $set: { "hours.$.isAvailable": false } },
  );

  if (!slot) return SLOT_TAKEN_MESSAGE;

  try {
    await Reservation.create({
      plan,
      fullName,
      phone,
      description,
      selectedDate,
      selectedTime,
    });
  } catch (err) {
    // give the slot back if the reservation could not be saved
    await Schedule.updateOne(
      { _id: slot._id, "hours.hour": selectedTime },
      { $set: { "hours.$.isAvailable": true } },
    );
    console.error(err);
    return "ثبت رزرو با مشکل مواجه شد. لطفا دوباره تلاش کنید.";
  }

  // SEND EMAIL TO ADMIN
  // const apiKey = process.env.BREVO_API_KEY;
  // const adminEmail = process.env.ADMIN_EMAIL;

  // if (!apiKey) return;

  // const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "api-key": apiKey,
  //   },
  //   body: JSON.stringify({
  //     sender: { email: "admin@fatemeshafieii.ir", name: "admin" },
  //     to: [{ email: adminEmail, name: "Admin" }],
  //     subject: "رزرو نوبت",
  //     htmlContent: `<p>${fullName} یک نوبت مشاوره رزرو کرده است</p>`,
  //   }),
  // }).then((res) => res.json());

  // console.log(res);
}

export async function finishReservationStatus(id: string) {
  await requireUser();
  if (!isValidObjectId(id)) return;

  await Reservation.findByIdAndUpdate(id, { status: "finish" });

  revalidatePath("/dashboard/reservations");
}

export async function deleteReservation(id: string) {
  await requireUser();
  if (!isValidObjectId(id)) return;

  await Reservation.findByIdAndDelete(id);

  revalidatePath("/dashboard/reservations");
}

export async function changePlanData(formData: FormData) {
  await requireUser();

  const id = formData.get("id");
  const body = {
    title: formData.get("title"),
    time: formData.get("time"),
    price: formData.get("price"),
    plan: formData.get("plan"),
  };

  await fetch(`${baseUrl}/plan/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/dashboard/plans");
}

export async function createSchedule(data: {
  date: string | undefined;
  time: string | undefined;
}): Promise<{ error: string } | undefined> {
  await requireUser();

  const parsed = scheduleSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "اطلاعات وارد شده نامعتبر است.",
    };
  }

  const { date, time } = parsed.data;

  // check Date exists
  const schedule = await Schedule.findOne({ date });

  // if exist => UPDATE
  if (schedule) {
    const hourExists = schedule.hours.some(
      (el: { hour: string }) => el.hour === time,
    );
    if (hourExists) {
      return { error: "زمان انتخاب شده از قبل در جدول زمان بندی موجود است" };
    }

    await Schedule.updateOne(
      { _id: schedule._id },
      { $push: { hours: { hour: time } } },
    );
  }

  // if not exist => CREATE
  else {
    await Schedule.create({
      date,
      hours: [{ hour: time }],
    });
  }

  revalidatePath("/dashboard/schedules");
}

export async function deleteHour(id: string, hour: string) {
  await requireUser();
  if (!isValidObjectId(id) || typeof hour !== "string") return;

  await Schedule.updateOne({ _id: id }, { $pull: { hours: { hour: hour } } });

  const schedule = await Schedule.findById(id);

  if (schedule && schedule.hours.length === 0) {
    await Schedule.findByIdAndDelete(id);
    revalidatePath("/dashboard/schedules");
    redirect("/dashboard/schedules");
  }

  revalidatePath("/dashboard/schedules");
}

export async function reserveHour(id: string, hour: string) {
  await requireUser();
  if (!isValidObjectId(id) || typeof hour !== "string") return;

  await Schedule.updateOne(
    { _id: id, "hours.hour": hour },
    { $set: { "hours.$.isAvailable": false } },
  );

  revalidatePath("/dashboard/schedules");
}

export async function deleteSchedule(formData: FormData) {
  await requireUser();

  const id = formData.get("id");
  if (typeof id !== "string" || !isValidObjectId(id)) return;

  await Schedule.findByIdAndDelete(id);

  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules");
}

// AUTHENTICATION

export async function logOut() {
  await signOut({ redirectTo: "/login" });
}

export async function login(state: FormState, formData: FormData) {
  try {
    const validatedFields = loginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { email, password } = validatedFields.data;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (err) {
    // CredentialsSignin carries a `code` set in src/auth.ts
    const code = (err as { code?: string } | null)?.code;
    if (code === "rate_limited") {
      return {
        message: "به دلیل تلاش‌های ناموفق زیاد، ورود برای ۱۵ دقیقه متوقف شد. کمی بعد دوباره تلاش کنید.",
      };
    }
    if (code === "unavailable") {
      return { message: "ارتباط با سرور برقرار نشد. چند لحظه بعد دوباره تلاش کنید." };
    }
    if ((err as { type?: string } | null)?.type !== "CredentialsSignin") {
      console.error("login failed:", err);
    }
    return {
      message: "ایمیل یا رمزعبور اشتباه است",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(state: FormState, formData: FormData) {
  // only signed-in users can create new accounts
  await requireUser();

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await dbConnect();

    const emailTaken = await User.exists({ email: email.toLowerCase() });
    if (emailTaken) {
      return { status: "fail", message: "این ایمیل قبلا ثبت شده است." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPassword });

    // NOTE: we intentionally do NOT sign in as the new user here; the admin
    // who created the account must stay signed in as themselves.

    revalidatePath("/dashboard/userSettings");

    return { status: "success", message: "حساب کاربری با موفقیت ایجاد شد" };
  } catch (err) {
    console.error(err);
    return {
      status: "fail",
      message: "ایجاد حساب کاربری با مشکل مواجه شد.",
    };
  }
}

export async function deleteUser(id: string) {
  // only the OWNER can delete users
  await requireOwner();

  if (!isValidObjectId(id)) {
    return { message: "کاربر نامعتبر است" };
  }

  const user = await User.findById(id);

  if (!user) {
    return { message: "کاربر پیدا نشد" };
  }

  if (user.role === "OWNER") {
    return {
      message: "you can't delete an owner user",
    };
  }
  await User.findByIdAndDelete(id);

  revalidatePath("/dashboard/userSettings");
}

export async function changeUserData(state: FormState, formData: FormData) {
  // the user can only change their OWN data (taken from the session,
  // never from form fields)
  const currentUser = await requireUser();

  const validatedFields = userDataFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email } = validatedFields.data;

  if (
    name.toLowerCase() === String(currentUser.name).toLowerCase() &&
    email.toLowerCase() === String(currentUser.email).toLowerCase()
  ) {
    return { message: "اطلاعات ورودی تغییری نکرده است" };
  }

  const emailTaken = await User.exists({
    email: email.toLowerCase(),
    _id: { $ne: currentUser._id },
  });
  if (emailTaken) {
    return { message: "این ایمیل برای کاربر دیگری ثبت شده است" };
  }

  await User.updateOne({ _id: currentUser._id }, { email, name });

  revalidatePath("/dashboard", "layout");
}

export async function changePass(state: FormState, formData: FormData) {
  // the user can only change their OWN password
  const currentUser = await requireUser();

  const validatedFields = changePassSchema.safeParse({
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password, newPassword } = validatedFields.data;

  // check old pass
  const user = await User.findById(currentUser._id).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { message: "رمزعبور فعلی اشتباه است" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  try {
    await User.updateOne({ _id: user._id }, { password: hashedPassword });

    return { status: "success", message: "رمزعبور با موفقیت تغییر کرد." };
  } catch (err) {
    console.error(err);
    return {
      status: "fail",
      message: "موقع تغییر رمز با مشکل مواجه شدیم",
    };
  }
}
