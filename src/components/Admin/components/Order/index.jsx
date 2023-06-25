import React, { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import orderApi from "./../../../../api/orderApi";

Order.propTypes = {};

function Order(props) {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await orderApi.getAllOrder();
        setOrder(response.order);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);
  console.log(order);

  return (
    <>
      <OrderForm data={order} />
    </>
  );
}

export default Order;
