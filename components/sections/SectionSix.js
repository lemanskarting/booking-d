import React from "react";

export default function SectionSix({ data }) {
  return (
    <section
      id="order"
      className="py-10 bg-white page-container-simple md:py-16"
    >
      <h6 className="pb-5 text-3xl italic font-semibold text-center md:pb-10 md:text-5xl">
        {data.headingSix}
      </h6>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 md:gap-5">
        {data.itemsThree.map(({ item }) => (
          <div
            className="px-5 py-8 text-center rounded-lg md:whitespace-pre-line bg-primary-gray"
            key={item.icon}
          >
            <img
              src={item.icon}
              alt={item.heading}
              loading="lazy"
              className="w-10 mx-auto mb-3"
            />
            <p className="pb-2 text-lg font-semibold leading-tight uppercase">
              {item.heading}
            </p>
            <p className="leading-tight">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
