"use server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createReservation(data: object) {
  console.log(data);
  await dbConnect();
  await Reservation.create(data);
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
