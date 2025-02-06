import ReservationBackButton from "@/features/reservation/ReservationBackButton";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="  h-dvh overflow-hidden">
      <div className="grid grid-cols-4 gap-x-3 px-4">
        <header className="col-span-4 h-16 py-4 flex items-center w-full">
          <ReservationBackButton />
          <h2 className=" text-h6_SB_mobile w-full text-center translate-x-4">
            رزرو نوبت
          </h2>
        </header>
        <div className=" max-h-[calc(100dvh-72px)] h-full overflow-y-scroll col-span-full hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
