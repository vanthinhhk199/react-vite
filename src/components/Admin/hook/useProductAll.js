import { useEffect, useState } from "react";
import productApi from './../../../api/productApi';

export function useProductAll() {
    
    const [product, setProduct] = useState([]);

    useEffect(() => {
      (async () => {
        try {
          const response = await productApi.getAllProd();
          setProduct(response.product.data);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      })();
    }, []);

    return { product };
}
