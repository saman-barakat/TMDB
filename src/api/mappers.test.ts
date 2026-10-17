import { describe, expect, it } from "vitest";
import { movieToSummary, trendingToSummary, tvToSummary } from "@/api/mappers";
import type { Movie, TvShow } from "@/types/tmdb";

const movie: Movie = {
  id: 1,
  title: "Dune",
  original_title: "Dune",
  overview: "",
  poster_path: "/p.jpg",
  backdrop_path: "/b.jpg",
  release_date: "2021-10-22",
  vote_average: 7.8,
  vote_count: 100,
  genre_ids: [],
  popularity: 1,
  original_language: "en",
};

const show: TvShow = {
  id: 2,
  name: "Severance",
  original_name: "Severance",
  overview: "",
  poster_path: null,
  backdrop_path: null,
  first_air_date: "2022-02-18",
  vote_average: 8.4,
  vote_count: 50,
  genre_ids: [],
  popularity: 1,
  original_language: "en",
};

describe("mappers", () => {
  it("maps a movie to a summary", () => {
    expect(movieToSummary(movie)).toMatchObject({
      id: 1,
      mediaType: "movie",
      title: "Dune",
      releaseDate: "2021-10-22",
    });
  });

  it("maps a TV show to a summary", () => {
    expect(tvToSummary(show)).toMatchObject({
      id: 2,
      mediaType: "tv",
      title: "Severance",
      releaseDate: "2022-02-18",
    });
  });

  it("maps trending movies and TV shows, and skips people", () => {
    expect(
      trendingToSummary({ ...movie, media_type: "movie" })?.mediaType,
    ).toBe("movie");
    expect(trendingToSummary({ ...show, media_type: "tv" })?.mediaType).toBe(
      "tv",
    );
    expect(trendingToSummary({ id: 3, media_type: "person" })).toBeNull();
  });
});
