import TimePicker from "./TimePicker";
import { Calendar } from "../calendar/Calendar";
import { useEffect, useState } from "react";
import { useStore } from "@components/Store";
import { now } from "@internationalized/date";
import { numberWithCommas } from "@components/utils/NumberWithCommas";
import AmountInput from "../Configurator/AmountInput";
import ResetButton from "@components/Configurator/ResetButton";
import DiscountBlock from "@components/Configurator/DiscountBlock";
import { correctPrice } from "../../lib/helperFunctions";

export default function DateAndTimePicker({ data, dateId, admin }) {
  const { changeDate, changeTime, total, changeAmount } = useStore();

  const time = total.find((item) => item.id === dateId);

  const [input, setInput] = useState(0);
  const handleOnClick = (newAmount) => {
    setInput(newAmount);
    changeAmount(data.dateOneId, newAmount);
  };
  const handleInputChange = (e) => {
    setInput(parseInt(e) || 0);
  };

  const handleBlur = () => {
    handleOnClick(parseInt(input) || 0);
  };

  useEffect(() => {
    if (!isNaN(time?.amount)) {
      setInput(time.amount);
    }
  }, [time?.amount]);

  function handleChange(date) {
    changeDate(date, dateId);
  }
  function handleTimeChange(date, price) {
    changeTime(date, price, dateId);
  }

  function firstAvailableDate(date) {
    if (isDateUnavailable(date)) {
      return firstAvailableDate(date.add({ days: 1 }));
    } else {
      return date;
    }
  }

  let isDateUnavailable = (date) => {
    // Check for days off
    const dayOff = data.calendar.daysOff.some((dayOffItem) => {
      return (
        dayOffItem.item.day === date.day && dayOffItem.item.month === date.month
      );
    });
    return !!dayOff;
  };

  return (
    <div className="md:pb-10">
      <p className="text-[1.375rem] pt-8 pb-4 font-semibold uppercase leading-[1.2] md:py-5">
        {data.calendar.headingOne}
      </p>
      <p className="text-lg  lg:hidden font-semibold pb-3 leading-[1.2] whitespace-pre-line md:pb-4">
        {data.calendar.headingTwo}
      </p>
      <div className="grid grid-cols-1 md:gap-x-8 md:grid-cols-2 lg:flex lg:gap-0 lg:space-x-14">
        <Calendar
          minValue={now("Europe/Moscow")}
          value={time?.date || firstAvailableDate(now("Europe/Moscow"))}
          isDateUnavailable={isDateUnavailable}
          onChange={handleChange}
        />
        <div className="">
          <p className="text-lg hidden lg:block font-semibold  leading-[1.2] whitespace-pre-line md:pb-4">
            {data.calendar.headingTwo}
          </p>
          <TimePicker
            handleTimeChange={handleTimeChange}
            schedule={data.calendar}
            time={time?.time || [null, null]}
            date={time?.date || firstAvailableDate(now("Europe/Moscow"))}
            data={data}
          />
          <div className="flex md:max-w-[18.5rem] lg:max-w-[15.5rem] items-center justify-between py-5 md:space-x-3 space-x-3 lg:pt-2">
            <p className="text-sm font-medium">{data.calendar.people}</p>
            <AmountInput
              className="!bg-[#F7F7F7] w-40 lg:w-24"
              handleOnClick={handleOnClick}
              handleInputChange={handleInputChange}
              input={input}
              handleBlur={handleBlur}
            />
          </div>
          <div
            className="!text-sm !text-[#5C5C5C] md:!text-xs text-with-list whitespace-pre-line-inside pre-line leading-[1.2]"
            dangerouslySetInnerHTML={{ __html: data.calendar.textOneMarkdown }}
          ></div>
        </div>
        <div className="flex flex-col justify-between flex-1 pt-5 mb-8 lg:pt-0 md:mb-0">
          <div>
            <p className="text-lg font-semibold leading-[1.2] whitespace-pre-line pb-2">
              {data.calendar.headingThree}
            </p>
            <div
              className="!text-sm text-with-list li-pre-line"
              dangerouslySetInnerHTML={{
                __html: data.calendar.textTwoMarkdown,
              }}
            ></div>
          </div>
          <DiscountBlock
            admin={admin}
            type="date"
            data={data}
            sm
            className="mt-5"
          />
          <Price time={time} dateId={dateId} data={data} />
        </div>
      </div>
    </div>
  );
}

function Price({ dateId, time }) {
  const { resetDateTime, discounts } = useStore();

  return (
    <>
      <div
        className={`${
          time?.price > 0 && time?.amount > 0
            ? ""
            : "pointer-events-none invisible hidden md:block"
        } bg-[#F7F7F7] mt-5  px-3 py-5 md:p-5 rounded-lg`}
      >
        <p className="pb-1 mr-3 text-sm">Сумма:</p>
        <div className={`flex items-end justify-between`}>
          <p className="text-2xl font-semibold">{`${numberWithCommas(
            correctPrice(
              time?.price *
                (time?.amount > 0 ? 1 : 0) *
                ((100 - discounts.date) / 100)
            )
          )} руб.`}</p>
          <ResetButton
            onClick={() => {
              resetDateTime(dateId);
            }}
          />
        </div>
      </div>
    </>
  );
}
