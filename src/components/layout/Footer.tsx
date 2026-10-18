import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import tmdbLogo from "@/assets/tmdb-logo.svg";
import { navSections } from "@/config/navigation";

const resourceLinks = [
  { label: "About TMDB", href: "https://www.themoviedb.org/about" },
  {
    label: "API Documentation",
    href: "https://developer.themoviedb.org/reference/getting-started",
  },
  { label: "System Status", href: "https://status.themoviedb.org/" },
  {
    label: "API Terms of Use",
    href: "https://www.themoviedb.org/api-terms-of-use",
  },
  {
    label: "Privacy Policy",
    href: "https://www.themoviedb.org/privacy-policy",
  },
];

export default function Footer() {
  return (
    <footer className="app-footer py-5 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={3}>
            <img src={tmdbLogo} alt="The Movie Database (TMDB)" height="16" />
            <p className="small mt-3 mb-0">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </Col>

          {navSections.map((section) => (
            <Col key={section.id} xs={6} md={2}>
              <h2 className="h6 fw-bold text-uppercase">{section.label}</h2>
              <ul className="footer-links">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          <Col xs={12} md={3}>
            <h2 className="h6 fw-bold text-uppercase">TMDB</h2>
            <ul className="footer-links">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
