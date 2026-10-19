import type { DiscoverParams } from "@/api/discover";

export type MovieCategory =
  "popular" | "now-playing" | "upcoming" | "top-rated";

export const CATEGORY_TITLES: Record<MovieCategory, string> = {
  popular: "Popular Movies",
  "now-playing": "Now Playing Movies",
  upcoming: "Upcoming Movies",
  "top-rated": "Top Rated Movies",
};

export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity (high to low)" },
  { value: "popularity.asc", label: "Popularity (low to high)" },
  { value: "vote_average.desc", label: "Rating (high to low)" },
  { value: "vote_average.asc", label: "Rating (low to high)" },
  { value: "primary_release_date.desc", label: "Release date (newest first)" },
  { value: "primary_release_date.asc", label: "Release date (oldest first)" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
] as const;

export type MovieSort = (typeof SORT_OPTIONS)[number]["value"];

export interface MovieFilters {
  sortBy: MovieSort;
  genres: number[];
  releaseFrom: string;
  releaseTo: string;
  minScore: number;
}

const SORT_VALUES: readonly string[] = SORT_OPTIONS.map(
  (option) => option.value,
);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isSort = (value: string): value is MovieSort =>
  SORT_VALUES.includes(value);

const isoDate = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toLocaleDateString("en-CA");
};

export const defaultFilters = (category: MovieCategory): MovieFilters => {
  const base: MovieFilters = {
    sortBy: "popularity.desc",
    genres: [],
    releaseFrom: "",
    releaseTo: "",
    minScore: 0,
  };

  switch (category) {
    case "top-rated":
      return { ...base, sortBy: "vote_average.desc" };
    case "now-playing":
      return { ...base, releaseFrom: isoDate(-40), releaseTo: isoDate(7) };
    case "upcoming":
      return { ...base, releaseFrom: isoDate(1), releaseTo: isoDate(180) };
    default:
      return base;
  }
};

const parseDate = (value: string | null, fallback: string): string => {
  if (value === null) return fallback;
  return DATE_PATTERN.test(value) ? value : "";
};

export const parseFilters = (
  params: URLSearchParams,
  category: MovieCategory,
): MovieFilters => {
  const defaults = defaultFilters(category);
  const sort = params.get("sort_by");
  const genres = params.get("genres");
  const score = Number(params.get("score"));

  return {
    sortBy: sort !== null && isSort(sort) ? sort : defaults.sortBy,
    genres: genres
      ? genres
          .split(",")
          .map(Number)
          .filter((id) => Number.isInteger(id) && id > 0)
      : [],
    releaseFrom: parseDate(params.get("from"), defaults.releaseFrom),
    releaseTo: parseDate(params.get("to"), defaults.releaseTo),
    minScore:
      params.has("score") && Number.isFinite(score)
        ? Math.min(10, Math.max(0, score))
        : 0,
  };
};

/** Writes only the values that differ from the category defaults, so URLs stay short. */
export const toSearchParams = (
  filters: MovieFilters,
  category: MovieCategory,
): URLSearchParams => {
  const defaults = defaultFilters(category);
  const params = new URLSearchParams();

  if (filters.sortBy !== defaults.sortBy) params.set("sort_by", filters.sortBy);
  if (filters.genres.length > 0) params.set("genres", filters.genres.join(","));
  if (filters.releaseFrom !== defaults.releaseFrom)
    params.set("from", filters.releaseFrom);
  if (filters.releaseTo !== defaults.releaseTo)
    params.set("to", filters.releaseTo);
  if (filters.minScore > 0) params.set("score", String(filters.minScore));

  return params;
};

export const toDiscoverParams = (filters: MovieFilters): DiscoverParams => ({
  sort_by: filters.sortBy,
  // A comma means "all of these genres"; TMDB uses a pipe for "any of these".
  with_genres: filters.genres.length > 0 ? filters.genres.join(",") : undefined,
  "primary_release_date.gte": filters.releaseFrom || undefined,
  "primary_release_date.lte": filters.releaseTo || undefined,
  "vote_average.gte": filters.minScore > 0 ? filters.minScore : undefined,
  // Without a minimum vote count, rating sorts are filled with obscure one-vote titles.
  "vote_count.gte": filters.sortBy.startsWith("vote_average")
    ? 300
    : filters.minScore > 0
      ? 50
      : undefined,
});
