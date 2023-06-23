import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddProductPage from "./components/AddProduct";
import categoryApi from "./../../../../api/categoryApi";

AddProduct.propTypes = {};

function AddProduct(props) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategory(response.category);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    })();
  }, []);

  return (
    <>
      <AddProductPage category={category} />
    </>
  );
}

export default AddProduct;
