import { useState } from "react";
import { prepareData, proccessConfigItems } from "../lib/configHelpers";
import Hero from "@components/sections/Hero";
import SectionOne from "@components/sections/SectionOne";
import SectionTwo from "@components/sections/SectionTwo";
import SectionThree from "@components/sections/SectionThree";
import SectionFour from "@components/sections/SectionFour";
import SectionFive from "@components/sections/SectionFive";
import SectionSix from "@components/sections/SectionSix";
import SectionSeven from "@components/sections/SectionSeven";
import SectionEight from "@components/sections/SectionEight";
import SectionNine from "@components/sections/SectionNine";
import SectionTen from "@components/sections/SectionTen";
import SectionEleven from "@components/sections/SectionEleven";
import SectionTwelve from "@components/sections/SectionTwelve";
import Modal from "@components/Modal";
import Configurator from "@components/Configurator";

export default function Index({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState(0);

  return (
    <>
      <Hero data={data} />
      <SectionOne data={data} />
      <SectionTwo data={data} />
      <SectionThree data={data} />
      <SectionFive data={data} />
      <SectionSix data={data} />
      <SectionSeven data={data} />
      <SectionEight setStage={setStage} setIsOpen={setIsOpen} data={data} />
      <SectionNine data={data} />
      <SectionFour data={data} />
      <SectionTen data={data} />
      <SectionEleven data={data} />
      <SectionTwelve data={data} />
      <Modal mt={stage === 0} isOpen={isOpen} setIsOpen={setIsOpen}>
        <Configurator
          admin={false}
          setStage={setStage}
          stage={stage}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
        />
      </Modal>
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
      footer: footer,
      data: data,
      seo: seo,
    },
  };
}
