import ParallaxBig from "@components/ParallaxBig";

export default function SectionEight({ data, setIsOpen, setStage }) {
  return (
    <section
      style={{ clipPath: "inset(-100vw -100vw 0 -100vw)" }}
      className="relative pb-3 pt-36 bg-primary-dark md:pt-28 md:pb-20"
    >
      <ParallaxBig data={data} />
      <div className="p-5 pt-10 relative pb-16 text-white border-[3px] border-white rounded-lg page-container-simple">
        <p className="relative z-20 pb-5 text-lg italic font-semibold text-center whitespace-pre-line md:text-3xl">
          {data.headingEight}
        </p>
        <h6 className="relative z-20 pb-8 text-3xl italic font-semibold text-center whitespace-pre-line md:pb-10 md:text-5xl">
          {data.headingSeven}
        </h6>
        <button
          onClick={() => {
            setStage(0);
            setIsOpen(true);
          }}
          className="mx-auto z-20 theme-button-secondary-filled relative !leading-[3rem] !table"
        >
          <span>{data.buttonFour}</span>
        </button>
      </div>
    </section>
  );
}
