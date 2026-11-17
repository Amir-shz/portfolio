import ReservationBackButton from "@/features/reservation/ReservationBackButton";
import ReservationStepper from "@/features/reservation/ReservationStepper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "فاطمه شفیعی | رزرو نوبت",
  description: "رزرو نوبت مشاوره با فاطمه سادات شفیعی روانشناس صنعتی و سازمانی",
};

// Full-page booking flow (phones open it from the services page; it also
// works on larger screens as a centred card).
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:py-10">
      <header className="glass sticky top-3 z-20 rounded-2xl p-2.5 sm:top-6">
        <div className="flex items-center gap-3">
          <ReservationBackButton />
          <h1 className="flex-1 text-center text-base font-bold text-ink">رزرو نوبت</h1>
          <span aria-hidden className="size-9" />
        </div>
        <ReservationStepper className="mt-2.5 px-1" />
      </header>
      <main className="flex flex-1 flex-col pt-4">{children}</main>
    </div>
  );
}

export default layout;
