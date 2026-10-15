import { Container } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container className="py-5">
      <h1 className="display-5 fw-bold">Welcome</h1>
      <p className="lead">
        Discover movies, TV shows and the people behind them.
      </p>
    </Container>
  );
}
