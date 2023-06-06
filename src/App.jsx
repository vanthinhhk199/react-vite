import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ListPage from "./components/Product/pages/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./components/Product/pages/DetailPage";
import CartFeature from "./components/Cart/index";
import CheckOut from "./components/CheckOut/components/checkout";
import Footer from "./components/Footer/footer";
import Order from "./components/CheckOut/components/order";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={<ListPage searchKeyword={searchKeyword} />}
          />
          <Route path="/product/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<CartFeature />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
