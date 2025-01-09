import BackgroundImage from "@components/image/BackgroundImage";
import React from "react";

export default function Hero({ data }) {
  return (
    <BackgroundImage
      image={data.heroImageFluid}
      preload
      loading="eager"
      containerClassName=" w-full flex-1 z-20 relative"
      className="flex w-full h-full min-h-screen"
      imageClassName="object-cover w-full h-full"
      sizes="max(100vw, 100vh)"
      alt=""
    >
      <div className="flex flex-col items-center justify-center h-full p-4 mt-10 text-center text-white md:mt-8 md:p-8">
        <h1 className="pb-2.5 text-3xl whitespace-pre-line font-display lg:text-6xl">
          {data.headingOne}
        </h1>
        <p className="pb-10 text-lg font-medium lg:text-3xl text-primary-gray">
          {data.heroPrice}
        </p>
        <a href="#order" className="theme-button !w-auto">
          <span>{data.buttonOne}</span>
        </a>
      </div>
    </BackgroundImage>
  );
}
