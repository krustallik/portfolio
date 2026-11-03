import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata";

export function NotFoundPage() {
  usePageMetadata("Page not found", "This page is not part of Ihor Havryliv's portfolio.");
  return (
    <main className="not-found shell" id="main-content">
      <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />404 · Not found</p>
      <h1>That route ends here.</h1>
      <p>Try the selected work or return to the start.</p>
      <Link className="button button-primary" to="/"><ArrowLeft size={16} aria-hidden="true" /> Back to the portfolio</Link>
    </main>
  );
}
