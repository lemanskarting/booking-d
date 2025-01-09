// import Configurator from "@components/Configurator";
import Configurator from "@components/Configurator";
import { prepareData, proccessConfigItems } from "../lib/configHelpers";
import dynamic from "next/dynamic";

const PDFRender = dynamic(() => import("@components/PDFRender"), {
  ssr: false,
});
export default function Index({ data }) {
  return (
    <>
      <div className="bg-black">
        <PDFRender data={data} />
      </div>
      <Configurator admin isOpen={true} setIsOpen={() => null} data={data} />
    </>
  );
}

export async function getStaticProps() {
  const data = await import(`../cms/pages/homepage.json`).then(
    async (data) => await prepareData(data.default)
  );
  const header = await import(`../cms/config/header.json`).then(
    async (data) => await prepareData(data.default)
  );
  const footer = await import(`../cms/config/footer.json`).then(
    async (data) => await prepareData(data.default)
  );
  const seo = await import(`../cms/config/seo.json`).then(
    async (data) => await prepareData(data.default)
  );
  const text = await import(`../cms/configurator/text.json`).then(
    async (data) => await prepareData(data.default)
  );
  const calendar = await import(`../cms/configurator/calendar.json`).then(
    async (data) => await prepareData(data.default)
  );
  const pdf = await import(`../cms/pages/pdf.json`).then(
    async (data) => await prepareData(data.default)
  );

  data.configText = text;
  data.calendar = calendar;
  data.pdfData = pdf;
  data.dateOneId = "dateOne";

  const keys = [
    "itemsOne",
    "itemsTwo",
    "itemsThree",
    "itemsFour",
    "itemsFive",
    "itemsSix",
    "itemsSeven",
    "itemsEight",
    "itemsNine",
    "itemsTen",
    "itemsEleven",
    "itemsTwelve",
  ];

  data.allItems = await Promise.all(
    keys.map(async (key) => {
      const data = await import(`../cms/configurator/${key}.json`);
      const processedItems = await proccessConfigItems(data.items);

      return {
        ...data,
        items: processedItems.map((item) => ({
          ...item,
          type: key === "itemsOne" ? "options" : "menu",
        })),
      };
    })
  );

  return {
    props: {
      header: header,
      footer,
      data: data,
      seo: seo,
    },
  };
}
