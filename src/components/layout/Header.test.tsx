import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";

function CurrentLocation() {
  const location = useLocation();
  return (
    <div data-testid="location">{location.pathname + location.search}</div>
  );
}

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
      <CurrentLocation />
    </MemoryRouter>,
  );

describe("Header", () => {
  it("shows the links of a section when its menu is opened", async () => {
    renderHeader();
    await userEvent.click(screen.getByText("Movies"));
    expect(screen.getByRole("link", { name: "Now Playing" })).toHaveAttribute(
      "href",
      "/movie/now-playing",
    );
  });

  it("opens the search bar and navigates to the search page", async () => {
    renderHeader();
    await userEvent.click(screen.getByRole("button", { name: "Open search" }));
    await userEvent.type(screen.getByRole("searchbox"), "dune part two{enter}");

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/search?query=dune%20part%20two",
    );
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  it("closes the search bar with Escape", async () => {
    renderHeader();
    await userEvent.click(screen.getByRole("button", { name: "Open search" }));
    await userEvent.type(screen.getByRole("searchbox"), "{Escape}");

    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });
});
