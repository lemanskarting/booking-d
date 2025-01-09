import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown) {
  if (markdown[0] === "<") return markdown;
  const result = await remark().use(html).process(markdown);
  return result
    .toString()
    .replace(/<a/g, `<a target="_blank" class="underline" rel="noreferrer"`);
}
