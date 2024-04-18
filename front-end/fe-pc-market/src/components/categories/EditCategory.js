import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";
import { BsReplyAllFill } from "react-icons/bs";
import ToastsError from "../errors/ToastsError";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState();
  const [parentCategory, setParentCategory] = useState(0);

  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  const { cateID } = useParams();

  //get old information of category
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    fetch(`${apiRouteConfig.domain}/categories/${cateID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategoryName(data.category.name);
          setParentCategory(data.category.parent_id);
        }
      });
  }, []);

  //handle update category
  const handleEditCategory = (evt) => {
    evt.preventDefault();

    const token = localStorage.getItem("token") || null;
    fetch(`${apiRouteConfig.domain}/categories/${cateID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category_name: categoryName,
        parent_id: parentCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Đã sửa danh mục thành \`${categoryName}\` thành công!`);
        }
      });
  };
  return (
    <>
      {isAdmin ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Link to="/categories">
            <BsReplyAllFill
              className="backIcon"
              style={{ fontSize: "300%" }}
              title="Quay về trang danh sách danh mục"
            />
          </Link>
          <h2
            style={{
              marginTop: "1%",
              marginRight: "2%",
              boxShadow: "3px 6px 3px grey",
              padding: "1%",
              backgroundColor: "rgb(209, 231, 221)",
              borderRadius: "4px",
            }}
          >
            Sửa Danh Mục
          </h2>
          <Form
            onSubmit={handleEditCategory}
            style={{ width: "50%", marginTop: "1%", marginBottom: "1%" }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                placeholder="Nhập tên danh mục . . ."
                onChange={(evt) => setCategoryName(evt.target.value)}
              />
            </Form.Group>
            <Form.Select
              onChange={(evt) => setParentCategory(evt.target.value)}
            >
              <option value="0">Là danh mục cha</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Button type="submit" style={{ marginTop: "1%" }}>
              Sửa Danh Mục
            </Button>
          </Form>
        </div>
      ) : (
        <ToastsError />
      )}
    </>
  );
};

export default EditCategory;
