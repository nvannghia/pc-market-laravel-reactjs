import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import { Link } from "react-router-dom";
import { BsReplyAllFill } from "react-icons/bs";
import ToastsError from "../errors/ToastsError";

const AddProduct = () => {
  const [categories, setCategories] = useState();

  //check role
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
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
    // display the image
    const image = document.getElementById("prodIMG");
    image.src = URL.createObjectURL(evt.target.files[0]);
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

    const token = localStorage.getItem("token") || null;
    fetch(`${apiRouteConfig.domain}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Thêm sản phẩm \`${data.product.name}\` thành công!`);
          //reset the form and delete image display of previous product
          document.getElementById("addProductForm").reset();
          document.getElementById("prodIMG").setAttribute("src", "#");
        } else {
          alert("Thêm sản phẩm thất bại! Vui lòng kiểm tra lại các thông tin.");
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
          <Link to="/products">
            <BsReplyAllFill
              className="backIcon"
              style={{ fontSize: "300%" }}
              title="Quay về trang danh sách sản phẩm"
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
            Thêm Sản Phẩm
          </h2>
          <Form
            id="addProductForm"
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
              <img src="abc.png" id="prodIMG" width="50%" />
              <Form.Control
                id="image"
                name="image"
                onChange={handleImageFile}
                type="file"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <textarea
                rows="3" // Adjust the number of visible lines as needed
                style={{ width: "100%" }}
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
      ) : (
        <ToastsError />
      )}
    </>
  );
};

export default AddProduct;
