import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverMovies } from "@/api/discover";
import { movieToSummary } from "@/api/mappers";
import { queryKeys } from "@/api/queryKeys";
import {
  toDiscoverParams,
  type MovieFilters,
} from "@/features/movies/movieFilters";
import type { MediaSummary } from "@/types/media";

// TMDB does not serve pages beyond 500.
const MAX_PAGES = 500;

export const useMovieList = (filters: MovieFilters) => {
  const params = toDiscoverParams(filters);

  return useInfiniteQuery({
    queryKey: queryKeys.movies.discover(params),
    queryFn: ({ pageParam }) => discoverMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < Math.min(lastPage.total_pages, MAX_PAGES)
        ? lastPage.page + 1
        : undefined,
    select: (data): { items: MediaSummary[]; total: number } => {
      // TMDB can repeat a title across pages, so de-duplicate by id.
      const seen = new Set<number>();
      const items: MediaSummary[] = [];
      for (const page of data.pages) {
        for (const movie of page.results) {
          if (!seen.has(movie.id)) {
            seen.add(movie.id);
            items.push(movieToSummary(movie));
          }
        }
      }
      return { items, total: data.pages[0]?.total_results ?? 0 };
    },
  });
};
