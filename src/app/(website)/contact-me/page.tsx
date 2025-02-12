import type { Metadata } from "next";

import ContactWays from "@/components/layouts/ContactWays";
import SocialSectionContactUs from "@/components/layouts/SocialSectionContactUs";
import Image from "next/image";
import vector from "../../../../public/vector.svg";

export const metadata: Metadata = {
  title: "ارتباط با من",
  description: "راه های ارتباطی با فاطمه سادات شفیعی روانشناس صنعتی و سازمانی",
};

function Page() {
  return (
    <div className="flex gap-14 max-sm:flex-col">
      <div className="basis-1/2 flex flex-col justify-between gap-6">
        <SocialSectionContactUs />
        <ContactWays />
      </div>
      <div className=" basis-1/2 flex justify-center items-center max-sm:-mb-8">
        <Image src={vector} alt="vector" className=" max-sm:scale-[85%]" />
      </div>
    </div>
  );
}

export default Page;
