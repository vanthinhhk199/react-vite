import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatPrice } from "../../../../../utils/common";

CheckoutListProd.propTypes = { data: PropTypes.array.isRequired };

function CheckoutListProd({ data, totalPrice }) {
  const handleOrder = async () => {
    // try {
    //   const idPayment = Math.random().toString(36).substr(2, 10).toUpperCase();
    //   const updatedOrder = {
    //     ...addInfoOrder, // Spread the existing properties
    //     status: "Pending",
    //     idPayment: idPayment,
    //     paymentTime: new Date().toLocaleString(),
    //   };
    //   const newOrder = await checkoutApi.order(updatedOrder);
    //   products.forEach((item) => {
    //     const productId = item.id;
    //     dispatch(removeFromCart(productId));
    //   });
    //   navigate("/");
    //   enqueueSnackbar("Mua hàng thành công !!!", {
    //     variant: "success",
    //     autoHideDuration: 7000,
    //   });
    // } catch (error) {
    //   console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", error);
    // }
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="lable-table">Name</TableCell>
            <TableCell className="lable-table">Quantity</TableCell>
            <TableCell className="lable-table">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell></TableCell>
              <TableCell>
                <img
                  src={`http://localhost:8000/assets/uploads/product/${item.product?.image}`}
                  alt={item.product?.name}
                  style={{ maxWidth: 45 }}
                />
                {item.product?.name}
              </TableCell>
              <TableCell>{item.quantity}x</TableCell>
              <TableCell>{formatPrice(item.product?.price)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography style={{ margin: "20px", fontWeight: "bold" }} variant="h6">
        Tổng giá tiền: {formatPrice(totalPrice)}
      </Typography>
      <Button
        fullWidth
        style={{ margin: "10px 0" }}
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        form="checkout-form"
        onClick={handleOrder}
      >
        Đặt hàng
      </Button>
    </>
  );
}

export default CheckoutListProd;
