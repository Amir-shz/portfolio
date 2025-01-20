import ServicesForCompaniesAndPersons from "@/components/layouts/ServicesForCompaniesAndPersons";
import PlanCard from "@/components/ui/PlanCard";
import {
  planData,
  servicesForCompanyData,
  servicesForPersonData,
} from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات من",
};

function Page() {
  return (
    <div className=" grid grid-cols-4 gap-6 mb-4">
      {planData.map((plan) => (
        <PlanCard
          key={plan.id}
          title={plan.title}
          time={plan.time}
          price={plan.price}
          href={plan.href}
        />
      ))}
      <div className=" col-span-2">
        <ServicesForCompaniesAndPersons
          title={servicesForCompanyData.title}
          type={servicesForCompanyData.type}
          items={servicesForCompanyData.items}
        />
      </div>
      <div className=" col-span-2">
        <ServicesForCompaniesAndPersons
          title={servicesForPersonData.title}
          type={servicesForPersonData.type}
          items={servicesForPersonData.items}
        />
      </div>
    </div>
  );
}

export default Page;
