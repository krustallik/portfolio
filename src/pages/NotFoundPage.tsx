import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { profile } from "../data/profile";
import { useLocale } from "../i18n/useLocale";

export function NotFoundPage() {
  const { messages, format } = useLocale();
  usePageMetadata(messages.metadata.pageMissingTitle, format(messages.metadata.pageMissingDescription, { name: profile.name }));
  return (
    <main className="not-found shell" id="main-content">
      <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{messages.notFound.label}</p>
      <h1>{messages.notFound.title}</h1>
      <p>{messages.notFound.description}</p>
      <Link className="button button-primary" to="/"><ArrowLeft size={16} aria-hidden="true" /> {messages.notFound.back}</Link>
    </main>
  );
}
