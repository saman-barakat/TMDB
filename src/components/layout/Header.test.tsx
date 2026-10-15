import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("links to the main sections", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Movies" })).toHaveAttribute(
      "href",
      "/movies",
    );
    expect(screen.getByRole("link", { name: "TV Shows" })).toHaveAttribute(
      "href",
      "/tv",
    );
    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute(
      "href",
      "/people",
    );
  });
});
