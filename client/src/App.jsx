import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import DashBoard from "./Components/User/DashBoard";
import Pagenotfound from "./Components/Pages/PageNotFound";
import PrivateRoute from "./Components/Routes/Private";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashBoard from "./Components/Admin/AdminDashBoard";
import AdminProduct from './Components/Admin/AdminProduct'
import AdminUpdateProduct from "./Components/Admin/AdminUpdateProduct";
import Search from "./Components/Pages/Search";
import UserSingleProduct from "./Components/User/UserSingleProduct";
import CartPage from "./Components/Pages/CartPage";
import UserProfile from "./Components/User/UserProfile";
import Order from "./Components/User/Order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<DashBoard />} />
        <Route path="user/profile" element={<UserProfile />} />
        <Route path="user/:id" element={<UserSingleProduct />} />
        <Route path="user/orders" element={<Order />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashBoard />} />
        <Route path="admin/product" element={<AdminProduct />} />
        <Route path="admin/product/:id" element={<AdminUpdateProduct />} />
      </Route>
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;
