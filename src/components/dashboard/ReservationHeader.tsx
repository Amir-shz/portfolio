function ReservationHeader() {
  return (
    <div className=" w-full grid grid-cols-12 p-3 [&>p]:border-l [&>p]:border-l-neutral-300 [&>p]:flex [&>p]:justify-center [&>p:last-child]:border-none border-b border-b-purple-300 ">
      <p className=" col-span-2">نام</p>
      <p className=" col-span-2">شماره همراه</p>
      <p>تاریخ</p>
      <p>ساعت</p>
      <p>وضعیت</p>
      <p>پلن</p>
      <p>اطلاعات پلن</p>
      <p className=" col-span-2">توضیحات</p>
    </div>
  );
}

export default ReservationHeader;
