import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineUser, AiOutlineUserDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Auth = ({ isLogin, onLogin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogin(false);
    navigate("/user-login");
  };

  return (
    <div>
      {isLogin ? (
        <>
          <AiOutlineUser style={{ fontSize: "200%", color: "darkblue" }} />{" "}
          {localStorage.getItem("username")}
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </>
      ) : (
        <>
          <Button>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/user-login"
            >
              Đăng nhập
            </Link>
          </Button>
          <Button style={{ marginLeft: "10px" }}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/user-register"
            >
              Đăng ký
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;
