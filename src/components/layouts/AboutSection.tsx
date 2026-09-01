// const aboutMeData = [
//   "اینجا، انسان‌ها و کسب‌وکارها به بهترین نسخه خودشون تبدیل می‌شن!",
//   "از چالش‌ها فرصت بسازیم، با روانشناسی صنعتی و سازمانی!",
//   "بهبود عملکرد، افزایش بهره‌وری، توسعه فردی و سازمانی!",
//   "با روانشناسی صنعتی، سازمان‌ها رو به اوج می‌رسونیم! ",
//   "با روانشناسی صنعتی، سازمان‌ها رو به موفقیت می‌رسونیم! ",
// ];

function AboutSection() {
  return (
    <div className="rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 size-full px-6 py-12 max-sm:py-4 flex items-center">
      {/* <ul className=" text-neutral-700 text-xl font-medium leading-[2.1875rem] list-inside list-disc [&>li]:marker:text-sm max-sm:text-lg max-sm:leading-8">
        {aboutMeData.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul> */}
      <p className=" text-neutral-700 text-xl font-medium leading-[2.1875rem] max-sm:leading-6 max-sm:text-sm text-center">
        من فاطمه سادات شفیعی هستم؛ رتبه ۵۲ کنکور سراسری و رتبه ۴ کنکور ارشد؛ یک
        استراتژیست برند، روانشناس صنعتی و کسی که تئوری‌های رفتار انسان را به
        زبانِ اعداد ترجمه میکند. من در تقاطعِ «روانشناسی» و «کسب‌وکار»
        ایستاده‌ام تا باگ‌های پنهان سازمان شما را جراحی کنم و مسیر توسعه
        فردی‌تان را از نو بسازم. از عارضه‌یابی برای کارخانه‌های عظیم صنعتی تا
        طراحی سناریو در اتاق‌فکرهای برندسازی؛ تخصص من، تبدیل پیچیدگی‌ها به
        راه‌حل‌های شفاف و اجرایی است.
      </p>
    </div>
  );
}

export default AboutSection;
