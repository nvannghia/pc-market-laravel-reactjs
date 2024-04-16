import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import { BiArrowBack } from "react-icons/bi";
import { BsReplyAllFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState();
  const [parentCategory, setParentCategory] = useState(0);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //call API
    fetch(`${apiRouteConfig.domain}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Loại dữ liệu là JSON
      },
      body: JSON.stringify({
        category_name: categoryName,
        parent_id: parentCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Thêm danh mục \`${categoryName}\` thành công!`);
        }
      });
  };

  return (
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
        Thêm Danh Mục
      </h2>
      <Form
        onSubmit={handleSubmit}
        style={{ width: "50%", marginTop: "1%", marginBottom: "1%" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Tên danh mục</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên danh mục . . ."
            onChange={(evt) => setCategoryName(evt.target.value)}
          />
        </Form.Group>
        <Form.Select onChange={(evt) => setParentCategory(evt.target.value)}>
          <option value="0">Là danh mục cha</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Button type="submit" style={{ marginTop: "1%" }}>
          Thêm Danh Mục
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
