function ScheduleHeader() {
  return (
    <div className=" grid grid-cols-7">
      <p className="col-span-2 max-sm:col-span-3 font-semibold border-l border-l-neutral-300 text-center">
        تاریخ
      </p>
      <p className="col-span-4 max-sm:col-span-3 font-semibold text-center">
        ساعات
      </p>
      <p></p>
    </div>
  );
}

export default ScheduleHeader;
