import { useCallback, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { LocaleContext } from "./LocaleContext";
import { getLocaleSnapshot, setStoredLocale, subscribeLocale } from "./locale-store";
import { formatMessage, messages, type Locale } from "./messages";

function getServerLocale(): Locale {
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Keep the server snapshot in English so prerendered markup hydrates consistently.
  const locale = useSyncExternalStore<Locale>(subscribeLocale, getLocaleSnapshot, getServerLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => setStoredLocale(nextLocale), []);
  const value = useMemo(() => ({
    locale,
    setLocale,
    messages: messages[locale],
    format: formatMessage,
  }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
