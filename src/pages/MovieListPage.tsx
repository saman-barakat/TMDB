import { useMemo } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import MediaCard from "@/components/media/MediaCard";
import MediaCardSkeleton from "@/components/media/MediaCardSkeleton";
import MovieFilterSidebar from "@/features/movies/MovieFilterSidebar";
import {
  CATEGORY_TITLES,
  defaultFilters,
  parseFilters,
  toSearchParams,
  type MovieCategory,
  type MovieFilters,
} from "@/features/movies/movieFilters";
import { useMovieList } from "@/features/movies/useMovieList";
import { useMovieGenres } from "@/hooks/useMovieGenres";

export default function MovieListPage({
  category,
}: {
  category: MovieCategory;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaults = useMemo(() => defaultFilters(category), [category]);
  const filters = useMemo(
    () => parseFilters(searchParams, category),
    [searchParams, category],
  );

  const genres = useMovieGenres();
  const movies = useMovieList(filters);
  const items = movies.data?.items;

  const applyFilters = (next: MovieFilters) =>
    setSearchParams(toSearchParams(next, category));

  return (
    <Container className="py-4">
      <h1 className="h3 fw-bold mb-4">{CATEGORY_TITLES[category]}</h1>
      <Row className="gy-4">
        <Col lg={3}>
          <MovieFilterSidebar
            key={`${category}?${searchParams.toString()}`}
            genres={genres.data ?? []}
            initial={filters}
            defaults={defaults}
            onApply={applyFilters}
          />
        </Col>

        <Col lg={9}>
          {movies.isError ? (
            <Alert variant="danger">{movies.error.message}</Alert>
          ) : movies.isPending || !items ? (
            <div className="media-grid" aria-busy="true">
              {Array.from({ length: 12 }, (_, index) => (
                <MediaCardSkeleton key={index} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted">No movies matched your filters.</p>
          ) : (
            <>
              <div className="media-grid">
                {items.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))}
              </div>
              {movies.hasNextPage && (
                <div className="text-center mt-5">
                  <Button
                    variant="info"
                    className="text-white fw-semibold px-5"
                    disabled={movies.isFetchingNextPage}
                    onClick={() => movies.fetchNextPage()}
                  >
                    {movies.isFetchingNextPage ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
