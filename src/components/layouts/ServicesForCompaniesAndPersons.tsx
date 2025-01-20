import { servicesForCompaniesAndPersonsProp } from "@/types/types";
import FinanceIcon from "../icons/FinanceIcon";
import UserCertificationIcon from "../icons/UserCertificationIcon";

function ServicesForCompaniesAndPersons({
  title,
  type,
  items,
}: servicesForCompaniesAndPersonsProp): React.ReactNode {
  return (
    <div className=" p-6 flex flex-col gap-3 rounded-3xl border border-neutral-300 bg-neutral-100 shadow-shadow3">
      <div className=" flex gap-2 items-center">
        <div className="[&>svg]:size-6 [&>svg_path]:fill-neutral-700">
          {type === "company" && <FinanceIcon />}
          {type === "person" && <UserCertificationIcon />}
        </div>
        <p className=" text-neutral-700 font-bold leading-7 text-xl">{title}</p>
      </div>
      <ul className=" text-neutral-500 text-base font-medium leading-7 list-disc list-inside pr-3">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesForCompaniesAndPersons;
