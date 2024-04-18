import { useEffect, useState } from "react";
import { Button, Container, Table, Toast } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles.css";
import apiRouteConfig from "../../apiRouteConfig";
import moment from "moment";
import ToastsError from "../errors/ToastsError";

const Categories = () => {
  const [categories, setCategories] = useState(null);

  //check role
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories(data.categories);
        }
      });
  }, []);

  //css action
  const actionStyle = {
    fontSize: "25px",
    cursor: "pointer",
  };

  const handleDeleteCategory = (cateID) => {
    const isConfirm = window.confirm("Bạn có chắc muốn xóa danh mục này?");
    if (isConfirm) {
      const token = localStorage.getItem("token") || null;
      fetch(`${apiRouteConfig.domain}/categories/${cateID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert(`Xóa danh mục \`${data.category.name}\` thành công`);
            //delete tr element
            const trElementDelete = document.getElementById(data.category.id);
            trElementDelete.parentNode.removeChild(trElementDelete);
          } else {
            alert("Xóa danh mục thất bại!");
          }
        });
    }
  };
  return (
    <>
      {isAdmin ? (
        <>
          <Button variant="primary" style={{ marginTop: "1%" }}>
            <Link
              to="/add-category"
              style={{ color: "white", textDecoration: "none" }}
            >
              Thêm Danh Mục
            </Link>
          </Button>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Danh mục cha</th>
                <th>Ngày tạo</th>
                <th>Ngày Cập Nhật</th>
                <th style={{ textAlign: "center" }}>
                  Sửa &nbsp;&nbsp;|&nbsp;&nbsp; Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((c, index) => {
                  let url = `/edit-category/${c.id}`;
                  return (
                    <tr key={c.id} id={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.parent_id}</td>
                      <td>
                        {moment(c.created_at).format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td>
                        {moment(c.updated_at).format("DD-MM-YYYY HH:mm:ss")}
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
                          |
                          <AiOutlineDelete
                            className="action"
                            style={{ ...actionStyle, color: "red" }}
                            onClick={() => handleDeleteCategory(c.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      ) : (
        <ToastsError />
      )}
    </>
  );
};

export default Categories;
