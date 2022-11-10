import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styling/navbar.css'

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" id="navbar">
      <Container id="nav-container">
        <div id="left-nav">
        <Navbar.Brand href="/" id="greenspace">greenspace</Navbar.Brand>
        </div>
        <div id="right-nav">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"> greta | </Nav.Link>
            <Nav.Link href="/providers"> providers | </Nav.Link>
            <Nav.Link href="/newsletter"> get involved |</Nav.Link>
            <Nav.Link href="/payment">donate ♡ </Nav.Link>
          </Nav>
          </Navbar.Collapse>
          </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;