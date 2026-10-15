import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("shows the TMDB logo and attribution notice", () => {
    render(<Footer />);
    expect(
      screen.getByText(/not endorsed or certified by TMDB/i),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/TMDB/i)).toBeInTheDocument();
  });
});
