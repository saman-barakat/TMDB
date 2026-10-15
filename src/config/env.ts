const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Copy .env.example to .env and fill it in.`,
    );
  }
  return value;
};

export const env = {
  tmdbApiKey: required(import.meta.env.VITE_TMDB_API_KEY, "VITE_TMDB_API_KEY"),
  tmdbBaseUrl: required(
    import.meta.env.VITE_TMDB_BASE_URL,
    "VITE_TMDB_BASE_URL",
  ),
  tmdbImageBaseUrl: required(
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
    "VITE_TMDB_IMAGE_BASE_URL",
  ),
} as const;
