import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserProvider } from "./provider/UserContext";
import Profile from "./components/dashboards/Profile";
import ManageUsers from "./components/dashboards/ManageUsers";
import ManageCategories from "./components/dashboards/ManageCategories";
import AddProduct from "./components/dashboards/AddProduct";
import VendorShop from "./components/dashboards/VendorShop";
import Orders from "./components/Orders";
import UserCart from "./components/dashboards/userDashboard/UserCart";
import UserReviews from "./components/dashboards/userDashboard/UserReviews";
import RecentlyViewed from "./components/dashboards/userDashboard/RecentlyViewed";
import ProductDetails from "./components/ProductDetails";
import AllProductsCategoryFiltered from "./pages/AllProductsCategoryFiltered";
import Checkout from "./pages/payment/Checkout";
import PaymentSuccessfull from "./pages/payment/PaymentSuccessfull";
import PaymentFailed from "./pages/payment/paymentFailed";
import PaymentCancelled from "./pages/payment/PaymentCancelled";
import ManageInventoryByVendor from "./components/dashboards/ManageInventoryByVendor";
import MonitorTransactions from "./components/dashboards/MonitorTransactions";
import AllShops from "./pages/AllShops";
import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allShops" element={<AllShops />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/products/:categoryId"
            element={<AllProductsCategoryFiltered />}
          />

          <Route path="/product/:productId" element={<ProductDetails />} />
          {/* Dashboard route with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-categories" element={<ManageCategories />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route
              path="manage-inventory"
              element={<ManageInventoryByVendor />}
            />
            <Route path="my-shop" element={<VendorShop />} />
            <Route path="orders" element={<Orders />} />
            <Route
              path="monitor-transactions"
              element={<MonitorTransactions />}
            />
            <Route path="cart" element={<UserCart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="recent-products" element={<RecentlyViewed />} />
            <Route
              path="payment/success/:tranId"
              element={<PaymentSuccessfull />}
            />
            <Route path="payment/fail/:tranId" element={<PaymentFailed />} />
            <Route
              path="payment/cancel/:tranId"
              element={<PaymentCancelled />}
            />
          </Route>
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
