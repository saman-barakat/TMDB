import { apiClient } from "@/api/client";
import { WATCH_REGION } from "@/config/constants";
import type { Movie, PaginatedResponse, TvShow } from "@/types/tmdb";

export type DiscoverParams = Record<string, string | number | undefined>;

const freeParams: DiscoverParams = {
  watch_region: WATCH_REGION,
  with_watch_monetization_types: "free",
  sort_by: "popularity.desc",
};

export const discoverMovies = async (
  params: DiscoverParams,
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    "/discover/movie",
    { params },
  );
  return data;
};

export const discoverFreeMovies = (): Promise<PaginatedResponse<Movie>> =>
  discoverMovies(freeParams);

export const discoverFreeTv = async (): Promise<PaginatedResponse<TvShow>> => {
  const { data } = await apiClient.get<PaginatedResponse<TvShow>>(
    "/discover/tv",
    {
      params: freeParams,
    },
  );
  return data;
};
