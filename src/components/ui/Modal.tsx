"use client";

// import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";
import XIcon from "../icons/XIcon";
import { ReactNode } from "react";
import { useReservationStore } from "@/hooks/useReservationStore";

const Modal = ({ children }: { homeHref: string; children: ReactNode }) => {
  const { resetAll, hide } = useReservationStore();
  // const ref = useOutsideClick(() => {
  //   hide();
  //   resetAll();
  // });
  return createPortal(
    <div className="fixed inset-0 bg-[#525252] bg-opacity-40 flex justify-center items-center z-50 ">
      <div
        className="relative bg-neutral-50 rounded-3xl pt-10 pb-8 px-[3.25rem] w-[47.5rem]"
        // ref={ref}
      >
        <button
          className=" absolute top-6 left-6"
          onClick={() => {
            hide();
            resetAll();
          }}
        >
          <XIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
