import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./loginForm";
import userApi from "../../../../../../api/userApi";
import { addToCart, setQuantity } from "../../../Cart/CartSlice";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const dataCart = await userApi.loginCart(userId);
      const allData = dataCart.data.cartItems;

      for (const item of allData) {
        const existingItem = cartItems.find(
          (x) => parseInt(x.id) === parseInt(item.id)
        );
        if (existingItem) {
          const quantity = item.quantity + existingItem.quantity;
          dispatch(setQuantity({ id: item.id, quantity: quantity }));
        } else {
          dispatch(addToCart(item));
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      handleCart();
      enqueueSnackbar("Login successfully!!! 💯 ", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
