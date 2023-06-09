import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "./../../../../Form-controls/InputField/index";
import PasswordField from "./../../../../Form-controls/PasswordField/index";
import "./style.scss";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your full name.")
      .test(
        "should has at least two words",
        "Please enter at least two words.",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),

    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address."),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters."),
    password_confirmation: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Password does not match"),
  });
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="root">
      {isSubmitting && <LinearProgress className="progress" />}
      <Box className="icon-regis">
        <Avatar className="avatar">
          <LockOutlined></LockOutlined>
        </Avatar>

        <Typography className="title" component="h3" variant="h5">
          Create An Account
        </Typography>
      </Box>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="name" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="password_confirmation"
          label="Retype Password"
          form={form}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
