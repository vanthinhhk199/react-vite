import { useEffect, useState } from "react";
import productApi from './../../../../../api/productApi';

export function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.getDetail(productId);
        setProduct(result.data.product)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
