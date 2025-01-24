"use client";

import { HiOutlineCheckCircle, HiOutlineTrash } from "react-icons/hi2";
import { deleteReservation, finishReservationStatus } from "@/lib/actions";

function ReservationRowBtns({ id, status }: { id: string; status: string }) {
  return (
    <>
      <button
        className=" p-2  bg-red-500 rounded-full hover:bg-red-700 duration-300"
        onClick={() => deleteReservation(id)}
      >
        <HiOutlineTrash size={24} className=" stroke-2 text-neutral-50" />
      </button>
      <button
        className=" p-2  bg-success-500 rounded-full hover:bg-success-700 duration-300 disabled:bg-neutral-500"
        disabled={status === "finish"}
        onClick={() => finishReservationStatus(id)}
      >
        <HiOutlineCheckCircle size={24} className=" stroke-2 text-neutral-50" />
      </button>
    </>
  );
}

export default ReservationRowBtns;
