import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

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

  const handleDeleteProduct = (prodID) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (isConfirm) {
      fetch(`${apiRouteConfig.domain}/products/${prodID}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert(`Xóa sản phẩm ${data.product.name} thành công!`);
            //delete tr element
            const trElementDelete = document.getElementById(data.product.id);
            trElementDelete.parentNode.removeChild(trElementDelete);
          }
        });
    }
  };

  //css action
  const actionStyle = {
    fontSize: "25px",
    cursor: "pointer",
  };
  return (
    <div>
      <Button variant="primary" style={{ marginTop: "1%" }}>
        <Link
          to="/add-product"
          style={{ color: "white", textDecoration: "none" }}
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
            <th style={{ textAlign: "center" }}>Sửa &nbsp;|&nbsp; Xóa</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((p) => {
              let url = `/edit-product/${p.id}`;
              return (
                <tr id={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <img
                      style={{ width: "50%" }}
                      src={apiRouteConfig.domainImage + "/" + p.image}
                    />
                  </td>
                  <td>{p.category_id}</td>
                  <td>{p.description}</td>
                  <td>{p.created_at}</td>
                  <td>{p.updated_at}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Link to={url}>
                        <FaRegEdit
                          className="action"
                          style={{ ...actionStyle, color: "darkblue" }}
                        />
                      </Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                      <AiOutlineDelete
                        className="action"
                        style={{ ...actionStyle, color: "red" }}
                        onClick={() => handleDeleteProduct(p.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;