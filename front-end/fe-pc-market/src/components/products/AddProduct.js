import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";

const AddProduct = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetch(`${apiRouteConfig.domain}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories(data.categories);
        }
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageFile = (evt) => {
    setFormData((prevState) => ({
      ...prevState,
      image: evt.target.files[0], // Lưu trữ đối tượng File của hình ảnh
    }));
  };

  const handleAddProduct = (evt) => {
    evt.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category_id", formData.category_id);

    fetch(`${apiRouteConfig.domain}/products`, {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Thêm sản phẩm \`${data.product.name}\` thành công!`);
        }
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        onSubmit={handleAddProduct}
        style={{ width: "50%", marginTop: "1%", marginBottom: "1%" }}
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Nhập tên sản phẩm . . ."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            name="price"
            onChange={handleChange}
            type="text"
            placeholder="Nhập giá sản phẩm . . ."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control name="image" onChange={handleImageFile} type="file" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="Nhập mô tả sản phẩm . . ."
          />
        </Form.Group>

        <Form.Label>Danh mục</Form.Label>
        <Form.Select name="category_id" onChange={handleChange}>
          <option disabled>Chọn danh mục</option>
          {categories &&
            categories.map((c) => <option value={c.id}>{c.name}</option>)}
        </Form.Select>
        <Button type="submit" style={{ marginTop: "1%" }}>
          Thêm sản phẩm
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
