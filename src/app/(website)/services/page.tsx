import ServicesForCompaniesAndPersons from "@/components/layouts/ServicesForCompaniesAndPersons";
import { servicesForCompanyData, servicesForPersonData } from "@/utils/utils";
import { Metadata } from "next";
import ReactQueryProvider from "@/components/ui/ReactQueryProvider";

export const metadata: Metadata = {
  title: "خدمات من",
};

async function Page() {
  return (
    <div className=" grid grid-cols-4 gap-6">
      {/* <PlansBox /> */}
      <div className=" col-span-4 grid grid-cols-4 gap-3">
        <ReactQueryProvider />
      </div>
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
