import { useLocale } from "../i18n/useLocale";

interface LanguageSwitcherProps {
  variant?: "navigation" | "lightbox";
}

export function LanguageSwitcher({ variant = "navigation" }: LanguageSwitcherProps) {
  const { locale, setLocale, messages } = useLocale();
  return (
    <div className={`language-switch${variant === "lightbox" ? " language-switch--lightbox" : ""}`} role="group" aria-label={messages.header.language}>
      <button
        className={`language-option${locale === "en" ? " is-active" : ""}`}
        type="button"
        aria-label={messages.header.switchToEnglish}
        aria-pressed={locale === "en"}
        lang="en"
        onClick={() => setLocale("en")}
      >EN</button>
      <span aria-hidden="true">/</span>
      <button
        className={`language-option${locale === "sk" ? " is-active" : ""}`}
        type="button"
        aria-label={messages.header.switchToSlovak}
        aria-pressed={locale === "sk"}
        lang="sk"
        onClick={() => setLocale("sk")}
      >SK</button>
    </div>
  );
}
