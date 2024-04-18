import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../components/auth/Auth";
import { UserContext } from "../App";
import { useContext } from "react";

const Header = ({ isLoggedIn, onLogin }) => {
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            PC-Market
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Danh mục" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <>
              {isAdmin ? (
                <NavDropdown title="Admin thêm" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/">
                    <Link to="/categories">Danh Mục</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Link to="/products">Sản Phẩm</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </>
            <Nav.Link href="#deets">Cart</Nav.Link>
            <Nav.Link eventKey={2}>
              <Auth isLogin={isLoggedIn} onLogin={onLogin} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </div>
  );
};

export default Header;
