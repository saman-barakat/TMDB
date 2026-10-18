import type { MovieList } from "@/api/movies";
import type { MediaType, PopularTab } from "@/types/media";
import type { TimeWindow } from "@/types/tmdb";

export const queryKeys = {
  trending: {
    all: (timeWindow: TimeWindow) => ["trending", "all", timeWindow] as const,
  },
  movies: {
    list: (list: MovieList, page: number) =>
      ["movies", "list", list, page] as const,
  },
  popular: (tab: PopularTab) => ["popular", tab] as const,
  freeToWatch: (mediaType: MediaType) => ["free-to-watch", mediaType] as const,
};
