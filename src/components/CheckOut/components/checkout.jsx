import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./style.scss";
import * as yup from "yup";
import InputField from "./../../Form-controls/InputField/index";
import { formatPrice } from "./../../../utils/common";
import { useNavigate } from "react-router-dom";
import checkoutApi from "./../../../api/checkoutApi";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../Cart/CartSlice";

function CheckOut() {
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name."),
    phone: yup.number().required("Please enter your phone."),
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address."),
    address: yup.string().required("Please enter your address."),
    city: yup.string().required("Please enter your city."),
    pincode: yup.number().required("Please enter your pincode."),
  });
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      total: 0,
    },
    resolver: yupResolver(schema),
  });

  const location = useLocation();
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [totalPriceUSD, setTotalPriceUSD] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get("data");
  const selectedItems = JSON.parse(decodeURIComponent(data));
  // console.log(selectedItems);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy sản phẩm từ Local Storage cart dựa trên các số trong selectedItems
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    // console.log(selectedProducts);
    setProducts(selectedProducts);
    setTotalItems(selectedProducts.length);

    const totalPrice = selectedProducts.reduce(
      (accumulator, item) => accumulator + item.product?.price * item.quantity,
      0
    );
    const totalPriceUsd = (totalPrice / 23000).toFixed();

    setTotalPrice(totalPrice); // Tính toán và cập nhật tổng giá tiền
    setTotalPriceUSD(totalPriceUsd);
    form.setValue("total", totalPrice);
  }, []);

  const handleSubmit = async (values) => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    const userObject = JSON.parse(storedUser);
    if (storedAccessToken && storedUser) {
      const data = {
        ...values,
        order_items: products,
        user_id: userObject.id,
      };
      // data.order_items.forEach((item) => {
      //   dispatch(removeFromCart(item.id));
      // });
      try {
        // const response = await checkoutApi.order(data);
        navigate(`/order?data=${encodeURIComponent(JSON.stringify(data))}`);
        // console.log(response);
      } catch (error) {
        const errorOrder = error.response.data.message;
        enqueueSnackbar(errorOrder, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Please log in. 💯 ", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <Container>
      <Paper elevation={3} className="container">
        <Grid className="paper-info" container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={6}>
            <form id="checkout-form" onSubmit={form.handleSubmit(handleSubmit)}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Thông tin đặt hàng</Typography>
                <InputField
                  className="checkout-input"
                  name="name"
                  label="Họ và tên"
                  form={form}
                />
                <InputField
                  className="checkout-input"
                  name="phone"
                  label="Số điện thoại"
                  form={form}
                />
                <InputField
                  className="checkout-input"
                  name="email"
                  label="Email"
                  form={form}
                />
                <InputField
                  className="checkout-input"
                  name="address"
                  label="Địa chỉ"
                  form={form}
                />
                <InputField
                  className="checkout-input"
                  name="city"
                  label="Thành Phố"
                  form={form}
                />
                <InputField
                  className="checkout-input"
                  name="pincode"
                  label="Pin Code"
                  form={form}
                />
              </Box>
            </form>
          </Grid>
          <Grid item xs={6}>
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
                {products.map((item, index) => (
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
            <Typography
              style={{ margin: "20px", fontWeight: "bold" }}
              variant="h6"
            >
              Tổng giá tiền: {formatPrice(totalPrice)}
            </Typography>
            <Button
              fullWidth
              style={{ margin: "10px 0" }}
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              form="checkout-form"
            >
              Đặt hàng
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default CheckOut;
