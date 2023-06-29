import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./loginForm";
import userApi from "../../../../../../api/userApi";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [userId, setUserId] = useState();

  const handleCart = async () => {
    try {
      console.log(userId);
      const dataCart = await userApi.loginCart(userId);
      console.log(dataCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      handleCart();
    }
  }, [userId]);

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      setUserId(resultAction.payload.id);

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
