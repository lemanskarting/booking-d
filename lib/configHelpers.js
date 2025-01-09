import { getFluidImage } from "@components/image/imageFunctions";
import markdownToHtml from "./markdownToHtml";

export async function hashString(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function prepareData(data) {
  await Promise.all(
    Object.keys(data).map(async (key) => {
      if (key.toLowerCase().includes("markdown")) {
        data[key] = await markdownToHtml(data[key]);
      }
      if (key.toLowerCase().includes("fluid")) {
        if (data[key] instanceof Array) {
          data[key] = await Promise.all(
            data[key].map(async (item) => await getFluidImage(item))
          );
        } else {
          data[key] = await getFluidImage(data[key]);
        }
      }
      if (data[key] instanceof Array) {
        if (data[key][0].item) {
          data[key] = await Promise.all(
            data[key].map(async ({ item }) => ({
              item: {
                ...(await prepareData(item)),
              },
            }))
          );
        }
      }
    })
  );
  return data;
}

async function addIdToObject(obj) {
  const id = await hashString(obj.item.heading);
  const content = { ...(await prepareData(obj.item)), id, amount: 0 };
  delete obj.item;
  Object.keys(content).forEach((key) => (obj[key] = content[key]));
}

export async function proccessConfigItems(arrayOfObjects) {
  if (arrayOfObjects[0].item) {
    const promises = arrayOfObjects.map((obj) => addIdToObject(obj));
    await Promise.all(promises);
  }
  return arrayOfObjects;
}
