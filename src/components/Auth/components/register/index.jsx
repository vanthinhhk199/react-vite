import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import RegisterForm from "./registerForm/index";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";

Register.propTypes = {};

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch(); // Sử dụng useDispatch từ react-redux để lấy dispatch function
  const { enqueueSnackbar } = useSnackbar(); // Sử dụng useSnackbar từ react-toastify để hiển thị thông báo

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      // Tạo action register và gửi dispatch để gọi API đăng ký
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar("Register successfully!!! 💯 ", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
