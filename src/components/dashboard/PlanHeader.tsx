function PlanHeader() {
  return (
    <div className=" w-full grid grid-cols-9 p-3 [&>p]:border-l [&>p]:border-l-neutral-300 [&>p]:flex [&>p]:justify-center [&>p:last-child]:border-none border-b border-b-purple-300 ">
      <p className=" col-span-2">عنوان</p>
      <p className=" col-span-2">زمان</p>
      <p className=" col-span-2">قیمت</p>
      <p className=" col-span-2">شماره طرح(پلن)</p>
    </div>
  );
}

export default PlanHeader;
