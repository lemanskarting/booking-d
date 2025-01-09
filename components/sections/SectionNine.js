import ImageSimple from "@components/image/ImageSimple";
import AspectRatio from "@components/utils/AspectRatio";

export default function SectionNine({ data }) {
  return (
    <section className="py-10 bg-primary-dark md:py-24">
      <div className="text-white page-container-simple">
        <h6 className="pb-5 text-3xl italic font-semibold text-center md:pb-10 md:text-5xl">
          {data.headingThirteen}
        </h6>
        <div className="grid gap-10 md:gap-0">
          {data.itemsSeven.map(({ item }, i) => (
            <div
              className={`${
                i % 2 === 0
                  ? "md:space-x-5"
                  : "md:flex-row-reverse md:-space-x-5"
              } md:flex `}
              key={item.imageFluid.src}
            >
              <div className="flex-1 hidden md:w-1/2 md:flex">
                <p className="px-4 m-auto text-xl italic font-light text-center whitespace-pre-line lg:text-3xl">
                  {item.text}
                </p>
              </div>
              <div className="md:w-1/2">
                <AspectRatio ratio={1.82901554}>
                  <ImageSimple
                    sizes="(min-width: 768px) 50vw, 100vw"
                    src={item.imageFluid}
                    alt={item.text}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </AspectRatio>
                <p className="pt-2 text-lg italic font-light whitespace-pre-line md:hidden">
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
