import { Button, Container, FloatingLabel, Form, Table } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import numeral from "numeral";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

const ShowCart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cartArray")) || []
  );

  const nav = useNavigate();

  //check isLogin for payment
  const userID = localStorage.getItem("userID");

  var total = 0;

  const handleQuantityChange = (index, newValue) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].value.quantity = parseInt(newValue);
    sessionStorage.setItem("cartArray", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleDelete = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    sessionStorage.setItem("cartArray", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleDeleteAll = () => {
    const isConfirm = window.confirm(
      "Bạn có chắc muốn xóa hết tất cả sản phẩm trong giỏ hàng?"
    );
    if (isConfirm) {
      sessionStorage.setItem("cartArray", JSON.stringify([])); // set thành rỗng để kh lỗi lần sau ấn vào!
      setCartItems([]);
    }
  };

  //order function
  const handleOrder = (evt) => {
    evt.preventDefault();

    //get token and userID
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");

    const formData = new FormData(evt.target); // Lấy dữ liệu từ form
    // ready order data
    const orderData = {
      amount: total.toString(),
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      address: formData.get("address"),
      note: formData.get("note"),
      userId: userID,
    };

    //ready order-detail data
    const orderDetailData = {
      productsId: [],
      quantities: [],
      unitPrices: [],
    };
    cartItems.forEach((item) => {
      orderDetailData.productsId.push(item.key);
      orderDetailData.quantities.push(item.value.quantity);
      orderDetailData.unitPrices.push(item.value.price);
    });

    // insert to orders table
    fetch(`${apiRouteConfig.domain}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        //action for server know what we do
        action: "order",
        // order data
        ...orderData,
        // order-detail data
        ...orderDetailData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Đặt hàng thành công! Mời bạn tiếp tục mua sắm");
          //clear sessionStorage
          sessionStorage.removeItem("cartArray");
          // back to HOME
          nav("/");
        } else alert("Đặt hàng thất bại!");
      });
  };

  return (
    <Container>
      {cartItems.length > 0 ? (
        <Table responsive="sm">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th style={{ textAlign: "center" }}>Hình</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              total += item.value.quantity * item.value.price;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.value.name}</td>
                  <td>
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      src={apiRouteConfig.domainImage + "/" + item.value.image}
                      alt={item.value.name}
                    />
                  </td>
                  <td style={{ color: "coral" }}>
                    {numeral(item.value.price).format("0,0")}₫
                  </td>
                  <td>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="10"
                      defaultValue={parseInt(item.value.quantity)}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td style={{ color: "coral" }}>
                    {numeral(item.value.price * item.value.quantity).format(
                      "0,0"
                    )}
                    ₫
                  </td>
                  <td>
                    <TiDeleteOutline
                      className="backIcon"
                      title="Xóa sản phẩm này!"
                      style={{ color: "red", fontSize: "200%", width: "50px" }}
                      onClick={handleDelete}
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={5} style={{ textAlign: "right" }} className="h5">
                Tổng tiền:
              </td>
              <td style={{ color: "coral" }} className="h5">
                {numeral(total).format("0,0")}₫
              </td>
              <td>
                <Button variant="danger" onClick={handleDeleteAll}>
                  Xóa tất cả
                </Button>
              </td>
            </tr>

            <tr>
              <td colSpan={7}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      marginTop: "20px",
                      marginBottom: "2%",
                      textAlign: "center",
                    }}
                  >
                    Thông tin người nhận hàng!
                  </h3>
                  <Form onSubmit={handleOrder} style={{ width: "50%" }}>
                    <Form.Group className="mb-3" controlId="fullName">
                      <Form.Label>Họ & Tên</Form.Label>
                      <Form.Control
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Nhập họ & tên người nhận hàng. . ."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <Form.Label>SĐT</Form.Label>
                      <Form.Control
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Nhập số điện thoại. . ."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Nhập địa chỉ. . ."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="note">
                      <Form.Label>Ghi chú đơn hàng</Form.Label>
                      <Form.Control
                        id="note"
                        name="note"
                        as="textarea"
                        rows={3}
                        placeholder="Nhập các ghi chú/ lưu ý cho đơn hàng. . ."
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      style={{ marginTop: "1%", width: "30%" }}
                    >
                      {userID ? (
                        "Đặt hàng"
                      ) : (
                        <Link
                          to="/user-login"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Vui lòng đăng nhập để thanh toán!
                        </Link>
                      )}
                    </Button>
                  </Form>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <img src={process.env.PUBLIC_URL + "/empty-cart.svg"} />
      )}
    </Container>
  );
};

export default ShowCart;