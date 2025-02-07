import EducationIcon from "../icons/EducationIcon";
import FinanceIcon from "../icons/FinanceIcon";
import UserCertificationIcon from "../icons/UserCertificationIcon";
import HomeServiceCard from "../ui/HomeServiceCard";

function HomeServiceSection() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full max-sm:grid-cols-2 max-sm:gap-4">
      <HomeServiceCard
        icon={<FinanceIcon />}
        title="مشاوره سازمانی"
        description="تحلیل عملکرد، بهبود فرهنگ، توسعه تیم"
      />
      <HomeServiceCard
        icon={<UserCertificationIcon />}
        title="توسعه فردی"
        description="هدف‌ گذاری، خود شناسی، مهارت‌آموزی"
      />
      <HomeServiceCard
        icon={<EducationIcon />}
        title="مشاوره تحصیلی"
        description="ترسیم بهترین مسیر، تقویت یادگیری، مدیریت استرس"
      />
    </div>
  );
}

export default HomeServiceSection;
