import type { MediaSummary } from "@/types/media";
import type { Movie, TrendingItem, TvShow } from "@/types/tmdb";

export const movieToSummary = (movie: Movie): MediaSummary => ({
  id: movie.id,
  mediaType: "movie",
  title: movie.title,
  releaseDate: movie.release_date,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  voteAverage: movie.vote_average,
});

export const tvToSummary = (show: TvShow): MediaSummary => ({
  id: show.id,
  mediaType: "tv",
  title: show.name,
  releaseDate: show.first_air_date,
  posterPath: show.poster_path,
  backdropPath: show.backdrop_path,
  voteAverage: show.vote_average,
});

export const trendingToSummary = (item: TrendingItem): MediaSummary | null => {
  switch (item.media_type) {
    case "movie":
      return movieToSummary(item);
    case "tv":
      return tvToSummary(item);
    default:
      return null;
  }
};
