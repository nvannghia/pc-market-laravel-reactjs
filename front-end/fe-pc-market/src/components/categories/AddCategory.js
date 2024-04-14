import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";

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
    <div style={{ display: "flex", justifyContent: "center" }}>
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
