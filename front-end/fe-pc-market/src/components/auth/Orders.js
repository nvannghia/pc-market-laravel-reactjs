import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import moment from "moment";
import numeral from "numeral";

const Orders = () => {
  const [orders, setOrders] = useState();

  const userId = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/ordersList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "orders",
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setOrders(data.orders);
        }
      });
  }, []);

  return (
    <Container>
      {orders ? (
        <Table responsive="sm">
          <thead>
            <tr>
              <th>ID đơn hàng</th>
              <th>Tên người nhận</th>
              <th>SĐT người nhận</th>
              <th>Đ.C nhận hàng</th>
              <th>Ghi chú đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.full_name}</td>
                  <td>{order.phone_number}</td>
                  <td>{order.addr}</td>
                  <td>{order.note}</td>
                  <td style={{ color: "coral" }}>
                    {numeral(order.amount).format("0,0")}₫
                  </td>
                  <td>
                    {moment(order.created_at).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <img src={process.env.PUBLIC_URL + "/no-orders.png"} />
      )}
    </Container>
  );
};

export default Orders;
