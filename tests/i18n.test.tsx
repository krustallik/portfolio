import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppFrame } from "../src/App";
import { additionalWork } from "../src/data/additional-work";
import { getLocalizedProject, mergeEnglishFallback, slovakProjectContent } from "../src/data/project-translations";
import { projects } from "../src/data/projects";
import { messages } from "../src/i18n/messages";
import { STORAGE_KEY } from "../src/i18n/locale-store";

function renderPortfolio(path = "/") {
  window.scrollTo = vi.fn();
  return render(<MemoryRouter initialEntries={[path]}><AppFrame /></MemoryRouter>);
}

describe("English and Slovak portfolio locales", () => {
  it("starts in English, switches language, and updates document language and SEO", async () => {
    window.localStorage.clear();
    renderPortfolio();
    await screen.findByRole("heading", { name: "Software for the real world." });
    expect(document.documentElement.lang).toBe("en");

    fireEvent.click(screen.getByRole("button", { name: "Switch language to Slovak" }));
    await screen.findByRole("heading", { name: "Softvér pre skutočný svet." });
    await waitFor(() => expect(document.documentElement.lang).toBe("sk"));
    expect(document.title).toContain("Full-stack vývojár a absolvent informatiky");
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toContain("absolvent informatiky");
    expect(screen.getByRole("button", { name: "Prepnúť jazyk na slovenčinu" })).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("sk");
  });

  it("restores the saved locale after mounting again", async () => {
    window.localStorage.setItem(STORAGE_KEY, "sk");
    const first = renderPortfolio();
    await screen.findByRole("heading", { name: "Softvér pre skutočný svet." });
    first.unmount();

    renderPortfolio();
    await screen.findByRole("heading", { name: "Softvér pre skutočný svet." });
    expect(document.documentElement.lang).toBe("sk");
  });

  it("falls back to English when browser storage is unavailable", async () => {
    const read = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    const write = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    renderPortfolio();
    await screen.findByRole("heading", { name: "Software for the real world." });
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByRole("button", { name: "Switch language to English" })).toHaveAttribute("aria-pressed", "true");
    read.mockRestore();
    write.mockRestore();
  });

  it("changes locale on a case study without resetting the route or open gallery", async () => {
    renderPortfolio("/projects/building-management-app");
    await screen.findByRole("heading", { name: "Building management app", level: 1 });
    fireEvent.click(screen.getByRole("button", { name: "Next screenshot" }));
    expect(document.querySelector(".gallery-count")).toHaveTextContent("2 / 7");
    fireEvent.click(screen.getByRole("button", { name: /^Enlarge screenshot 2 of 7/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Switch language to Slovak" }));
    await screen.findByRole("heading", { name: "Aplikácia na správu budov", level: 1 });
    expect(screen.getByRole("dialog", { name: /Snímka 2 z 7/ })).toBeInTheDocument();
    expect(document.querySelector(".gallery-count")).toHaveTextContent("2 / 7");
    expect(screen.getByText("Full-stack vývojár a koordinátor projektu", { exact: true })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Všetky vybrané projekty/ })).toHaveAttribute("href", "/#projects");
    expect(document.documentElement.lang).toBe("sk");
  });

  it("keeps complete Slovak content for every case study and screenshot", () => {
    expect(Object.keys(slovakProjectContent).sort()).toEqual(projects.map(({ slug }) => slug).sort());
    for (const project of projects) {
      const localized = getLocalizedProject(project, "sk");
      expect(localized.name).not.toBe(project.name);
      expect(localized.description).not.toBe(project.description);
      expect(localized.gallery).toHaveLength(project.gallery.length);
      expect(localized.gallery.every((image) => image.alt.length > 0 && image.caption.length > 0)).toBe(true);
    }
    expect(slovakProjectContent["building-management-app"].personalRole).toContain("Full-stack");
    expect(slovakProjectContent["building-management-app"].overview).toContain("AT&T");
    expect(slovakProjectContent["building-management-app"].limitations).toContain("zamestnancom AT&T");
    expect(slovakProjectContent["missing-data-tabular-models"].limitations).toContain("nepodarilo zopakovať");
  });

  it("uses English values when a localized value is missing", () => {
    expect(mergeEnglishFallback({ title: "English title", caption: "English caption" }, { title: "Slovenský nadpis" })).toEqual({
      title: "Slovenský nadpis",
      caption: "English caption",
    });
    expect(messages.sk.education.academyStatus).toBe("Ukončené v roku 2026");
  });

  it("does not expose unresolved keys for curated content", () => {
    for (const project of projects) expect(getLocalizedProject(project, "sk").name).not.toMatch(/^\{.+\}$/);
    expect(additionalWork.every((item) => messages.sk.additionalWork[item.slug]?.description)).toBe(true);
  });
});
