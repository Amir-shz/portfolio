function DescriptionRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl shadow-shadow3 bg-neutral-100 border border-neutral-300 flex items-center gap-6 p-6 pr-8 max-sm:flex-col max-sm:p-4 max-sm:gap-2">
      <div className=" rounded-xl bg-purple-50 p-5 [&>svg]:text-purple-700 [&>svg]:size-12 [&>svg]:stroke-[1.5px]">
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2 max-sm:justify-center">
          <span className=" bg-purple-700 size-3 rounded-full max-sm:hidden"></span>
          <p className=" text-xl font-semibold text-purple-500 max-sm:text-lg max-sm:text-center">
            {title}
          </p>
        </div>
        <p className="text-neutral-600 mr-5 mt-4 max-sm:mt-3 max-sm:mr-0 max-sm:text-center font-medium max-sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

export default DescriptionRow;
