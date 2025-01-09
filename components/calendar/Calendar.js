import { useRef } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { createCalendar } from "@internationalized/date";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader.js";

export function Calendar(props) {
  let state = useCalendarState({
    ...props,
    locale: "ru-RU",
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
    ref
  );

  nextButtonProps.isDisabled = false;

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="inline-block p-5 w-full mb-auto lg:w-auto max-w-[23.5rem] lg:p-7 bg-[#F7F7F7] rounded-lg"
    >
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
      </div>
    </div>
  );
}
