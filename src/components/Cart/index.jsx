import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Container,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { cartTotalSelector } from "./selectors";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { removeFromCart, setQuantity } from "./CartSlice";
import { useSnackbar } from "notistack";
import "./style.scss";
import { formatPrice } from "./../../utils/common";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

CartFeature.propTypes = {};

function CartFeature(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCart = useSelector(cartTotalSelector);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isItemsSelected, setIsItemsSelected] = useState(false);

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
      setIsItemsSelected(false);
    } else {
      const newSelectedItems = cartItems.map((item) => item.id);
      setSelectedItems(newSelectedItems);
      setIsItemsSelected(newSelectedItems.length > 0);
    }
  };

  const handleSelectItem = (itemId) => {
    const selectedIndex = selectedItems.indexOf(itemId);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, itemId];
    } else {
      newSelectedItems = selectedItems.filter((id) => id !== itemId);
    }

    setSelectedItems(newSelectedItems);
    setIsItemsSelected(newSelectedItems.length > 0);
  };

  const calculateSelectedTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      if (selectedItems.includes(item.id)) {
        total += item.product.price * item.quantity;
      }
    }
    return total;
  };

  const handleDeleteItemCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmitCheckOut = () => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    if (storedAccessToken && storedUser) {
      navigate(
        `/checkout?data=${encodeURIComponent(JSON.stringify(selectedItems))}`
      );
    } else {
      enqueueSnackbar("Please log in. 💯 ", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(setQuantity({ id: itemId, quantity: newQuantity }));
  };

  return (
    <>
      <div className="my-cart">
        <LocalMallIcon className="my-cart_icon" />
        <Typography className="my-cart_title" component="h3" variant="h5">
          My Cart
        </Typography>
      </div>
      <Container>
        <Paper elevation={3} className="cart-form">
          <Grid container>
            <Grid item xs={8}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.length === cartItems.length}
                        indeterminate={
                          selectedItems.length > 0 &&
                          selectedItems.length < cartItems.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell className="lable-table">Image</TableCell>
                    <TableCell className="lable-table">Name</TableCell>
                    <TableCell className="lable-table">Quantity</TableCell>
                    <TableCell className="lable-table">Price</TableCell>
                    <TableCell className="lable-table">Action</TableCell>
                  </TableRow>
                </TableHead>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", display: "table-row" }}>
                    Không có sản phẩm trong giỏ hàng
                  </div>
                ) : (
                  <TableBody>
                    {cartItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            src={`http://localhost:8000/assets/uploads/product/${item.product?.image}`}
                            alt={item.product?.name}
                            style={{ maxWidth: 90, maxHeight: 70 }}
                          />
                        </TableCell>
                        <TableCell>{item.product?.name}</TableCell>
                        <TableCell className="quantity-cart">
                          <div className="form-cart-qty">
                            <IconButton
                              className="quantity-cart--selecBtn"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              size="small"
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                            <TextField
                              className="quantity-cart--TextField"
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  Math.max(1, e.target.value)
                                )
                              }
                              inputProps={{ min: 1 }}
                              disabled
                            />
                            <IconButton
                              className="quantity-cart--selecBtn"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              size="small"
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatPrice(item.product?.price)}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteItemCart(item.id)}
                            aria-label="delete"
                            size="small"
                          >
                            <DeleteOutlineIcon style={{ color: "red" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Grid>
            <Grid className="cart-right" item xs={4}>
              <Grid className="cart-info cart-right_code">
                <TextField
                  className="cart-right-inp"
                  id="promo-code"
                  label="Promo code"
                />
                <Button
                  type="submit"
                  className="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: "100px", height: "54px" }}
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
              <Typography className="cart-info" variant="span" display="block">
                Shipping cost
                <Typography className="cart-info_price" variant="span">
                  TBD
                </Typography>
              </Typography>
              <Typography className="cart-info" variant="span" display="block">
                Discount
                <Typography className="cart-info_price" variant="span">
                  0 đ
                </Typography>
              </Typography>
              <Typography className="cart-info" variant="span" display="block">
                Tax
                <Typography className="cart-info_price" variant="span">
                  TBD
                </Typography>
              </Typography>
              <Typography
                className="cart-info-total"
                variant="span"
                display="block"
              >
                Total
                <Typography className="cart-info_price" variant="span">
                  {formatPrice(calculateSelectedTotal())}
                </Typography>
              </Typography>
              <Button
                type="submit"
                className="cart-checkout"
                variant="contained"
                color="primary"
                style={{ width: "150px" }}
                size="large"
                disabled={!isItemsSelected}
                onClick={handleSubmitCheckOut}
              >
                CheckOut
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default CartFeature;
