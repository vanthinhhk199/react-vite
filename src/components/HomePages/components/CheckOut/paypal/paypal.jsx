import React, { useEffect, useState, useRef } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import checkoutApi from "./../../../../../api/checkoutApi";
import { enqueueSnackbar } from "notistack";
import { removeFromCart } from "../../Cart/CartSlice";
import { useNavigate } from "react-router-dom";

function Paypal({ totalPriceUSD, data }) {
  const selectAdress = useSelector((state) => state.checkout.selectAdress);
  const dataOrderRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dataOrderRef.current = {
      address: selectAdress?.address,
      created_at: selectAdress?.created_at,
      name: selectAdress?.name,
      phone: selectAdress?.phone,
      updated_at: selectAdress?.updated_at,
      user_id: selectAdress?.user_id,
      total: totalPriceUSD,
      order_items: data,
    };
  }, [selectAdress, totalPriceUSD, data]);

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPriceUSD,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();

            const idPayment = details.id;
            const status = details.status;
            const paymentTime = details.create_time;
            const dateTimeString = paymentTime
              .replace("T", " ")
              .replace("Z", "");
            const formattedPaymentTime = new Date(dateTimeString)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");

            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user.id;

            const dataAll = dataOrderRef.current;

            const updatedDataAll = {
              ...dataAll,
              user_id: userId,
              status: status,
              paymentmode: "Paid by Paypal",
              idPayment: idPayment,
              paymentTime: formattedPaymentTime,
            };
            const response = await checkoutApi.order(updatedDataAll);
            dataAll.order_items.forEach((item) => {
              const productId = item.id;
              dispatch(removeFromCart(productId));
            });
            navigate("/");
            enqueueSnackbar("Mua hàng thành công !!!", {
              variant: "success",
              autoHideDuration: 7000,
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
