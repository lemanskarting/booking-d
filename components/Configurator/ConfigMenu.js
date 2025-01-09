import SaleItem from "@components/Configurator/SaleItem";
import { useStore } from "@components/Store";
import CollapsibleBlock from "./CollapsibleBlock";
import ContactForm from "@components/Contact Form";
import ContactFormAdmin from "@components/Contact Form admin";
import PurchaseSummary from "./PurchaseSummary";
import DateAndTimePicker from "@components/DateTime/DateAndTimePicker";
import { getTotalPrice, getTotalPriceByType } from "../../lib/helperFunctions";
import { numberWithCommas } from "@components/utils/NumberWithCommas";
import ResetButton from "./ResetButton";
import GuestsPicker from "./GuestsPicker";
import DiscountBlock from "./DiscountBlock";

export default function ConfigMenu({ data, admin, setStage }) {
  const { total, resetByType, guests, discounts, changeGuests } = useStore();

  return (
    <div className="rounded-[0.625rem] bg-white ">
      <div className="px-3 md:px-6">
        {admin ? null : (
          <>
            <p className="text-center pt-10 pb-8 text-3xl md:pb-10 md:text-3xl italic font-semibold lg:uppercase leading-[1.2] max-w-[58rem] mx-auto">
              {data.configText.headingOne}
            </p>
            <div className="grid grid-cols-2 gap-8 pb-8 lg:gap-4 lg:grid-cols-6 md:pb-10">
              {data.configText.itemsOne.map(({ item }) => (
                <div className="" key={item.icon}>
                  <img
                    src={item.icon}
                    alt={item.heading}
                    className="w-20 h-20 mx-auto"
                  />
                  <p className="pt-4 mx-auto max-w-[10rem] text-center text-xs font-medium leading-[1.2] whitespace-pre-line">
                    {item.heading}
                  </p>
                </div>
              ))}
            </div>
            <Border />
          </>
        )}
        <DateAndTimePicker admin={admin} dateId={data.dateOneId} data={data} />
        <div>
          <Border />
          <p className="text-[1.375rem] font-semibold uppercase pt-8 pb-4 md:py-5">
            {data.allItems[0].heading}
          </p>
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 ">
            {data.allItems[0].items.map((item, i) => (
              <SaleItem
                original={item}
                item={
                  total.find((itemInTotal) => itemInTotal.id === item.id) ||
                  item
                }
                key={i}
              />
            ))}
          </div>
          <DiscountBlock
            admin={admin}
            type="options"
            data={data}
            className="mt-5"
          />
          <div className="flex md:items-center items-end rounded-lg px-3 py-5 md:px-5 my-5 md:mt-3 justify-between bg-[#F7F7F7] ">
            <div className="">
              <p className="pb-1 text-sm font-medium">Сумма:</p>
              <p className="text-2xl font-semibold">
                {`${numberWithCommas(
                  getTotalPriceByType(total, "options", discounts.options)
                )} руб.`}
              </p>
            </div>
            <div className="">
              <ResetButton
                onClick={() => {
                  resetByType("options");
                }}
              />
            </div>
          </div>
          <Border />
        </div>
        <div className="pb-10">
          <p className="text-[1.375rem] font-semibold uppercase pt-8 pb-4 md:py-5">
            {data.configText.headingTwo}
          </p>
          <p className="pb-2 text-lg font-semibold leading-tight">
            {data.configText.headingThree}
          </p>
          <GuestsPicker data={data} />
          <div className="hidden md:flex mb-5 h-[1.125rem] overflow-hidden w-full text-xs md:text-base">
            {[
              "Наименование",
              data.allItems[1].items[0].text,
              "Стоимость",
              "Количество",
            ].map((item, i) => (
              <p
                style={{ opacity: i === 1 ? 0 : 1 }}
                key={item}
                className={`table-item-width-${i} text-xs text-[#5C5C5C] font-semibold `}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="space-y-[0.625rem]">
            {data.allItems.slice(1).map((item, i) => (
              <CollapsibleBlock key={i} item={item} />
            ))}
          </div>
          <p className="py-5 text-[#68686A] md:pl-5 text-lg font-semibold">
            {data.configText.serviceTip}
          </p>
          <DiscountBlock
            admin={admin}
            type="menu"
            data={data}
            className="mt-5 mb-3"
          />
          <div className="flex md:items-center items-end rounded-lg px-3 py-5 md:px-5 justify-between bg-[#F7F7F7] ">
            <div className="">
              <p className="pb-1 text-sm font-medium">Сумма:</p>
              <p className="text-2xl font-semibold">
                {`${numberWithCommas(
                  getTotalPriceByType(total, "menu", discounts.menu)
                )} руб.`}
              </p>
            </div>
            <div className="">
              <ResetButton
                onClick={() => {
                  changeGuests(0);
                  resetByType("menu");
                }}
              />
            </div>
          </div>
        </div>
        <PurchaseSummary
          admin={admin}
          discounts={discounts}
          guests={guests}
          total={total}
          data={data}
        />
        <div className="md:pb-10">
          <Border />
          <p className="pt-8 pb-4 text-2xl font-semibold uppercase md:py-5">
            {admin
              ? data.configText.headingFourAdmin
              : data.configText.headingFour}
          </p>
          <p className="pb-5 whitespace-pre-line">
            {admin ? data.configText.textOneAdmin : data.configText.textOne}
          </p>
          {admin ? (
            <ContactFormAdmin config={admin} setStage={setStage} data={data} />
          ) : (
            <ContactForm config={admin} setStage={setStage} data={data} />
          )}
        </div>
      </div>
      {admin ? null : (
        <>
          <div className="flex items-center justify-between py-5 px-7 bg-primary-dark md:p-6">
            <p className="text-lg font-semibold text-white md:text-2xl">
              {data.configText.total}
            </p>
            <p className="text-2xl font-semibold text-white md:text-3xl">
              {`${numberWithCommas(getTotalPrice(total, discounts))} руб.`}
            </p>
          </div>
          <div className="sticky bottom-0 left-0 z-50 flex items-center py-2.5 justify-between bg-theme-red md:px-6 md:py-3 ">
            <p className="w-full px-8 text-xs italic font-semibold text-center text-white">
              {data.configText.disclaimer}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Border() {
  return <hr className="border-primary-gray-dark md:-ml-6 md:-mr-6" />;
}
