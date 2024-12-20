import EducationIcon from "../icons/EducationIcon";
import FinanceIcon from "../icons/FinanceIcon";
import UserCertificationIcon from "../icons/UserCertificationIcon";
import HomeServiceCard from "../ui/HomeServiceCard";

function HomeServiceSection() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full mb-4">
      <HomeServiceCard
        icon={<FinanceIcon />}
        title="مشاوره سازمانی"
        description="فرایند جذب، ورکشاپ، توسعه سیستم‌های ارزیابی و..."
      />
      <HomeServiceCard
        icon={<UserCertificationIcon />}
        title="کوچینگ"
        description="فرایند جذب، ورکشاپ، توسعه سیستم‌های ارزیابی و..."
      />
      <HomeServiceCard
        icon={<EducationIcon />}
        title="مشاوره تحصیلی"
        description="فرایند جذب، ورکشاپ، توسعه سیستم‌های ارزیابی و..."
      />
    </div>
  );
}

export default HomeServiceSection;
