import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import { Link, useParams } from "react-router-dom";
import { BsReplyAllFill } from "react-icons/bs";
import ToastsError from "../errors/ToastsError";

const EditProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category_id: "",
  });
  const { prodID } = useParams();

  //check role
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole && userRole === "ADMIN";

  //get old information of product
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    fetch(`${apiRouteConfig.domain}/products/${prodID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFormData({
            name: data.product.name,
            price: data.product.price,
            description: data.product.description,
            image: data.product.image,
            category_id: data.product.category_id,
          });
        }
      });
  }, []);

  const [categories, setCategories] = useState();
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

  const handleImageFile = (evt) => {
    setFormData((prevState) => ({
      ...prevState,
      image: evt.target.files[0], // Lưu trữ đối tượng File của hình ảnh
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditProduct = (evt) => {
    evt.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category_id", formData.category_id);

    const token = localStorage.getItem("token") || null;
    fetch(`${apiRouteConfig.domain}/products/update/${prodID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Sửa sản phẩm thành \`${data.product.name}\` thành công!`);
        } else {
          alert("Sửa sản phẩm thất bại!");
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
            Sửa Sản Phẩm
          </h2>
          <Form
            onSubmit={handleEditProduct}
            style={{ width: "50%", marginTop: "1%", marginBottom: "1%" }}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                name="name"
                onChange={handleChange}
                type="text"
                value={formData.name}
                placeholder="Nhập tên sản phẩm . . ."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="text"
                placeholder="Nhập giá sản phẩm . . ."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <img
                style={{ width: "50%" }}
                src={apiRouteConfig.domainImage + "/" + formData.image}
              />
              <Form.Control
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
                value={formData.description}
                onChange={handleChange}
                type="text"
                placeholder="Nhập mô tả sản phẩm . . ."
              />
            </Form.Group>

            <Form.Label>Danh mục</Form.Label>
            <Form.Select name="category_id" onChange={handleChange}>
              <option disabled>Chọn danh mục</option>
              {categories &&
                categories.map((c) =>
                  c.id === formData.category_id ? (
                    <option value={c.id} selected>
                      {c.name}
                    </option>
                  ) : (
                    <option value={c.id}> {c.name} </option>
                  )
                )}
            </Form.Select>

            <Button type="submit" style={{ marginTop: "1%" }}>
              Sửa sản phẩm
            </Button>
          </Form>
        </div>
      ) : (
        <ToastsError />
      )}
    </>
  );
};

export default EditProduct;
