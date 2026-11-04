import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectGallery } from "../src/components/ProjectGallery";
import { LocaleProvider } from "../src/i18n/LocaleProvider";
import type { ProjectGalleryImage } from "../src/types";

function screenshots(count: number): ProjectGalleryImage[] {
  return Array.from({ length: count }, (_, index) => ({
    src: `/images/gallery/test/screen-${index + 1}.webp`,
    thumbnail: `/images/gallery/test/screen-${index + 1}-thumb.webp`,
    sourceUrl: `https://raw.githubusercontent.com/krustallik/example/${index + 1}.png`,
    alt: `Test screenshot ${index + 1}`,
    caption: `Screen ${index + 1}`,
    width: 1440,
    height: 900,
    thumbnailWidth: 420,
    thumbnailHeight: 263,
    orientation: "landscape",
  }));
}

describe("ProjectGallery", () => {
  it.each([1, 2, 5, 8])("renders a %i-image gallery without broken counts", (count) => {
    const { container } = render(<LocaleProvider><ProjectGallery projectName="Test project" images={screenshots(count)} note="Synthetic test captures." /></LocaleProvider>);
    expect(screen.getByRole("img", { name: "Test screenshot 1" })).toHaveAttribute("width", "1440");
    if (count === 1) {
      expect(screen.getByRole("group", { name: "Screenshot 1 of 1" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Next screenshot" })).not.toBeInTheDocument();
      expect(screen.queryByRole("group", { name: "Choose a screenshot" })).not.toBeInTheDocument();
    } else {
      expect(container.querySelector(".gallery-count")).toHaveTextContent(`1 / ${count}`);
    }
  });

  it("wraps next and previous navigation and follows phone swipe input", () => {
    render(<LocaleProvider><ProjectGallery projectName="Test project" images={screenshots(2)} note="Test note." /></LocaleProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Previous screenshot" }));
    expect(document.querySelector(".gallery-count")).toHaveTextContent("2 / 2");
    fireEvent.click(screen.getByRole("button", { name: "Next screenshot" }));
    expect(document.querySelector(".gallery-count")).toHaveTextContent("1 / 2");

    const viewport = screen.getByRole("group", { name: "Screenshot 1 of 2" });
    fireEvent.pointerDown(viewport, { pointerType: "touch", clientX: 280 });
    fireEvent.pointerUp(viewport, { pointerType: "touch", clientX: 100 });
    expect(document.querySelector(".gallery-count")).toHaveTextContent("2 / 2");
  });

  it("opens an accessible lightbox, supports arrow keys and Escape, and restores focus", () => {
    render(<LocaleProvider><ProjectGallery projectName="Test project" images={screenshots(2)} note="Test note." /></LocaleProvider>);
    const opener = screen.getByRole("button", { name: "Enlarge screenshot 1 of 2: Screen 1" });
    opener.focus();
    fireEvent.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Test project · Screenshot 1 of 2" });
    expect(screen.getByRole("button", { name: "Close enlarged screenshot" })).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(screen.getByRole("dialog", { name: "Test project · Screenshot 2 of 2" })).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
