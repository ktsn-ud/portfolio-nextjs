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
    const res = await fetch(url);
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
    console.error("Error fetching meta:", error);
  }

  return meta;
}
