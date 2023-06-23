import React from "react";
import PropTypes from "prop-types";

index.propTypes = {};

function index(props) {
  return (
    <Routes>
      <Route path="/" element={<ListPage searchKeyword={searchKeyword} />} />
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
}

export default index;
