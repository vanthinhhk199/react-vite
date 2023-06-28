import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "./../../../../Form-controls/InputField/index";
import PasswordField from "./../../../../Form-controls/PasswordField/index";
import "./style.scss";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const [formattedDate, setFormattedDate] = useState("");
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
      .email("Please enter a valid email address.")
      .min(6, "Please enter at least 6 characters."),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters."),
    password_confirmation: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Password does not match"),
    gender: yup.string().required("Please select your gender."),
    phone: yup
      .string()
      .required("Please enter your phone number.")
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number."),
    birthday: yup.date().required("Please enter your date of birth."),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      phone: "",
      birthday: "",
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    values.birthday = formattedDate;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    const formatted = date
      .replace(/\D/g, "") // Xóa tất cả các ký tự không phải số
      .replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3"); // Thêm dấu '/' vào đúng vị trí

    setFormattedDate(formatted);
    form.setValue("birthday", formatted);
  };
  console.log(formattedDate);

  return (
    <>
      {isSubmitting && (
        <LinearProgress
          className="progress"
          fullWidth
          style={{ position: "absolute", top: "0", left: "0" }}
        />
      )}
      <div className="root" style={{ position: "relative" }}>
        <Box className="icon-regis">
          <Avatar className="avatar">
            <LockOutlined />
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
          <InputField name="phone" label="Phone" form={form} />

          <TextField
            fullWidth
            name="birthday"
            label="Date of Birth (dd/mm/yyyy)"
            type="text"
            value={formattedDate}
            onChange={handleDateChange}
            error={!!form.formState.errors.birthday}
            helperText={
              form.formState.errors.birthday &&
              form.formState.errors.birthday.message
            }
            form={form}
          />

          <FormControl
            component="fieldset"
            error={!!form.formState.errors.gender}
          >
            <RadioGroup
              row
              name="gender"
              value={form.watch("gender")}
              onChange={(e) => form.setValue("gender", e.target.value)}
            >
              <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
              <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
            </RadioGroup>
            {form.formState.errors.gender && (
              <Typography variant="caption" color="error">
                {form.formState.errors.gender.message}
              </Typography>
            )}
          </FormControl>

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
    </>
  );
}

export default RegisterForm;
