import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components";
import HomePages from "./components/HomePages/index";
import AdminPage from "./components/Admin/index";
import CartFeature from "./components/HomePages/components/Cart/index";
import DetailPage from "./components/HomePages/components/Product/pages/DetailPage";
import CheckOut from "./components/HomePages/components/CheckOut/components/checkout";
import Order from "./components/HomePages/components/CheckOut/components/order";
import MyOrder from "./components/HomePages/components/MyAccount/MyOrder";
import MyAccount from "./components/HomePages/components/MyAccount/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />}>
            <Route path="/product/:productId" />
            <Route path="/cart" />
            <Route path="/checkout" />
            <Route path="/order" />
            <Route path="/myorder" />
            <Route path="/myaccount" />
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="/admin/add-product" />
            <Route path="/admin/add-category" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
