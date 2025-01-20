const aboutMeData = [
  "این یک متن تست است",
  "تست برای لیست",
  "سلاااام احوال شما",
  "2تست برای لیست",
  "این یک متن تست است2",
];

function AboutSection() {
  return (
    <div className="rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100 size-full px-6 py-12">
      <ul className=" text-neutral-700 text-xl font-medium leading-[2.1875rem] list-inside list-disc [&>li]:marker:text-sm">
        {aboutMeData.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default AboutSection;
