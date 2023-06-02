import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ListPage from "./components/Product/pages/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./components/Product/pages/DetailPage";
import CartFeature from "./components/Cart/index";
import CheckOut from "./components/CheckOut/components/checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/product/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<CartFeature />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
