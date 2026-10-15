import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar expand="md" variant="dark" sticky="top" className="app-header">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/movies">
              Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tv">
              TV Shows
            </Nav.Link>
            <Nav.Link as={NavLink} to="/people">
              People
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
