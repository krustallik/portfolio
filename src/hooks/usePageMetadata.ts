import { useEffect } from "react";
import { profile } from "../data/profile";

export function usePageMetadata(title: string, description: string): void {
  useEffect(() => {
    const pageTitle = `${title} · ${profile.name}`;
    document.title = pageTitle;

    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.append(descriptionTag);
    }
    descriptionTag.content = description;

    const updateMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = content;
    };

    updateMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    updateMeta('meta[property="og:description"]', "property", "og:description", description);
    updateMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    updateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    const canonical = profile.siteUrl ? `${profile.siteUrl}${window.location.pathname}` : "";
    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.rel = "canonical";
        document.head.append(canonicalTag);
      }
      canonicalTag.href = canonical;
    } else {
      canonicalTag?.remove();
    }
  }, [description, title]);
}
