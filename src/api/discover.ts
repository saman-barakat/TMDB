import { apiClient } from "@/api/client";
import { WATCH_REGION } from "@/config/constants";
import type { Movie, PaginatedResponse, TvShow } from "@/types/tmdb";

const freeParams = {
  watch_region: WATCH_REGION,
  with_watch_monetization_types: "free",
  sort_by: "popularity.desc",
};

export const discoverFreeMovies = async (): Promise<
  PaginatedResponse<Movie>
> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    "/discover/movie",
    {
      params: freeParams,
    },
  );
  return data;
};

export const discoverFreeTv = async (): Promise<PaginatedResponse<TvShow>> => {
  const { data } = await apiClient.get<PaginatedResponse<TvShow>>(
    "/discover/tv",
    {
      params: freeParams,
    },
  );
  return data;
};
