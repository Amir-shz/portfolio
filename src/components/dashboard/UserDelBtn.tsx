"use client";
import { useTransition } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

function UserDelBtn({ id, role }: { id: string; role: "ADMIN" | "OWNER" }) {
  const [isPendingDel, startTransitionDel] = useTransition();

  function handleDelete() {
    startTransitionDel(async () => {
      console.log(id);
      // await deleteReservation(id);
    });
  }

  return (
    <button
      className={`${
        role === "OWNER" ? "bg-neutral-500" : "hover:bg-red-700 bg-red-500"
      } p-2   rounded-full duration-300 justify-self-center`}
      onClick={handleDelete}
      disabled={isPendingDel || role === "OWNER"}
    >
      {isPendingDel && <div className="loaderSpinner size-6"></div>}
      {!isPendingDel && (
        <HiOutlineTrash size={24} className=" stroke-2 text-neutral-50" />
      )}
    </button>
  );
}

export default UserDelBtn;
