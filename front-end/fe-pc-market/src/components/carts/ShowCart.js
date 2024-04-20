import { Button, Container, Table } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import numeral from "numeral";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

const ShowCart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cartArray"))
  );
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
              <td colSpan={7} style={{ textAlign: "right" }}>
                <Button type="submit" style={{ marginTop: "1%" }}>
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
