import { useStore } from "@components/Store";
import { memo, useEffect, useState } from "react";
import AmountInput from "./AmountInput";

const SaleItem = ({ item, original }) => {
  const { changeAmount, total } = useStore();
  const time = total.find((item) => item.id === "dateOne");

  const [input, setInput] = useState(0);
  const handleOnClick = (newAmount) => {
    if (item.max) {
      setInput(Math.min(newAmount, item.max));
      changeAmount(item.id, Math.min(newAmount, item.max));
    } else {
      setInput(newAmount);
      changeAmount(item.id, newAmount);
    }
  };
  const handleInputChange = (e) => {
    const value = parseInt(e) || 0;
    const min = item.min || 0;

    if (value !== 0 && value < min) {
      setInput(min);
    } else {
      setInput(value);
    }
  };
  const handlePriceChange = (e) => {
    changeAmount(
      item.id,
      parseInt(e.target.value) === 0 ? 0 : 1,
      parseInt(e.target.value)
    );
  };

  const handleBlur = () => {
    handleOnClick(parseInt(input) || 0);
  };

  useEffect(() => {
    if (item.priceFromAmount) {
      changeAmount(
        item.id,
        item.amount,
        item.priceFromAmount <= item.amount ? item.priceFrom : original.price
      );
    }

    setInput(item.amount);
  }, [item.amount]);

  useEffect(() => {
    if (item.priceFromTime) {
      changeAmount(
        item.id,
        item.amount,
        item.priceFromTime <= time?.time[1] - time?.time[0]
          ? item.priceFrom
          : original.price
      );
    }
    if (item.priceFromPeople) {
      changeAmount(
        item.id,
        item.amount,
        item.priceFromPeople <= time?.amount ? item.priceFrom : original.price
      );
    }

    setInput(item.amount);
  }, [item.amount, time]);

  return (
    <div
      className={`${
        item.amount > 0 ? "!border-theme-red" : ""
      } p-[0.875rem] border-2 border-[#F7F7F7] min-h-[12rem] overflow-hidden rounded-lg bg-[#F7F7F7] flex flex-row duration-200 transition-colors`}
    >
      <div className="relative flex-1 h-full w-[42.5%]">
        <img
          decoding="async"
          loading="lazy"
          src={item.image}
          alt={item.heading}
          className={`w-full h-full absolute object-cover inset-0 block rounded-md`}
        />
      </div>

      <div className="flex flex-col h-full text-left w-[57.5%] pl-[0.875rem]">
        <div className="w-full">
          <div className="flex items-start justify-between ">
            <p className="whitespace-pre-line font-semibold  !leading-[1.15] text-lg">
              {item.heading}
            </p>
          </div>
          <div
            className="pt-2 space-y-1 text-xs leading-none text-sale-item whitespace-pre-line-inside md:text-sm text-primary-gray-darker markdown-text"
            dangerouslySetInnerHTML={{ __html: item.textMarkdown }}
          />
        </div>
        <div className="items-center justify-between block pt-4 mt-auto">
          <p className="pb-1 text-sm font-medium">{item.amountHeading}</p>
          <div className="flex items-baseline justify-between">
            {item.options ? (
              <select
                className="h-8 pl-2 pr-8 text-sm bg-white"
                value={item.amount === 0 ? 0 : item.price}
                onChange={handlePriceChange}
              >
                <option value={0}>{"Выбрать"}</option>
                {item.options.map(({ item }, index) => (
                  <option key={index} value={item.price}>
                    {item.title}
                  </option>
                ))}
              </select>
            ) : (
              <AmountInput
                className="w-full md:w-auto"
                handleOnClick={handleOnClick}
                handleInputChange={handleInputChange}
                input={input}
                // min={item.min || 0}
                max={item.max || 10000}
                handleBlur={handleBlur}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(SaleItem);
