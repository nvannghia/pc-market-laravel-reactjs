import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsReplyAllFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleLogin = (evt) => {
    evt.preventDefault();

    fetch(`${apiRouteConfig.domain}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.name);
          localStorage.setItem("userID", data.user.id);
          localStorage.setItem("userRole", data.user.role);
          onLogin(true);
          navigate("/");
        } else {
          alert("Đăng nhập thất bại!");
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
        Đăng Nhập
      </h2>
      <Form
        onSubmit={handleLogin}
        style={{ width: "50%", marginTop: "1%", marginBottom: "1%" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            onChange={(evt) => setEmail(evt.target.value)}
            placeholder="Nhập email đăng nhập . . ."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
            placeholder="Nhập mật khẩu . . ."
          />
        </Form.Group>

        <Button type="submit" style={{ marginTop: "1%" }}>
          Đăng Nhập
        </Button>
      </Form>
    </div>
  );
};

export default UserLogin;
