"use server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import Schedule from "@/models/scheduleModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function logOut() {
  console.log("log out");
}

export async function login() {
  console.log("log in");
  redirect("/dashboard");
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
  // console.log(schedule ? "hast" : "nist");
  // Schedule.create({data.});
  revalidatePath("/dashboard/schedules");
}
