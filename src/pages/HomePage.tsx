import { Alert, Container, Spinner } from "react-bootstrap";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";

export default function HomePage() {
  const { data, isPending, isError, error } = useTrendingMovies("week");

  return (
    <Container className="py-5">
      <h1 className="display-5 fw-bold">Trending this week</h1>
      {isPending && <Spinner animation="border" role="status" />}
      {isError && <Alert variant="danger">{error.message}</Alert>}
      {data && (
        <ul>
          {data.results.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </Container>
  );
}
