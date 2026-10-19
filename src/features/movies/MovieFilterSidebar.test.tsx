import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MovieFilterSidebar from "@/features/movies/MovieFilterSidebar";
import { defaultFilters } from "@/features/movies/movieFilters";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
];
const defaults = defaultFilters("popular");

const renderSidebar = (onApply = vi.fn()) => {
  render(
    <MovieFilterSidebar
      genres={genres}
      initial={defaults}
      defaults={defaults}
      onApply={onApply}
    />,
  );
  return onApply;
};

describe("MovieFilterSidebar", () => {
  it("applies the chosen genre and sort order", async () => {
    const onApply = renderSidebar();

    await userEvent.click(screen.getByRole("button", { name: "Action" }));
    await userEvent.selectOptions(
      screen.getByLabelText("Sort results by"),
      "vote_average.desc",
    );
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(onApply).toHaveBeenCalledWith({
      ...defaults,
      genres: [28],
      sortBy: "vote_average.desc",
    });
  });

  it("applies the defaults when filters are reset", async () => {
    const onApply = renderSidebar();

    await userEvent.click(screen.getByRole("button", { name: "Comedy" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Reset filters" }),
    );

    expect(onApply).toHaveBeenCalledWith(defaults);
  });
});
