import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectFilters } from "../src/components/ProjectFilters";
import { LocaleProvider } from "../src/i18n/LocaleProvider";

describe("ProjectFilters", () => {
  it("announces the selected filter and reports changes", () => {
    const onChange = vi.fn();
    render(<LocaleProvider><ProjectFilters value="All" onChange={onChange} /></LocaleProvider>);

    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Automation" }));
    expect(onChange).toHaveBeenCalledWith("Automation");
  });
});
