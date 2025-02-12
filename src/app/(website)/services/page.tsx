import ServicesForCompaniesAndPersons from "@/components/layouts/ServicesForCompaniesAndPersons";
import { servicesForCompanyData, servicesForPersonData } from "@/utils/utils";
import { Metadata } from "next";
import ReactQueryProvider from "@/components/ui/ReactQueryProvider";

export const metadata: Metadata = {
  title: "خدمات من",
  description:
    "ارائه مشاوره‌های تخصصی در سه حوزه: 1. مشاوره سازمانی: تحلیل عملکرد، بهبود فرهنگ سازمانی و توسعه تیم. 2. توسعه فردی: هدف‌گذاری، خودشناسی و مهارت‌آموزی. 3. مشاوره تحصیلی: ترسیم مسیر تحصیلی، تقویت یادگیری و مدیریت استرس.",
};

async function Page() {
  return (
    <div className=" grid grid-cols-4 gap-6 select-none">
      <div className=" col-span-4 grid grid-cols-4 gap-3 max-sm:grid-cols-1">
        <ReactQueryProvider />
      </div>
      <div className=" col-span-2 max-sm:col-span-4">
        <ServicesForCompaniesAndPersons
          title={servicesForCompanyData.title}
          type={servicesForCompanyData.type}
          items={servicesForCompanyData.items}
        />
      </div>
      <div className=" col-span-2 max-sm:col-span-4">
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
