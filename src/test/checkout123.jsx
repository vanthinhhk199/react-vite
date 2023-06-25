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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addAddressInfo,
  selectAdress,
} from "../components/HomePages/components/CheckOut/CheckOutSlice";
import "./style.scss";
import checkoutApi from "../api/checkoutApi";
import { formatPrice } from "../utils/common";
import { removeFromCart } from "../components/HomePages/components/Cart/CartSlice";
import Paypal from "../components/HomePages/components/CheckOut/paypal/paypal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { enqueueSnackbar } from "notistack";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CheckOut() {
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [totalPriceUSD, setTotalPriceUSD] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get("data");
  const selectedItems = JSON.parse(decodeURIComponent(data));
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [showAddress, setShowAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [addressData, setAddressData] = useState([]);
  const [addressObject, setAddressObject] = useState();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addInfoOrder, setAddInfoOrder] = useState({});

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    setProducts(selectedProducts);

    const totalPrice = selectedProducts.reduce(
      (accumulator, item) => accumulator + item.product?.price * item.quantity,
      0
    );
    const totalPriceUsd = (totalPrice / 23000).toFixed();

    setTotalPrice(totalPrice);
    setTotalPriceUSD(totalPriceUsd);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        const Data = await checkoutApi.getAddress(userId);
        setAddressData(Data);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
    })();
  }, [addressObject]);

  useEffect(() => {
    if (addressData.length > 0) {
      setSelectedAddressId(addressData[0].id);
    }
  }, [addressData]);

  const handleAddAddress = () => {
    setShowAddress(true);
  };

  const handleToggleAddress = () => {
    setShowAddress(!showAddress);
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleSubmitAddress = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user.id;

    const addressObject = {
      user_id: user_id,
      name: addressInfo.name,
      phone: addressInfo.phone,
      address: addressInfo.address,
    };

    dispatch(addAddressInfo(addressObject));

    checkoutApi
      .address(addressObject)
      .then((response) => {
        setAddressObject(addressObject);
        setShowAddress(!showAddress);
        setAddressInfo("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    checkoutApi
      .delete(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  useEffect(() => {
    if (addressData.length > 0) {
      const selectedAddress = addressData.find(
        (item) => item.id === selectedAddressId
      );
      if (selectedAddress) {
        const updatedAddress = {
          ...selectedAddress,
          total: totalPrice,
          order_items: products,
        };

        setAddInfoOrder(updatedAddress);
        dispatch(selectAdress(updatedAddress));
      }
    }
  }, [addressData, selectedAddressId, totalPrice, products]);

  const handleOrder = async () => {
    try {
      const idPayment = Math.random().toString(36).substr(2, 10).toUpperCase();

      const updatedOrder = {
        ...addInfoOrder, // Spread the existing properties
        status: "Pending",
        idPayment: idPayment,
        paymentTime: new Date().toLocaleString(),
      };

      const newOrder = await checkoutApi.order(updatedOrder);

      products.forEach((item) => {
        const productId = item.id;
        dispatch(removeFromCart(productId));
      });
      navigate("/");
      enqueueSnackbar("Mua hàng thành công !!!", {
        variant: "success",
        autoHideDuration: 7000,
      });
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} className="container">
        <Grid className="paper-info" container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={8}>
            <Grid
              style={{
                display: "flex",
                padding: "10px",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <LocationOnIcon
                style={{
                  color: "red",
                }}
              />
              <span
                style={{
                  fontSize: "20px",
                  marginLeft: "10px",
                }}
              >
                Địa Chỉ Nhận Hàng
              </span>
            </Grid>
            {addressData.length > 0 ? (
              addressData.map((item) => (
                <Paper
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    padding: "10px",
                    alignItems: "center",
                    backgroundColor:
                      item.id === selectedAddressId ? "lightblue" : "white",
                  }}
                  key={item.id}
                  onClick={() => handleSelectAddress(item.id)}
                >
                  <div>
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.name},
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: "10px",
                      }}
                    >
                      {item.phone},
                    </span>
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {item.address}
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      X
                    </Button>
                  </div>
                </Paper>
              ))
            ) : (
              <Typography variant="body1">Bạn cần thêm địa chỉ</Typography>
            )}
            <Button
              onClick={handleAddAddress}
              variant="contained"
              color="primary"
            >
              Thêm
            </Button>

            {showAddress && (
              <Paper className="add-address">
                <Box>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    name="name"
                    value={addressInfo.name}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, name: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Phone"
                    variant="standard"
                    name="phone"
                    value={addressInfo.phone}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, phone: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Address"
                    variant="standard"
                    name="address"
                    value={addressInfo.address}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        address: e.target.value,
                      })
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitAddress}
                  >
                    Gui
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleToggleAddress}
                  >
                    Huỷ
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
          <Grid item xs={4}>
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
              onClick={handleOrder}
            >
              Đặt hàng
            </Button>
            <Paypal data={addInfoOrder} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default CheckOut;
