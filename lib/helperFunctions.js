export function getTotalPrice(
  data,
  discounts = { date: 0, options: 0, menu: 0 }
) {
  let total = 0;
  data.forEach((item) => {
    const price =
      parsePrice(item.price) *
      (item.type === "date" ? (item.amount > 0 ? 1 : 0) : item.amount);
    total +=
      item.type === "menu"
        ? price * 1.1 * ((100 - discounts[item.type]) / 100)
        : price * ((100 - discounts[item.type]) / 100);
  });
  return correctPrice(total);
}
export function getTotalPriceByType(data, type, discount = 0) {
  let total = 0;
  data.forEach((item) => {
    total +=
      item.type === type
        ? parsePrice(item.price) *
          (item.type === "date" ? (item.amount > 0 ? 1 : 0) : item.amount)
        : 0;
  });

  return correctPrice(total * ((100 - discount) / 100));
}
function parsePrice(str) {
  if (typeof str === "number" && !isNaN(str)) {
    return str;
  }
  if (typeof str !== "string") {
    return 0;
  }
  const parts = str.replace(/[^\d\s,]/g, "").split(",");

  // Join the whole numbers, which might be separated by spaces, and add the decimal part
  const cleanedStr = parts[0].split(" ").join("") + "." + (parts[1] || "00");

  // Convert to float
  const floatResult = parseFloat(cleanedStr);

  // Validate float conversion
  if (isNaN(floatResult)) {
    throw new Error("Cannot convert to float");
  }

  if (isNaN(floatResult)) {
    return 0;
  }

  return floatResult;
}

export function correctPrice(price) {
  if (price % 1 === 0) {
    // Check if the price is an integer
    return Math.round(price); // If it's an integer, return it as is
  } else {
    return parseFloat(price.toFixed(2)); // If it's a float, round to 2 decimal places
  }
}

export function getItemPrice(item, service = true, discount = 0) {
  let total =
    parsePrice(item.price) *
    (item.type === "date" ? (item.amount > 0 ? 1 : 0) : item.amount) *
    (item.type === "menu" && service ? 1.1 : 1);

  return correctPrice(total * ((100 - discount) / 100));
}

export function formatRub(num) {
  // Use Intl.NumberFormat to format the number with appropriate commas and decimal points
  const formattedNum = new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);

  // Add the 'руб.' currency sign at the end
  return `${formattedNum} руб.`;
}
