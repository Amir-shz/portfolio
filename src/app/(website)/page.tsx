import { Metadata } from "next";
import HomeHero from "@/components/website/home/HomeHero";
import FocusAreas from "@/components/website/home/FocusAreas";
import ExperienceBand from "@/components/website/home/ExperienceBand";
import PathsSection from "@/components/website/home/PathsSection";
import PodcastBand from "@/components/website/home/PodcastBand";
import Testimonials from "@/components/website/home/Testimonials";
import FaqSection from "@/components/website/home/FaqSection";
import LatestPosts from "@/components/website/home/LatestPosts";

// refreshed by the blog actions; hourly as a backstop
export const revalidate = 3600;

export const metadata: Metadata = {
  description:
    "فاطمه سادات شفیعی، روانشناس صنعتی و سازمانی با سابقه همکاری با شرکت‌های معتبر مانند ذوب‌آهن، هنزا و مپنا. ارائه مشاوره‌های تخصصی در زمینه‌های سازمانی، فردی و تحصیلی برای بهبود عملکرد و توسعه فردی.",
};

export default function Page(): React.ReactNode {
  return (
    <>
      <HomeHero />
      <FocusAreas />
      <ExperienceBand />
      <PathsSection />
      <PodcastBand />
      <Testimonials />
      <LatestPosts />
      <FaqSection />
    </>
  );
}
