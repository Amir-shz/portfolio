"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const Modal = ({
  homeHref,
  plan,
}: {
  homeHref: string;
  plan: string | undefined;
}) => {
  const router = useRouter();
  const ref = useOutsideClick(() => {
    router.replace(homeHref);
  });
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80" ref={ref}>
        {plan} مودال
      </div>
    </div>,
    document.body
  );
};

export default Modal;
