import { Container } from "react-bootstrap";
import tmdbLogo from "@/assets/tmdb-logo.svg";

export default function Footer() {
  return (
    <footer className="app-footer py-4 mt-5">
      <Container className="d-flex flex-column flex-md-row align-items-center gap-3">
        <img src={tmdbLogo} alt="The Movie Database (TMDB)" height="16" />
        <p className="mb-0 small">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </Container>
    </footer>
  );
}
