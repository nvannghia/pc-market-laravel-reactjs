import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState();
  const [parentCategory, setParentCategory] = useState(0);

  const { cateID } = useParams();
  //get old information of category
  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/categories/${cateID}`)
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

    fetch(`${apiRouteConfig.domain}/categories/${cateID}`, {
      method: "PUT",
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
          alert(`Đã sửa danh mục thành \`${categoryName}\` thành công!`);
        }
      });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
        <Form.Select onChange={(evt) => setParentCategory(evt.target.value)}>
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
  );
};

export default EditCategory;
