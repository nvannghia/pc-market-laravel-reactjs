import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import apiRouteConfig from "../apiRouteConfig";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [q] = useSearchParams();
  const kw = q.get("cateID");

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
      <h1 style={{ textAlign: "center", color: "blue" }}>
        {products.length > 0 ? products[0].category_name : "Tất cả sản phẩm"}
      </h1>
      <Row>
        {products &&
          products.map((p) => {
            return (
              <Col md={3} xs={12} style={{ marginTop: "2%" }}>
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
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>{p.description}</Card.Text>
                    <Button variant="primary">Thêm vào giỏ</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Home;
