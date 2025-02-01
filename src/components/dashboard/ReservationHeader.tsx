function ReservationHeader() {
  return (
    <div className="flex w-full border-b border-b-purple-300 max-sm:w-max">
      <div className=" w-full grid grid-cols-11 p-3 [&>p]:border-l [&>p]:border-l-neutral-300 [&>p]:flex [&>p]:justify-center [&>p:last-child]:border-none  basis-[90%]">
        <p className=" col-span-2">نام</p>
        <p className=" col-span-2">شماره همراه</p>
        <p>تاریخ</p>
        <p>ساعت</p>
        <p>وضعیت</p>
        <p>پلن</p>
        <p>اطلاعات پلن</p>
        <p className=" col-span-2">توضیحات</p>
      </div>
      <div></div>
    </div>
  );
}

export default ReservationHeader;
