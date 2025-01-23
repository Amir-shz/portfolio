import ServicesForCompaniesAndPersons from "@/components/layouts/ServicesForCompaniesAndPersons";
import { servicesForCompanyData, servicesForPersonData } from "@/utils/utils";
import { Metadata } from "next";
import PlansBox from "@/components/ui/PlansBox";

export const metadata: Metadata = {
  title: "خدمات من",
};

async function Page() {
  return (
    <div className=" grid grid-cols-4 gap-6 mb-4">
      <PlansBox />
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
