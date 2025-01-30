import type { Metadata } from "next";

import ContactWays from "@/components/layouts/ContactWays";
import SocialSectionContactUs from "@/components/layouts/SocialSectionContactUs";
import Image from "next/image";
import vector from "../../../../public/vector.svg";

export const metadata: Metadata = {
  title: "ارتباط با من",
};

function Page() {
  return (
    <div className="flex gap-14">
      <div className="basis-1/2 flex flex-col justify-between gap-6">
        <SocialSectionContactUs />
        <ContactWays />
      </div>
      <div className=" basis-1/2 flex justify-center items-center">
        <Image src={vector} alt="vector" />
      </div>
    </div>
  );
}

export default Page;
