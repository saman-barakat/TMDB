import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

describe("Footer", () => {
  it("shows the TMDB logo and attribution notice", () => {
    renderFooter();
    expect(
      screen.getByText(/not endorsed or certified by TMDB/i),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/TMDB/i)).toBeInTheDocument();
  });

  it("links to the browse pages", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Now Playing" })).toHaveAttribute(
      "href",
      "/movie/now-playing",
    );
  });

  it("opens external TMDB links in a new tab", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: "Privacy Policy" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
