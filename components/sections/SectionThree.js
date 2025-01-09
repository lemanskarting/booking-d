import BackgroundImage from "@components/image/BackgroundImage";
import React from "react";

export default function SectionThree({ data }) {
  return (
    <BackgroundImage
      image={data.imageOneFluid}
      containerClassName="h-full text-white page-container-simple w-full pt-8 md:pt-16 pb-16 z-10 relative"
      className="w-full h-full "
      imageClassName="object-cover w-full h-full"
      sizes="max(100vw, 100vh)"
      alt=""
    >
      <h4 className="max-w-2xl pb-5 mx-auto text-3xl italic font-semibold text-center md:pb-5 md:text-5xl">
        {data.headingFive}
      </h4>
      <p className="pb-8 font-semibold leading-tight text-center whitespace-pre-line">
        {data.textTwo}
      </p>
      <a href="#order" className="mx-auto theme-button-secondary !table">
        <span>{data.buttonTwo}</span>
      </a>
    </BackgroundImage>
  );
}
