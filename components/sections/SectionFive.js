import React from "react";

export default function SectionFive({ data }) {
  return (
    <section className="py-10 bg-primary-dark md:py-16">
      <div className="text-white page-container-simple">
        <h6 className="pb-2 text-lg italic font-light text-center md:text-left md:text-3xl">
          {data.headingTen}
        </h6>
        <p className="pb-5 text-3xl italic font-semibold text-center md:pb-10 md:text-left md:text-5xl">
          {data.headingEleven}
        </p>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 md:grid-cols-4 md:gap-5">
          {data.itemsFive.map(({ item }) => (
            <div
              className="relative p-4 text-center bg-white rounded-lg grid-centering text-primary-dark"
              key={item.heading}
            >
              <p className="uppercase text-sm md:text-base font-semibold text-[#9B9A9E]">
                {item.heading}
              </p>
              <p className="text-2xl font-semibold md:text-3xl">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="pt-8 pb-2 text-xl italic font-semibold text-center uppercase md:text-left">
          {data.headingTwelve}
        </p>
        <div className="p-4 mb-8 bg-white rounded-lg md:py-6 text-with-list red">
          <ul className="relative text-lg md:text-xl md:space-y-3 lg:columns-3 text-primary-dark">
            {data.itemsSix.map((item) => (
              <li key={item} className=" lg:mx-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <a
          href="#order"
          className="mx-auto theme-button !w-auto !leading-[3rem] !table"
        >
          <span>{data.buttonFive}</span>
        </a>
      </div>
    </section>
  );
}
