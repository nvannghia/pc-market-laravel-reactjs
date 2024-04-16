import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";

const Products = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Button variant="info" style={{ marginTop: "1%" }}>
        <Link
          to="/add-product"
          style={{ color: "black", textDecoration: "none" }}
        >
          Thêm sản phẩm
        </Link>
      </Button>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((p) => {
              return (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <img
                      style={{ width: "100%" }}
                      src={apiRouteConfig.domainImage + "/" + p.image}
                    />
                  </td>
                  <td>{p.category_id}</td>
                  <td>{p.description}</td>
                  <td>{p.created_at}</td>
                  <td>{p.updated_at}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
