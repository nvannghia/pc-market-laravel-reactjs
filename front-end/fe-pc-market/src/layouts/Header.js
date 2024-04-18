import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../components/auth/Auth";
import { useEffect, useState } from "react";
import apiRouteConfig from "../apiRouteConfig";

const Header = ({ isLoggedIn, onLogin }) => {
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  const [categories, setCategories] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories(data.categories);
        }
      });
  }, []);

  return (
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
              {categories &&
                categories.map((c) => {
                  return (
                    <NavDropdown.Item>
                      <Link to={"/?cateID=" + c.id}>{c.name}</Link>
                    </NavDropdown.Item>
                  );
                })}

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
  );
};

export default Header;
