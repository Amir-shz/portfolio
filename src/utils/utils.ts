import { servicesForCompaniesAndPersonsProp } from "@/types/types";

// OBJECTS

export const planData = [
  {
    id: 1,
    title: "مشاوره تلفنی / چت",
    time: "۱۵ دقیقه",
    price: "free",
    plan: "1",
    href: "?show=true&plan=1",
  },
  {
    id: 2,
    title: "مشاوره چت",
    time: "۳۰ دقیقه",
    price: "۲۵۰",
    plan: "2",
    href: "?show=true&plan=2",
  },
  {
    id: 3,
    title: "مشاوره تلفنی / تصویری",
    time: "۳۰ دقیقه",
    price: "۳۲۰",
    plan: "3",
    href: "?show=true&plan=3",
  },
  {
    id: 4,
    title: "مشاوره تلفنی / تصویری",
    time: "۴۵ دقیقه",
    price: "۳۷۰",
    plan: "4",
    href: "?show=true&plan=4",
  },
];

export const servicesForCompanyData: servicesForCompaniesAndPersonsProp = {
  title: "خدمات قابل ارائه برای سازمان‌ها",
  type: "company",
  items: [
    "ایجاد سیستم‌های ارزیابی عملکرد",
    "نیازسنجی+برنامه‌ریزی آموزشی پرسنل",
    "طراحی+انجام فرآیندهای جذب و استخدام مؤثر",
    "برنامه‌ریزی برای تعدیل،ارتقا و توسعه مسیرحرفه‌ای کارکنان",
    "استفاده از جدیدترین ابزارهای علمی و تحقیقاتی جهت تصمیم‌گیری",
    "مدیریت تنش‌ها و تعارضات در سازمان",
    "توسعه سیستم‌های ارزیابی و پاداش‌دهی کارکنان",
    "مشاوره جهت افزایش بهره‌وری و بهبود فرهنگ سازمانی",
    "ارائه تکنیک‌های تیم‌سازی و همکاری کارآمد",
    "برگزاری ورکشاپ‌های آموزشی و تدریس به کارکنان",
  ],
};

export const servicesForPersonData: servicesForCompaniesAndPersonsProp = {
  title: "خدمات قابل ارائه در قالب مشاوره فردی",
  type: "person",
  items: [
    "خودآگاهی و شناخت خود",
    "تقویت خلاقیت و نوآوری",
    "برنامه‌ریزی هدف‌گذاری",
    "مدیریت زمان و بهره‌وری",
    "مشاور تحصیلی و کنکور",
    "تقویت اعتماد به نفس",
    "کنترل استرس و اضطراب",
    "کشف استعدادها و علایق",
    "مشاوره شغلی و حرفه‌ای",
    "انجام+تحلیل تست‌های روانشناختی",
  ],
};

export const educationItems = [
  "مورد۱",
  "مورد۲",
  "مورد۳",
  "مورد۴",
  "مورد۵",
  "مورد۶",
  "مورد۷",
  "مورد۸",
  "مورد۹",
  "مورد۱۰",
];
export const resumeItems = [
  "مورد۱",
  "مورد۲",
  "مورد۳",
  "مورد۴",
  "مورد۵",
  "مورد۶",
  "مورد۷",
  "مورد۸",
  "مورد۹",
  "مورد۱۰",
];

// FUNCTIONS

export const getFourWeeksFromToday = () => {
  const today = new Date();

  const dayOfWeek = today.getDay();
  const diffToSaturday = dayOfWeek === 6 ? 0 : -(dayOfWeek + 1);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diffToSaturday);

  const fourWeeks = [];

  for (let i = 0; i < 28; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);
    const jalaliDate = getJalaliDetails(currentDay);
    const formattedDate = currentDay.toLocaleDateString("en-CA");
    const time = { date: formattedDate, jalali: jalaliDate };
    fourWeeks.push(time);
  }

  return fourWeeks;
};

export function getJalaliDetails(date) {
  const numericOptions = { year: "numeric", month: "numeric", day: "numeric" };
  const jalaliDate = date.toLocaleDateString("fa-IR", numericOptions);
  const [year, month, day] = jalaliDate.split("/");

  const monthNameOptions = { month: "long" };
  const monthName = date.toLocaleDateString("fa-IR", monthNameOptions);

  const dayNameOptions = { weekday: "long" };
  const dayName = date.toLocaleDateString("fa-IR", dayNameOptions);

  return {
    year,
    month,
    day,
    monthName,
    dayName,
  };
}

export function splitIntoWeeks(dates: object[]): {
  dates: {
    date: string;
    jalali: { dayName: string; day: string; monthName: string };
  }[];
  page: number;
}[] {
  const weeks = [];
  const itemsPerWeek = 7;

  for (let i = 0; i < dates.length; i += itemsPerWeek) {
    const weekDates = dates.slice(i, i + itemsPerWeek);
    weeks.push({
      dates: weekDates,
      page: weeks.length + 1,
    });
  }

  return weeks;
}
