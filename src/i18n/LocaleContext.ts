import { createContext } from "react";
import type { Locale, Messages } from "./messages";

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  format: (template: string, values: Record<string, string | number>) => string;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);
