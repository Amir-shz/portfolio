"use server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import Schedule from "@/models/scheduleModel";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "../auth";
import bcrypt from "bcryptjs";
import {
  changePassSchema,
  FormState,
  signInSchema,
  SignupFormSchema,
  userDataFormSchema,
} from "./zod";

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

export async function login(state: FormState, formData: FormData) {
  try {
    const validatedFields = signInSchema.safeParse({
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
    console.log(err);
    return {
      message: "ایمیل یا رمزعبور اشتباه است",
    };
  }

  redirect("/dashboard");
}

export async function signup(state: FormState, formData: FormData) {
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

export async function deleteUser(id: string) {
  const user = await User.findById(id);

  if (user.role === "OWNER") {
    return {
      message: "you can't delete an owner user",
    };
  }
  await User.findByIdAndDelete(id);

  revalidatePath("/dashboard/userSettings");
}

export async function changeUserData(state: FormState, formData: FormData) {
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

  const oldName = formData.get("oldName");
  const oldEmail = formData.get("oldEmail");

  if (
    name.toLowerCase() === String(oldName)?.toLowerCase() &&
    email.toLowerCase() === String(oldEmail)?.toLowerCase()
  ) {
    return { message: "اطلاعات ورودی تغییری نکرده است" };
  }

  await dbConnect();

  await User.findOneAndUpdate(
    { email: oldEmail },
    {
      email: email,
      name: name,
    }
  );

  revalidatePath("/dashboard");
}

export async function changePass(state: FormState, formData: FormData) {
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
  const email = formData.get("email");

  // check old pass
  await dbConnect();
  const user = await User.findOne({ email }).select("+password");

  console.log(user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { message: "رمزعبور فعلی اشتباه است" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    if (!user) {
      return {
        message: "موقع تغییر رمز با مشکل مواجه شدیم",
      };
    }

    // await signOut({ redirect: false });
    // await signIn("credentials", { email, password, redirect: false });

    return { status: "success", message: "رمزعبور با موفقیت تغییر کرد." };
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
      message: "An error occurred while creating your account." + `${err}`,
    };
  }
}

export async function changePhoto(url: string) {
  const session = await auth();

  await dbConnect();

  await User.findOneAndUpdate(
    { email: session?.user?.email },
    {
      photo: url,
    }
  );

  revalidatePath("/dashboard");
}
