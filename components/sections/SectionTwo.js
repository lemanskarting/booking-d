import Carousel from "@components/Carousel";
import React from "react";

export default function SectionTwo({ data }) {
  return (
    <section className="py-10 overflow-hidden bg-primary-gray md:py-16">
      <div className="page-container-simple">
        <h3 className="pb-5 text-3xl italic font-semibold text-center md:pb-10 md:text-left md:text-5xl">
          {data.headingNine}
        </h3>
        <div className="">
          <Carousel images={data.itemsFour} />
        </div>
      </div>
    </section>
  );
}
