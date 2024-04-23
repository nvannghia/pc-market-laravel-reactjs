import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../components/auth/Auth";
import { useEffect, useState } from "react";
import apiRouteConfig from "../apiRouteConfig";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import "../components/styles.css";

const Header = ({ isLoggedIn, onLogin }) => {
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  const nav = useNavigate();

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

  // find product
  const findProduct = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const kw = formData.get("kw");
    nav(`/?kw=${kw}`);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <Image
              src={process.env.PUBLIC_URL + "/logo-store.jpg"}
              style={{ width: "80px" }}
              thumbnail
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="/orders"
                style={{ color: "black", textDecoration: "none" }}
              >
                Đơn hàng đã đặt
              </Link>
            </Nav.Link>
            <NavDropdown title="Danh mục" id="collapsible-nav-dropdown">
              {categories &&
                categories.map((c, index) => {
                  return (
                    <NavDropdown.Item key={index}>
                      <Link
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "5px 10px",
                        }}
                        to={"/?cateID=" + c.id}
                      >
                        {c.name}
                      </Link>
                    </NavDropdown.Item>
                  );
                })}

              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/">Tất cả sản phẩm</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            <Form
              onSubmit={findProduct}
              className="d-flex"
              style={{ width: "500px" }}
            >
              <Form.Control
                name="kw"
                type="search"
                placeholder="Nhập tên sản phẩm . . ."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit">
                <BiSearchAlt />
              </Button>
            </Form>

            <Nav.Link>
              <Link to="/show-cart">
                <AiOutlineShoppingCart
                  style={{
                    fontSize: "200%",
                    color: "coral",
                    marginLeft: "10x",
                  }}
                />
              </Link>
            </Nav.Link>
            <Nav>
              {isAdmin ? (
                <NavDropdown title="Admin thêm" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/">
                    <Link
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "5px 10px",
                      }}
                      to="/categories"
                    >
                      Danh Mục
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Link
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "5px 10px",
                      }}
                      to="/products"
                    >
                      Sản Phẩm
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    <Link
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "5px 10px",
                      }}
                      to="/statistical"
                    >
                      Thống kê doanh thu
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
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
