import ServicesForCompaniesAndPersons from "@/components/layouts/ServicesForCompaniesAndPersons";
import Modal from "@/components/ui/Modal";
import PlanCard from "@/components/ui/PlanCard";
import { searchParamsProp } from "@/types/types";
import {
  planData,
  servicesForCompanyData,
  servicesForPersonData,
} from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات من",
};

async function Page({ searchParams }: searchParamsProp) {
  const { show, plan } = await searchParams;
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
      {show === "true" && <Modal homeHref="/services" plan={plan} />}
    </div>
  );
}

export default Page;
