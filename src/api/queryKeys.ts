import type { MovieList } from "@/api/movies";
import type { TimeWindow } from "@/types/tmdb";

export const queryKeys = {
  trending: {
    movies: (timeWindow: TimeWindow) =>
      ["trending", "movie", timeWindow] as const,
  },
  movies: {
    list: (list: MovieList, page: number) =>
      ["movies", "list", list, page] as const,
  },
};
