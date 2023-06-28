import { useEffect, useState } from "react";
import orderApi from './../../../api/orderApi';

export function useOrderAll() {
  const [order, setOrder] = useState([]);

  const reloadOrder = async () => {
    try {
        const response = await orderApi.getAllOrder();
        setOrder(response.order);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    reloadOrder();
  }, []);

  return { order, reloadOrder };
}
