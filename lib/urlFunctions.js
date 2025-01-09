import { parseDateTime } from "@internationalized/date";

export function buildURL(data, guests = 0) {
  const link = `https://lemans.cartcrafter.ru/update-order?restore=true&guests=${guests}&`;
  return (
    link +
    data
      .filter((item) => item.amount > 0)
      .map((item) => {
        if (item.type === "date" && item.date) {
          return `${item.id}=${item.amount},${item.time[0]},${item.time[1]},${
            item.date.year
          }-${item.date.month.toString().padStart(2, "0")}-${item.date.day
            .toString()
            .padStart(2, "0")}`;
        } else {
          const idSegment = item.id.substring(0, 5);
          const amountSegment = item.amount;
          return `${idSegment}=${amountSegment}`;
        }
      })
      .join("&")
  );
}

export function restoreAmountFromUrl(query, data) {
  const segments = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .filter((segment) => segment.includes("="));

  return data.map((item) => {
    const matchingSegment = segments.find((segment) =>
      segment.startsWith(item.id.substring(0, 5))
    );

    if (matchingSegment) {
      const [, amount] = matchingSegment.split("=");
      if (item.type === "date") {
        const [people, start, end, date] = amount.split(",");
        return {
          ...item,
          amount: parseInt(people, 10),
          time: [parseFloat(start, 10), parseFloat(end, 10)],
          date: parseDateTime(date),
        };
      } else {
        return { ...item, amount: parseInt(amount, 10) };
      }
    }
    return item;
  });
}
