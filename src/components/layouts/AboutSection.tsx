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
      <p className=" text-neutral-700 text-xl font-medium leading-[2.1875rem] max-sm:leading-7 max-sm:text-base ">
        نه انگیزه‌داری، نه سردرگمی‌ت تموم میشه.نه میدونی که قراره این رشته به
        دردت بخوره، نه مطمئنی که این شغل برای توئه یا نه؛ اینجا قراره بهت کمک
        کنم بفهمی کی هستی، چی ازت برمیاد، و کجا بیشتر میدرخشی.
      </p>
    </div>
  );
}

export default AboutSection;
