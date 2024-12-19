import ContactWays from "@/components/layouts/ContactWays";
import SocialSectionContactUs from "@/components/layouts/SocialSectionContactUs";

function Page() {
  return (
    <div className="flex gap-6 max-lg:flex-col">
      <div className="basis-1/2 flex flex-col justify-between gap-6 max-lg:flex-row max-lg:[&>div]:basis-1/2 max-lg:gap-6 ">
        <SocialSectionContactUs />
        <ContactWays />
      </div>
      <div className=" basis-1/2  bg-slate-200 rounded-2xl"></div>
    </div>
  );
}

export default Page;
