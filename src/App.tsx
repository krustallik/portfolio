import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { useLocale } from "./i18n/useLocale";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }));
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname]);
  return null;
}

function AppContent() {
  const { messages } = useLocale();
  return (
    <>
      <a className="skip-link" href="#main-content">{messages.header.skipToContent}</a>
      <SiteHeader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}

export function AppFrame() {
  return <LocaleProvider><AppContent /></LocaleProvider>;
}

export function App() {
  return <BrowserRouter><AppFrame /></BrowserRouter>;
}
