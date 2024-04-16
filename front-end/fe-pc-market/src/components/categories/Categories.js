import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles.css";
import apiRouteConfig from "../../apiRouteConfig";

const Categories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/categories`)
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
      fetch(`${apiRouteConfig.domain}/categories/${cateID}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert(`Xóa danh mục \`${data.category.name}\` thành công`);
            //delete tr element
            const trElementDelete = document.getElementById(data.category.id);
            trElementDelete.parentNode.removeChild(trElementDelete);
          }
        });
    }
  };
  return (
    <>
      <Button variant="info" style={{ marginTop: "1%" }}>
        <Link
          to="/add-category"
          style={{ color: "black", textDecoration: "none" }}
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
                  <td>{c.created_at}</td>
                  <td>{c.updated_at}</td>
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
  );
};

export default Categories;
