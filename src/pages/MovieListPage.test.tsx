import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { discoverMovies } from "@/api/discover";
import { getMovieGenres } from "@/api/genres";
import MovieListPage from "@/pages/MovieListPage";

vi.mock("@/api/discover", () => ({ discoverMovies: vi.fn() }));
vi.mock("@/api/genres", () => ({ getMovieGenres: vi.fn() }));

const movie = (id: number, title: string) => ({
  id,
  title,
  original_title: title,
  overview: "",
  poster_path: null,
  backdrop_path: null,
  release_date: "2024-01-01",
  vote_average: 7,
  vote_count: 10,
  genre_ids: [],
  popularity: 1,
  original_language: "en",
});

const renderPage = (url = "/movie") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[url]}>
        <MovieListPage category="popular" />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe("MovieListPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getMovieGenres).mockResolvedValue([{ id: 28, name: "Action" }]);
  });

  it("shows movies and loads the next page", async () => {
    vi.mocked(discoverMovies)
      .mockResolvedValueOnce({
        page: 1,
        results: [movie(1, "First Movie")],
        total_pages: 2,
        total_results: 2,
      })
      .mockResolvedValueOnce({
        page: 2,
        results: [movie(2, "Second Movie")],
        total_pages: 2,
        total_results: 2,
      });

    renderPage();

    expect(
      await screen.findByRole("link", { name: "First Movie" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Load More" }));

    expect(
      await screen.findByRole("link", { name: "Second Movie" }),
    ).toBeInTheDocument();
    expect(discoverMovies).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2 }),
    );
    expect(
      screen.queryByRole("button", { name: "Load More" }),
    ).not.toBeInTheDocument();
  });

  it("sends the filters from the URL to the API", async () => {
    vi.mocked(discoverMovies).mockResolvedValue({
      page: 1,
      results: [movie(1, "Only Movie")],
      total_pages: 1,
      total_results: 1,
    });

    renderPage("/movie?sort_by=vote_average.desc&genres=28");

    expect(
      await screen.findByRole("link", { name: "Only Movie" }),
    ).toBeInTheDocument();
    expect(discoverMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        sort_by: "vote_average.desc",
        with_genres: "28",
        page: 1,
      }),
    );
  });
});
