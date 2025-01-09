export default function SectionEleven({ data }) {
  return (
    <section className="py-10 bg-primary-gray md:pb-24 md:pt-16">
      <div className="page-container-simple">
        <h6 className="pb-5 text-3xl italic font-semibold text-left md:pb-10 md:text-5xl">
          {data.headingFourteen}
        </h6>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 md:grid-cols-4 md:gap-5">
          {data.itemsNine.map(({ item }, i) => (
            <div
              className="flex px-5 py-4 space-x-5 whitespace-pre-line bg-white rounded-lg grid-centering md:space-x-0 md:flex-col"
              key={item.icon}
            >
              <img
                src={item.icon}
                alt={item.heading}
                className={`${
                  i === 0
                    ? "w-[3.75rem] md:w-[4.75rem]"
                    : "w-[3.25rem] md:w-[3.75rem] mr-2 md:mr-0"
                } h-[3.75rem] object-contain mb-2`}
                loading="lazy"
              />
              <div className="">
                <p className="pb-2 text-lg italic font-bold leading-tight uppercase md:text-3xl">
                  {item.heading}
                </p>
                <p className="text-xs font-semibold leading-tight uppercase md:text-lg">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
