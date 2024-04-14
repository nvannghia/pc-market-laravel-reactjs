import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Computer = () => {
  return (
    <Container>
      <h1 style={{ textAlign: "center", color: "blue" }}>Máy Tính</h1>
      <Row>
        <Col md={4} xs={12}>
          <Card>
            <Card.Img
              variant="top"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/1200px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Thêm vào giỏ</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12}>
          <Card>
            <Card.Img
              variant="top"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/1200px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Thêm vào giỏ</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12}>
          <Card>
            <Card.Img
              variant="top"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/1200px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Thêm vào giỏ</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12}>
          <Card>
            <Card.Img
              variant="top"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/1200px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Thêm vào giỏ</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Computer;
