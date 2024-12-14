function WorkHistory() {
  return (
    <div className=" h-full rounded-3xl bg-neutral-100 shadow-shadow3 flex flex-col gap-3 p-4 pb-6">
      <div className=" flex items-center gap-3">
        <div className=" rounded-xl bg-purple-50 text-purple-500 size-14 flex justify-center items-center">
          <p className=" text-h5_B_desktop">+5</p>
        </div>
        <h3 className=" text-neutral-700 text-h6_SB_desktop">سال سابقه کاری</h3>
      </div>
      <div>
        <p className=" text-p1_M_desktop text-neutral-500">
          تجربه کار در شرکت‌های به‌نامی مانند ذوب‌آهن، هنزا، فلت ارث، داکو،
          آداپتیو، کلینیک روانشناسان هوشمند و …
        </p>
      </div>
    </div>
  );
}

export default WorkHistory;
