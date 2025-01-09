import { useDateFormatter } from "@react-aria/i18n";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { Button } from "./Button";

export function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}) {
  let monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  function replaceMonthName(str) {
    const monthsEng = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthsRus = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    for (let i = 0; i < monthsEng.length; i++) {
      str = str.replace(monthsEng[i], monthsRus[i]);
    }
    return str;
  }

  return (
    <div className="flex items-center pb-4">
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>
      <Button {...prevButtonProps}>
        {/* <ChevronLeftIcon className="w-6 h-6" /> */}
        <Icon left />
      </Button>
      <p
        // We have a visually hidden heading describing the entire visible range,
        // and the calendar itself describes the individual month
        // so we don't need to repeat that here for screen reader users.
        aria-hidden
        className="flex-1 text-lg font-semibold text-center align-center"
      >
        {replaceMonthName(
          monthDateFormatter.format(
            state.visibleRange.start.toDate(state.timeZone)
          )
        )}
      </p>
      <Button {...nextButtonProps}>
        {/* <ChevronRightIcon className="w-6 h-6" /> */}
        <Icon />
      </Button>
    </div>
  );
}
function Icon({ left }) {
  return (
    <svg
      className={`${
        left ? "-rotate-90" : "rotate-90"
      } border-2 border-theme-red  w-8 h-8`}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.34375 16.6567L14.829 11.1715L16.2003 12.5428L10.7151 18.028L9.34375 16.6567Z"
        fill="black"
      />
      <path
        d="M14.829 11.1715L20.3142 16.6567L18.9429 18.028L13.4577 12.5428L14.829 11.1715Z"
        fill="black"
      />
    </svg>
  );
}
