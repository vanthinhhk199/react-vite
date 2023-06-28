import { useEffect, useState } from "react";
import productApi from './../../../api/productApi';

export function useProductAll() {
  const [product, setProduct] = useState([]);

  const reloadProducts = async () => {
    try {
      const response = await productApi.getAllProd();
      setProduct(response.product.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  return { product, reloadProducts };
}

