import logo from "./logo.svg";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
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
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Home from "./components/Home";
import ShowCart from "./components/carts/ShowCart";
import Statistical from "./components/statisticals/Statictical";
import Orders from "./components/auth/Orders";
import CartCounterReducer from "./reducers/CartCounterReducer";
import AuthReducer from "./reducers/AuthReducer";

export const CartCounterContext = createContext();
export const AuthContext = createContext();

function App() {
  
  const initCounter = () => {
    const cartArray = JSON.parse(sessionStorage.getItem("cartArray")) || [];
    let countItem = 0;
    cartArray.forEach(item => {
      countItem += parseInt(item.value.quantity);
    });

    return countItem;
  }

  const initUser = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    return user;
  }

  const [cartCounter, cartDispatch] = useReducer(CartCounterReducer, 0, initCounter);
  const [Auth, AuthDispatch] = useReducer(AuthReducer, null, initUser);




  return (
    <AuthContext.Provider value={[Auth, AuthDispatch]}>
      <CartCounterContext.Provider value={[cartCounter, cartDispatch]}>
        <BrowserRouter>
          <Header />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:cateID" element={<EditCategory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:prodID" element={<EditProduct />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/show-cart" element={<ShowCart />} />
              <Route
                path="/user-login"
                element={<UserLogin />}
              />
              <Route path="/statistical" element={<Statistical />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </CartCounterContext.Provider>
    </AuthContext.Provider>

  );
}

export default App;
