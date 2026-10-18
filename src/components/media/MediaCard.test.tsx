import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MediaCard from "@/components/media/MediaCard";
import type { MediaSummary } from "@/types/media";

const item: MediaSummary = {
  id: 1,
  mediaType: "movie",
  title: "Dune",
  releaseDate: "2021-10-22",
  posterPath: "/p.jpg",
  backdropPath: null,
  voteAverage: 7.8,
};

const renderCard = (overrides: Partial<MediaSummary> = {}) =>
  render(
    <MemoryRouter>
      <MediaCard item={{ ...item, ...overrides }} />
    </MemoryRouter>,
  );

describe("MediaCard", () => {
  it("links the title to the detail page", () => {
    renderCard();
    expect(screen.getByRole("link", { name: "Dune" })).toHaveAttribute(
      "href",
      "/movie/1",
    );
  });

  it("shows the user score and the formatted date", () => {
    renderCard();
    expect(screen.getByLabelText("User score 78%")).toBeInTheDocument();
    expect(screen.getByText("22 Oct 2021")).toBeInTheDocument();
  });

  it('shows "NR" when there is no rating', () => {
    renderCard({ voteAverage: 0 });
    expect(screen.getByLabelText("Not rated")).toHaveTextContent("NR");
  });
});
