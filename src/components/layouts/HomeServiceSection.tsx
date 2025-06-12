import EducationIcon from "../icons/EducationIcon";
import FinanceIcon from "../icons/FinanceIcon";
import UserCertificationIcon from "../icons/UserCertificationIcon";
import HomeServiceCard from "../ui/HomeServiceCard";

function HomeServiceSection() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full max-sm:grid-cols-2 max-sm:gap-4">
      <HomeServiceCard
        icon={<UserCertificationIcon />}
        title="توسعه فردی"
        description="خودشناسی عمیق، هدف‌گذاری هوشمندانه و مهارت‌های تحول‌ساز"
      />
      <HomeServiceCard
        icon={<FinanceIcon />}
        title="برندینگ کسب‌وکارها"
        description="خلق برند منحصربه‌فرد، استراتژی‌های داده‌محور و افزایش فروش"
      />
      <HomeServiceCard
        icon={<EducationIcon />}
        title="کارگاه‌های تخصصی"
        description="مهارت‌های ارتباطی موثر، مدیریت زمان و انرژی و تصمیم‌سازی استراتژیک"
      />
    </div>
  );
}

export default HomeServiceSection;
