import * as htmlparser2 from "htmlparser2";

export interface Meta {
  url: string;
  title: string;
  description: string;
  image: string;
}

export async function fetchMeta(url: string): Promise<Meta> {
  const meta = {
    url,
    title: "",
    description: "",
    image: "",
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    const html = await res.text();
    const dom = htmlparser2.parseDocument(html);
    const metaTags = htmlparser2.DomUtils.findAll(
      (elem) => elem.name === "meta",
      dom.children
    );

    const title =
      metaTags.find((tag) => tag.attribs["property"] === "og:title")?.attribs[
        "content"
      ] ??
      metaTags.find((tag) => tag.attribs["name"] === "title")?.attribs[
        "content"
      ] ??
      "";

    const description =
      metaTags.find((tag) => tag.attribs["property"] === "og:description")
        ?.attribs["content"] ??
      metaTags.find((tag) => tag.attribs["name"] === "description")?.attribs[
        "content"
      ] ??
      "";

    const image =
      metaTags.find((tag) => tag.attribs["property"] === "og:image")?.attribs[
        "content"
      ] ?? "";

    meta.title = title;
    meta.description = description;
    meta.image = image;
  } catch (error) {
    throw new Error(`Failed to fetch metadata for ${url}: ${error}`);
  }

  return meta;
}
