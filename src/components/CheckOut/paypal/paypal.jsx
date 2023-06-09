import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { removeFromCart } from "../../Cart/CartSlice";
import checkoutApi from "./../../../api/checkoutApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
function Paypal({
  totalPrice,
  name,
  email,
  pincode,
  address,
  city,
  prod,
  dataAll,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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
                    value: totalPrice,
                  },
                  shipping: {
                    name: {
                      full_name: name,
                    },
                    address: {
                      address_line_1: address,
                      admin_area_2: city,
                      postal_code: pincode,
                      country_code: "VN",
                    },
                  },
                  payer: {
                    email_address: email,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
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
              // console.log(formattedPaymentTime);
              const updatedDataAll = {
                ...dataAll,
                status: status,
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
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
