import { describe, expect, it } from "vitest";
import {
  defaultFilters,
  parseFilters,
  toDiscoverParams,
  toSearchParams,
} from "@/features/movies/movieFilters";

describe("movieFilters", () => {
  it("uses the category defaults when the URL has no filters", () => {
    expect(parseFilters(new URLSearchParams(), "popular")).toEqual(
      defaultFilters("popular"),
    );
    expect(parseFilters(new URLSearchParams(), "top-rated").sortBy).toBe(
      "vote_average.desc",
    );
  });

  it("gives the theatrical categories a release date window", () => {
    const { releaseFrom, releaseTo } = defaultFilters("now-playing");
    expect(releaseFrom).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(releaseTo > releaseFrom).toBe(true);
  });

  it("reads valid filters and ignores invalid ones", () => {
    const params = new URLSearchParams(
      "sort_by=bogus&genres=28,abc,35&from=nope&score=99",
    );
    expect(parseFilters(params, "popular")).toEqual({
      sortBy: "popularity.desc",
      genres: [28, 35],
      releaseFrom: "",
      releaseTo: "",
      minScore: 10,
    });
  });

  it("writes only the values that differ from the defaults", () => {
    const defaults = defaultFilters("popular");
    expect(toSearchParams(defaults, "popular").toString()).toBe("");

    const params = toSearchParams(
      {
        ...defaults,
        sortBy: "vote_average.desc",
        genres: [28, 35],
        minScore: 7,
      },
      "popular",
    );
    expect(params.toString()).toBe(
      "sort_by=vote_average.desc&genres=28%2C35&score=7",
    );
  });

  it("builds discover params and requires votes when sorting by rating", () => {
    const params = toDiscoverParams({
      ...defaultFilters("popular"),
      sortBy: "vote_average.desc",
      genres: [28, 35],
    });
    expect(params).toMatchObject({
      sort_by: "vote_average.desc",
      with_genres: "28,35",
      "vote_count.gte": 300,
    });
    expect(params["primary_release_date.gte"]).toBeUndefined();
  });
});
