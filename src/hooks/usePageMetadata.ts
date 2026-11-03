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
