import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header/index";
import Footer from "./components/Footer/footer";
import ListPage from "./components/Product/pages/ListPage";
import DetailPage from "./components/Product/pages/DetailPage";
import CartFeature from "./components/Cart/index";
import CheckOut from "./components/CheckOut/components/checkout";
import Order from "./components/CheckOut/components/order";
import MyOrder from "./components/MyAccount/MyOrder";
import { Route, Routes } from "react-router-dom";
import MyAccount from "./components/MyAccount/index";

HomePages.propTypes = {};

function HomePages(props) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };
  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<ListPage searchKeyword={searchKeyword} />} />
        <Route path="/product/:productId" element={<DetailPage />} />
        <Route path="/cart" element={<CartFeature />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order" element={<Order />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default HomePages;
