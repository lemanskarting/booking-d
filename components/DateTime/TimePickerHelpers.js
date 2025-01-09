import { CalendarDate, getDayOfWeek } from "@internationalized/date";

export const dayNames = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function calculateBookingCost(schedule, timeInput, minTime) {
  const [startTime, endTime] = timeInput;
  let totalCost = 0;

  schedule.forEach(({ item }) => {
    const { start, end, price, priceFrom } = item;
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);

    const finalPrice = endTime - startTime > 0.5 ? priceFrom : price;

    // Convert start and end times to fractional format
    const itemStart = startHour + startMin / 60;
    const itemEnd = endHour + endMin / 60;

    // Determine overlapping time with the input
    const overlapStart = Math.max(itemStart, startTime);
    const overlapEnd = Math.min(itemEnd, endTime);

    // Calculate cost for the overlapping time
    if (overlapStart < overlapEnd) {
      const overlapDuration = overlapEnd - overlapStart;
      totalCost += overlapDuration * finalPrice;
    }
  });

  return totalCost * (60 / minTime);
}

export function getDayOfWeekFromDate(date) {
  let dateString = new CalendarDate(date.year, date.month, date.day);
  return getDayOfWeek(dateString, "fr-FR");
}

export function getCurrentDateTime(date) {
  return `${date.year.toString().padStart(2, "0")}-${date.month
    .toString()
    .padStart(2, "0")}-${date.day.toString().padStart(2, "0")}T${date.hour
    .toString()
    .padStart(2, "0")}:${date.minute.toString().padStart(2, "0")}:00`;
}

export function formatTime(date) {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function formatTimeToDay(date) {
  return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
}
