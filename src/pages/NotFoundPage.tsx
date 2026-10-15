import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-5 fw-bold">Page not found</h1>
      <p className="lead">We couldn't find what you were looking for.</p>
      <Link to="/">Back to home</Link>
    </Container>
  );
}
