import { useEffect, useState } from "react";
import { Button, Container, Table, Toast } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles.css";
import apiRouteConfig from "../../apiRouteConfig";
import moment from "moment";
import ToastsError from "../errors/ToastsError";
import ReactPaginate from "react-paginate";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

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

  const selectAll = () => {
    const checkAll = document.getElementById("checkAll");
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    if (checkAll.checked) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  const deleteChecked = () => {
    const isConfirm = window.confirm(
      "Bạn có chắc muốn xóa các danh mục đã chọn?"
    );
    if (isConfirm) {
      const checkedCheckboxes = document.querySelectorAll(
        "input[type=checkbox]:checked:not(#checkAll)" // lấy tất cả thẻ input có type là checkbox đã được checked ngoại trừ input có id "checkAll"
      );
      const idCates = [];
      if (checkedCheckboxes.length > 0) {
        checkedCheckboxes.forEach((input) => {
          idCates.push(input.id);
        });
        //call api to delete
        const token = localStorage.getItem("token");
        fetch(`${apiRouteConfig.domain}/delete-categories`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            catesId: idCates,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              alert(`Đã xóa các danh mục được chọn!`);
              setCategories(data.categories);
            }
          });
      }
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
                <th className="d-flex justify-content-center align-items-center ">
                  <input
                    type="checkbox"
                    id="checkAll"
                    onChange={selectAll}
                    className="checkbox-large"
                  />
                  <HiOutlineTrash
                    className="action"
                    style={{ color: "red", fontSize: "50px" }}
                    onClick={deleteChecked}
                  />
                </th>
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
                categories
                  .slice(currentPage * 6, (currentPage + 1) * 6)
                  .map((c, index) => {
                    let url = `/edit-category/${c.id}`;
                    return (
                      <tr key={c.id} id={c.id}>
                        <td>
                          <input
                            type="checkbox"
                            id={c.id}
                            className="checkbox-large"
                          />
                        </td>
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
      <ReactPaginate
        pageCount={Math.ceil(categories.length / 6)} // Số lượng trang
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

export default Categories;
