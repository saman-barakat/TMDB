export type MediaType = "movie" | "tv";

export type PopularTab = "movies" | "tv" | "theatres" | "on-tv";

export interface MediaSummary {
  id: number;
  mediaType: MediaType;
  title: string;
  releaseDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
}
