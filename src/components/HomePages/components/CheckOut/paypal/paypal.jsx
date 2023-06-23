import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { removeFromCart } from "../../Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import checkoutApi from "./../../../../../api/checkoutApi";
import { useEffect, useState } from "react";

function Paypal({ total }) {
  var dataAll = useSelector((state) => state.checkout.selectAdress);

  return (
    <div style={{ width: "400px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AQzbuTIkbmBUXsHJZHQfLNE-EGR8U4W3FdqCv4VG-zXtulGfWgw7erRbj-pKvc31-7xxN6Nnyfa559Dd",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total,
                  },
                  shipping: {
                    name: {
                      full_name: "Thinh",
                    },
                    address: {
                      address_line_1: "Hoa Vang",
                      admin_area_2: "Da Nang",
                      postal_code: "50000",
                      country_code: "VN",
                    },
                  },
                  payer: {
                    email_address: "vanthinh1999@gmail.com",
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

            const updatedDataAll = {
              ...dataAll,
              user_id: userId,
              status: status,
              idPayment: idPayment,
              paymentTime: formattedPaymentTime,
            };
            console.log(updatedDataAll);

            // const response = await checkoutApi.order(updatedDataAll);
            // dataAll.order_items.forEach((item) => {
            //   const productId = item.id;
            //   dispatch(removeFromCart(productId));
            // });
            // navigate("/");
            // enqueueSnackbar("Mua hàng thành công !!!", {
            //   variant: "success",
            //   autoHideDuration: 7000,
            // });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
