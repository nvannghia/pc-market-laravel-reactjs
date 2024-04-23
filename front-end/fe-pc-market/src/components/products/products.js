import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import numeral from "numeral";
import moment from "moment";
import ToastsError from "../errors/ToastsError";
import "../styles.css";
import ReactPaginate from "react-paginate";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Products = () => {
  const [products, setProducts] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  //check role
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  //get all products
  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.products);
        }
      });
  }, []);

  //delete a product
  const handleDeleteProduct = (prodID) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (isConfirm) {
      fetch(`${apiRouteConfig.domain}/products/${prodID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    <>
      {isAdmin ? (
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
                products
                  .slice(currentPage * 2, (currentPage + 1) * 2)
                  .map((p) => {
                    let url = `/edit-product/${p.id}`;
                    return (
                      <tr id={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td style={{ color: "coral" }}>
                          {numeral(p.price).format("0,0")}₫
                        </td>
                        <td>
                          <img
                            style={{ width: "200px" }}
                            src={apiRouteConfig.domainImage + "/" + p.image}
                          />
                        </td>
                        <td>{p.category_name}</td>
                        <td>{p.description}</td>
                        <td>
                          {moment(p.created_at).format("DD-MM-YYYY HH:mm:ss")}
                        </td>
                        <td>
                          {moment(p.updated_at).format("DD-MM-YYYY HH:mm:ss")}
                        </td>
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
      ) : (
        <ToastsError />
      )}
      <ReactPaginate
        pageCount={Math.ceil(products.length / 2)} // Số lượng trang
        pageRangeDisplayed={5} // Số lượng nút phân trang hiển thị
        marginPagesDisplayed={2} // Số lượng trang hiển thị ở hai bên của nút đầu và cuối
        onPageChange={handlePageClick} // Callback khi chuyển trang
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={<GoArrowLeft />} // Nhãn cho nút Previous
        nextLabel={<GoArrowRight />} // Nhãn cho nút Next
        disablePrevious={true}
      />
    </>
  );
};

export default Products;
