import { useFormik } from "formik";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsReplyAllFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";
import apiRouteConfig from "../../apiRouteConfig";

// Định nghĩa schema validation cho userData
const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

const UserRegister = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = (evt) => {
    evt.preventDefault();

    schema
      .validate(userData, { abortEarly: false })
      .then((validData) => {
        // Nếu dữ liệu hợp lệ, thực hiện các xử lý tiếp theo
        delete validData.retypePassword; // xóa thông tin kh cần thiết

        fetch(`http://127.0.0.1:8000/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              alert("Đăng ký thành công!");
              localStorage.setItem("token", data.token);
            }
          });
      })
      .catch((error) => {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
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
          title="Quay về trang đăng nhập"
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
        Đăng Ký
      </h2>
      <Form
        onSubmit={handleRegister}
        style={{ width: "50%", marginTop: "1%", marginBottom: "1%" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Nhập tên đại diện</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Nhập tên đại diện . . ."
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Nhập email đăng nhập . . ."
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Nhập mật khẩu . . ."
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control
            name="retypePassword"
            onChange={handleChange}
            type="password"
            placeholder="Nhập lại mật khẩu . . ."
          />
          {errors.retypePassword && (
            <div style={{ color: "red" }}>{errors.retypePassword}</div>
          )}
        </Form.Group>

        <Button type="submit" style={{ marginTop: "1%" }}>
          Đăng Ký
        </Button>
      </Form>
    </div>
  );
};

export default UserRegister;
