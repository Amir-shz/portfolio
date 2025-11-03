"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

import { NextSliderButton, PrevSliderButton } from "./SliderButton";
import Image from "next/image";
// import SliderItem from "./SliderItem";

function Slider({
  data,
}: {
  data: {
    id: number;
    name: string;
    gender: "man" | "woman";
    testimonial: string;
  }[];
}) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className=" relative z-50 mx-auto min-h-fit overflow-hidden w-full rounded-3xl border border-neutral-300 shadow-shadow3 bg-neutral-100"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className=" h-auto">
            <div className="size-full">
              <div className=" flex justify-center items-center mt-8 mb-5 max-sm:mt-4 max-sm:mb-2">
                <Image
                  src={
                    item.gender === "man" ? "/boyVector.png" : "/girlVrctor.png"
                  }
                  alt="vector"
                  width={600}
                  height={600}
                  className=" size-[150px] max-sm:size-[100px] shadow-[0px_0px_0px_4px_#8133F1] rounded-full"
                />
              </div>
              <div className=" flex flex-col gap-6 items-center px-20 pb-12 max-sm:gap-3 max-sm:px-4 max-sm:pb-2">
                <p className=" text-2xl font-semibold text-neutral-700 max-sm:text-xl">
                  {item.name}
                </p>
                <p className=" text-xl font-medium text-neutral-500 max-sm:text-base max-sm:text-center">
                  {item.testimonial}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <NextSliderButton />
        <PrevSliderButton />
      </Swiper>
    </>
  );
}

export default Slider;
