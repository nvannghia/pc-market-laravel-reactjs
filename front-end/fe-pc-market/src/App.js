import logo from "./logo.svg";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Computer from "./components/Computer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./components/categories/Categories";
import AddCategory from "./components/categories/AddCategory";
import { Container } from "react-bootstrap";
import EditCategory from "./components/categories/EditCategory";
import Products from "./components/products/products";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import UserRegister from "./components/auth/UserRegister";
import UserLogin from "./components/auth/UserLogin";
import { createContext, useEffect, useReducer, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hàm để cập nhật trạng thái đăng nhập
  const handleLogin = (boolean) => {
    setIsLoggedIn(boolean);
  };
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} />
      <Container>
        <Routes>
          <Route path="/" element={<Computer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category/:cateID" element={<EditCategory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:prodID" element={<EditProduct />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route
            path="/user-login"
            element={<UserLogin onLogin={handleLogin} />}
          />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
