import type { Metadata } from "next";
import PageIntro from "@/components/website/PageIntro";
import ContactPanel from "@/components/website/ContactPanel";
import { wrap } from "@/components/website/styles";

export const metadata: Metadata = {
  title: "ارتباط با من",
  description: "راه های ارتباطی با فاطمه سادات شفیعی روانشناس صنعتی و سازمانی",
};

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="در تماس باشیم"
        title="ارتباط با من"
        lead="راه های ارتباطی با فاطمه سادات شفیعی، روانشناس صنعتی و سازمانی"
      />
      <section aria-label="راه های ارتباطی" className={`${wrap} mt-10 sm:mt-14`}>
        <ContactPanel />
      </section>
    </>
  );
}

export default Page;
