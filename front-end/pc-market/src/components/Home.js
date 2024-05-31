import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import apiRouteConfig from "../apiRouteConfig";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import numeral from "numeral";
import { BsCartPlus } from "react-icons/bs";
import { CartCounterContext } from "../App";
import Swal from 'sweetalert2';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [q] = useSearchParams();

  const [cartCounter, cartDispatch] = useContext(CartCounterContext);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/products`)
      .then((res) => res.json())
      .then((data) => {
        const listProducts = data.products;
        let cateID = q.get("cateID");
        let kw = q.get("kw");
        if (cateID != null) {
          setProducts(
            listProducts.filter((p) => p.category_id === parseInt(cateID))
          );
        } else if (kw != null) {
          kw = kw.toLocaleLowerCase();
          setProducts(
            listProducts.filter(
              (p) => p.name.toLocaleLowerCase().indexOf(kw) >= 0
            )
          );
        } else {
          setProducts(listProducts);
        }
      });
  }, [q]);



  //add item to cart
  const hanldeAddToCart = (evt) => {
    evt.preventDefault();

    cartDispatch({
      type: "inc",
      payload: {
        num: 1
      }
    })

    const formData = new FormData(evt.target); // Lấy dữ liệu từ form

    // Tạo một đối tượng chứa thông tin sản phẩm từ dữ liệu form
    const product = {
      id: formData.get("prodID"),
      name: formData.get("prodName"),
      image: formData.get("prodImg"),
      quantity: formData.get("prodQuantity"),
      price: formData.get("prodPrice"),
    };

    const isCartCreated = sessionStorage.getItem("cartArray") ? true : false;
    if (isCartCreated) {
      const cartArray = JSON.parse(sessionStorage.getItem("cartArray"));

      // tìm xem đã có sp trong mảng lưu sessionStorage chưa?
      const itemFound = cartArray.find((c) => {
        return c.key === product.id;
      });

      //nếu đã có
      if (itemFound) {
        ++itemFound.value.quantity; // tăng số lượng lên 1
        sessionStorage.setItem("cartArray", JSON.stringify(cartArray));
      } else {
        cartArray.push({
          key: product.id,
          value: {
            name: product.name,
            image: product.image,
            quantity: product.quantity,
            price: product.price,
          },
        });

        sessionStorage.setItem("cartArray", JSON.stringify(cartArray));
      }
    } else {
      var cartArray = [
        {
          key: product.id,
          value: {
            name: product.name,
            image: product.image,
            quantity: product.quantity,
            price: product.price,
          },
        },
      ];
      sessionStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
    
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Đã thêm vào giỏ",
      showConfirmButton: false,
      timer: 1500,
      width: '16em',
      customClass: {
        title: 'my-custom-title-class',
        icon: 'my-custom-icon-class',
      }
    });
  };

  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          fontFamily: "Times New Roman",
          marginTop: "1%",
          marginRight: "2%",
          boxShadow: "3px 6px 3px grey",
          padding: "1%",
          backgroundColor: "#44A683",
          borderRadius: "4px",
        }}
      >
        <i>
          {products.length > 0 && q.get("cateID")
            ? products[0].category_name
            : "Tất cả sản phẩm"}
        </i>
      </h2>
      <Row>
        {products &&
          products
            .slice(currentPage * 8, (currentPage + 1) * 8)
            .map((p, index) => {
              return (
                <Col key={index} md={3} xs={12} style={{ marginTop: "2%" }}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={apiRouteConfig.domainImage + "/" + p.image}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="overflow-hidden">
                        {p.name}
                      </Card.Title>
                      <Card.Text
                        className="overflow-hidden"
                        style={{ color: "coral" }}
                      >
                        {numeral(p.price).format("0,0")}₫
                      </Card.Text>
                      <Card.Text className="overflow-hidden">
                        {p.description}
                      </Card.Text>

                      <Form
                        onSubmit={hanldeAddToCart}
                        style={{
                          width: "50%",
                          marginTop: "1%",
                          marginBottom: "1%",
                        }}
                      >
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="hidden"
                            name="prodID"
                            value={p.id}
                          />
                          <Form.Control
                            type="hidden"
                            name="prodImg"
                            value={p.image}
                          />
                          <Form.Control
                            type="hidden"
                            name="prodName"
                            value={p.name}
                          />
                          <Form.Control
                            type="hidden"
                            name="prodQuantity"
                            value={1}
                          />
                          <Form.Control
                            type="hidden"
                            name="prodPrice"
                            value={p.price}
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          style={{ marginTop: "1%", width: "100%" }}
                        >
                          <BsCartPlus style={{ fontSize: "200%" }} />
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
      </Row>

      <ReactPaginate
        pageCount={Math.ceil(products.length / 8)} // Số lượng trang
        pageRangeDisplayed={5} // Số lượng nút phân trang hiển thị
        marginPagesDisplayed={2} // Số lượng trang hiển thị ở hai bên của nút đầu và cuối
        onPageChange={handlePageClick} // Callback khi chuyển trang
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={<GoArrowLeft />} // Nhãn cho nút Previous
        nextLabel={<GoArrowRight />} // Nhãn cho nút Next
        disablePrevious={true}
      />
    </Container>
  );
};

export default Home;
