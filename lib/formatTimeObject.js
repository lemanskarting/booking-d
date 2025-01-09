const dayOfWeekInRussian = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export function convertBookingToFormattedString(booking) {
  if (!booking?.date) {
    return;
  }
  const startTime = booking.time[0];
  const endTime = booking.time[1];
  const { year, month, day } = booking.date;

  const dateObj = new Date(year, month - 1, day); // JavaScript months are 0-indexed.
  const dayOfWeek = dateObj.getDay();

  const startHour = Math.floor(startTime);
  const startMinute = (startTime - startHour) * 60;

  const endHour = Math.floor(endTime);
  const endMinute = (endTime - endHour) * 60;

  const duration = (endTime - startTime) * 60;

  return `${day.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")} (${dayOfWeekInRussian[dayOfWeek]}), время: ${String(
    startHour
  ).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}–${String(
    endHour
  ).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}, ${duration} минут`;
}
