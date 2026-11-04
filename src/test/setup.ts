import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { resetLocaleForTests } from "../i18n/locale-store";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  resetLocaleForTests();
  document.documentElement.lang = "en";
});
