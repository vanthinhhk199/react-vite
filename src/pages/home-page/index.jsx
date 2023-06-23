import React from "react";
import PropTypes from "prop-types";

index.propTypes = {};

function index(props) {
  return (
    <Routes>
      <Route path="/product/:productId" element={<DetailPage />} />
      <Route path="/cart" element={<CartFeature />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/order" element={<Order />} />
      <Route path="/myorder" element={<MyOrder />} />
      <Route path="/todolist" element={<Todolist />} />

      {/* Router riêng cho trang admin */}
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
}

export default index;
