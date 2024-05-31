import { useContext, useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { Button } from '@mui/material';
import { AiOutlineUser, AiOutlineUserDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import apiRouteConfig from "../../apiRouteConfig";
import { AuthContext } from "../../App";
import Swal from "sweetalert2";

const Auth = ({ isLogin, onLogin }) => {
  const navigate = useNavigate();

  const [Auth, AuthDispatch] = useContext(AuthContext);

  const handleLogout = () => {
    //call API to delete token (server will delete token)
    const token = localStorage.getItem("token");
    fetch(`${apiRouteConfig.domain}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    //call to dispatch
    AuthDispatch({
      type: "logout"
    })
  };


  const handleLogin = (evt) => {

    Swal.fire({
      title: "Đăng nhập",
      html: `
        <input id="email" class="swal2-input" placeholder="Tên đăng nhập">
        <input id="password" class="swal2-input" type="password" placeholder="Mật khẩu">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Đăng nhập",
      cancelButtonText: "Hủy",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
          Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin.');
          return false;
        }

        try {
          const loginUrl = `${apiRouteConfig.domain}/login`;
          const response = await fetch(loginUrl,
            {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });

          const data = await response.json();
          if (data.error) {
            const errorMessages = [];
            if (data.error.email) {
              errorMessages.push(`Email: ${data.error.email.join(', ')}`);
            }
            if (data.error.password) {
              errorMessages.push(`Password: ${data.error.password.join(', ')}`);
            }

            return Swal.showValidationMessage(errorMessages.join('<br>'));
          }

          //save token
          localStorage.setItem("token", data.token);

          AuthDispatch({
            type: "login",
            payload: data.user,
          });

          navigate("/");
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  };


  const handleRegister = () => {
    Swal.fire({
      title: "Đăng ký",
      html: `
        <input id="name" class="swal2-input" placeholder="Nhập tên đại diện . . .">
        <input id="email" class="swal2-input"  placeholder="Nhập email. . .">
        <input id="password" class="swal2-input" type="password"  placeholder="Nhập mật khẩu. . .">
        <input id="retypePassword" class="swal2-input" type="password"  placeholder="Nhập lại mật khẩu. . .">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Đăng ký",
      cancelButtonText: "Hủy",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const retypePassword = document.getElementById('retypePassword').value;

        if (!name || !email || !password || !retypePassword) {
          Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin.');
          return false;
        }

        if (password !== retypePassword) {
          Swal.showValidationMessage('Mật khẩu không khớp.');
          return false;
        }

        try {
          const registerUrl = `${apiRouteConfig.domain}/register`;
          const response = await fetch(registerUrl,
            {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name,
                role: "CUSTOMER",
              }),

            });

          const data = await response.json();
          if (data.error) {
            const errorMessages = [];
            if (data.error.email) {
              errorMessages.push(`Email: ${data.error.email.join(', ')}`);
            }
            if (data.error.password) {
              errorMessages.push(`Password: ${data.error.password.join(', ')}`);
            }
            return Swal.showValidationMessage(errorMessages.join('<br>'));
          }

          // IF: register success
          await Swal.fire({
            title: 'Đăng ký thành công!',
            text: `Hãy đăng nhập`,
            icon: 'success'
          });
    
          handleLogin()

        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }


  return (
    <div>
      {Auth ? (
        <>
          <AiOutlineUser style={{ fontSize: "200%", color: "darkblue" }} />{" "}
          <span style={{ marginRight: "10px" }}>
            {Auth.name}
          </span>
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </>
      ) : (
        <>
          {/* <Button variant="outlined" style={{ minWidth:"50px" }}>
            <Link
              style={{color: "#1976d2",  textDecoration: "none" }}
              to="/user-login"
            >
              Đăng nhập         
            </Link>
          </Button> */}

          {/* <Button variant="contained" style={{ marginLeft: "10px", minWidth: "50px" }}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/user-register"
            >
              Đăng ký
            </Link>
          </Button> */}

          <Button variant="outlined" style={{ minWidth: "50px" }} onClick={handleLogin}>

            Đăng nhập

          </Button>


          <Button variant="contained" style={{ marginLeft: "10px", minWidth: "50px" }} onClick={handleRegister}>

            Đăng ký

          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;
