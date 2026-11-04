import type { Locale } from "./messages";

export const STORAGE_KEY = "ihor-portfolio-locale";

let sessionLocale: Locale = "en";
const listeners = new Set<() => void>();

export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLocaleSnapshot(): Locale {
  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (storedLocale === "en" || storedLocale === "sk") {
      sessionLocale = storedLocale;
      return storedLocale;
    }
  } catch {
    // Use the current in-memory choice when storage is blocked.
  }
  return sessionLocale;
}

export function setStoredLocale(locale: Locale): void {
  sessionLocale = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Keep the current page usable if the browser prevents persistence.
  }
  for (const listener of listeners) listener();
}

export function resetLocaleForTests(): void {
  sessionLocale = "en";
}
