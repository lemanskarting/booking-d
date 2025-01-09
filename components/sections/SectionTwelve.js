export default function SectionTwelve({ data }) {
  return (
    <section className="py-10 bg-[#0E0C17] text-white md:pb-24 md:pt-16">
      <div className="page-container-simple">
        <h6 className="pb-5 text-3xl italic font-semibold text-left md:pb-10 md:text-5xl">
          {data.headingFifteen}
        </h6>
        <div className="grid grid-cols-1 gap-2 text-lg md:gap-x-8 lg:gap-x-12 lg:grid-flow-col lg:grid-rows-2 lg:grid-cols-3 md:text-xl">
          {data.contacts.map((item, i) => (
            <Item
              key={item}
              className={i % 2 !== 0 ? "pb-2 md:pb-0" : ""}
              text={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ text, className }) {
  return text.includes("+") ? (
    <a className={className + " hover:underline"} href={`tel:${text}`}>
      {text}
    </a>
  ) : text.includes("@") ? (
    <a className={className + " hover:underline"} href={`mailto:${text}`}>
      {text}
    </a>
  ) : (
    <p className={className}>{text}</p>
  );
}
