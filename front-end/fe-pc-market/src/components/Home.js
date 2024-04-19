import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import apiRouteConfig from "../apiRouteConfig";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [q] = useSearchParams();

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
        let kw = q.get("cateID");
        if (kw != null) {
          setProducts(
            listProducts.filter((p) => p.category_id === parseInt(kw))
          );
        } else {
          setProducts(listProducts);
        }
      });
  }, [q]);
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
                      <Card.Text className="overflow-hidden">
                        {p.description}
                      </Card.Text>
                      <Button variant="primary">Thêm vào giỏ</Button>
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
