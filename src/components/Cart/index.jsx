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
} from "@mui/material";
import { cartTotalSelector } from "./selectors";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { removeFromCart } from "./CartSlice";
import "./style.scss";
import { formatPrice } from "./../../utils/common";

CartFeature.propTypes = {};

function CartFeature(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCart = useSelector(cartTotalSelector);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      const newSelectedItems = cartItems.map((item) => item.id);
      setSelectedItems(newSelectedItems);
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
  };

  const handleDeleteItemCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container className="cart-form">
      <Grid item xs={12}>
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
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.product?.price}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteItemCart(item.id)}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography className="totalcart">
          Total: {formatPrice(totalCart)}
        </Typography>
      </Grid>
    </Container>
  );
}

export default CartFeature;
