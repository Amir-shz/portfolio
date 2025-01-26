"use server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import Schedule from "@/models/scheduleModel";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";
import bcrypt from "bcryptjs";
import { signInSchema, SignupFormSchema } from "./zod";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createReservation(data: {
  plan: string;
  fullName: string;
  phone: string;
  description: string;
  selectedDate: string;
  selectedTime: string;
}) {
  console.log(data);

  await dbConnect();

  await Reservation.create(data);

  const dateToFind = new Date(data.selectedDate);
  const hourToFind = data.selectedTime;

  await Schedule.findOneAndUpdate(
    {
      date: dateToFind,
      "hours.hour": hourToFind,
    },
    {
      $set: { "hours.$.isAvailable": false },
    }
  );

  // return true;
}

export async function finishReservationStatus(id: string) {
  console.log(id);
  const body = { status: "finish" };

  await fetch(`${baseUrl}/reservation/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/dashboard/reservations");
}

export async function deleteReservation(id: string) {
  await fetch(`${baseUrl}/reservation/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/dashboard/reservations");
}

export async function changePlanData(formData: FormData) {
  const id = formData.get("id");
  const body = {
    title: formData.get("title"),
    time: formData.get("time"),
    price: formData.get("price"),
    plan: formData.get("plan"),
  };
  console.log(body);

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
}) {
  console.log(data);

  // check Date exists
  const schedule = await Schedule.findOne({ date: data.date });

  // if exist => UPDATE
  if (schedule) {
    await Schedule.findOneAndUpdate(
      { date: data.date },
      { $push: { hours: { hour: data.time } } }
    );
  }

  // if not exist => CREATE
  else {
    await Schedule.create({
      date: data.date,
      hours: { hour: data.time },
    });
  }

  revalidatePath("/dashboard/schedules");
}

export async function deleteHour(id: string, hour: string) {
  console.log(id, hour);
  await Schedule.updateOne(
    { _id: id }, // بر اساس آیدی جستجو می‌کنیم
    { $pull: { hours: { hour: hour } } } // حذف ساعت خاص از آرایه
  );

  const schedule = await Schedule.findById(id);

  if (schedule.hours.length === 0) {
    await Schedule.findByIdAndDelete(id);
    revalidatePath("/dashboard/schedules");
    redirect("/dashboard/schedules");
  }

  revalidatePath("/dashboard/schedules");
}

export async function deleteSchedule(formData: FormData) {
  const id = formData.get("id");
  console.log(id);
  await Schedule.findByIdAndDelete(id);

  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules");
}

// AUTHENTICATION

export async function logOut() {
  await signOut({ redirectTo: "/login" });
}

export async function login(formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    throw new Error("error");
    // return {
    //   errors: validatedFields.error.flatten().fieldErrors,
    // };
  }
  const { email, password } = validatedFields.data;

  await signIn("credentials", { email, password, redirect: false });

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
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

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await dbConnect();
    const user = await User.create({ name, email, password: hashedPassword });

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    await signIn("credentials", { email, password, redirect: false });

    return { status: "success", message: "حساب کاربری با موفقیت ایجاد شد" };
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
      message: "An error occurred while creating your account." + `${err}`,
    };
  }
}
