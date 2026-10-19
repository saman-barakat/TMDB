import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "@/api/genres";
import { queryKeys } from "@/api/queryKeys";

export const useMovieGenres = () =>
  useQuery({
    queryKey: queryKeys.genres.movie,
    queryFn: getMovieGenres,
    staleTime: Infinity,
  });
