import { useEffect, useState } from "react";
import { prepareData, proccessConfigItems } from "../lib/configHelpers";
import dynamic from "next/dynamic";

const Configurator = dynamic(() => import("@components/Configurator"), {
  ssr: false,
});
export default function Index({ data }) {
  const [stage, setStage] = useState(0);
  const [password, setPassword] = useState();
  const [decoded, setDecoded] = useState();
  function hashCode(str) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  const secret = -1773116042;
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("password"));
    if (items) {
      setDecoded(items);
    }
  }, []);

  return (
    <>
      <div className="py-40 bg-black">
        {decoded !== secret ? (
          <form className="flex items-center text-white justify-center h-[70vh]">
            <label>
              <span className="block pb-8 text-2xl italic font-semibold text-center whitespace-pre-line md:pb-12 md:text-3xl">
                {`Пожалуйста, введите пароль администратора,
                чтобы посмотреть или отредактировать заявку`}
              </span>
              <input
                className="block w-full max-w-xs p-4 mx-auto text-black"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value),
                    setDecoded(hashCode(event.target.value));
                  localStorage.setItem(
                    "password",
                    JSON.stringify(hashCode(event.target.value))
                  );
                }}
                type="text"
                name="password"
              />
            </label>
          </form>
        ) : (
          <div className=" bg-primary-dark page-container-simple">
            <Configurator
              admin
              stage={stage}
              isOpen={true}
              setIsOpen={() => null}
              setStage={setStage}
              data={data}
            />
          </div>
        )}
      </div>
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
