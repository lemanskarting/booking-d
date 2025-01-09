import AspectRatio from "@components/utils/AspectRatio";
import React from "react";

export default function SectionOne({ data }) {
  return (
    <section className="py-10 bg-white page-container-simple md:py-24">
      <h2 className="pb-2 text-lg italic font-light text-center md:text-left md:text-3xl">
        {data.headingTwo}
      </h2>
      <p className="pb-5 text-3xl italic font-semibold text-center md:pb-10 md:text-left md:text-5xl">
        {data.headingThree}
      </p>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 md:grid-cols-4 md:gap-5">
        {data.itemsOne.map(({ item }) => (
          <div className="relative rounded-lg grid-centering" key={item.image}>
            <AspectRatio ratio={360 / 248}>
              <img
                loading="lazy"
                src={item.image}
                alt={item.heading}
                className="object-cover w-full h-full rounded-lg"
              />
            </AspectRatio>
            <p className="absolute bottom-0 left-0 mx-3 mb-2 text-lg italic font-semibold leading-tight text-white uppercase whitespace-pre-line md:mx-5 md:mb-5">
              {item.heading}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
