import { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "./../UserContext";
const NavigationBar = () => {
  const { user, setUser } = useContext(UserContext);
  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container className="d-flex justify-content-space-between">
          <Navbar.Brand href="/">Blogged</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0 }}>
            <Nav className="me-auto">
              <Link className="nav-link mx-2" to={"/main/add-blog"}>
                Add Blog
              </Link>
              <Link className="nav-link mx-2" to={"/main"}>
                Blogs
              </Link>
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
