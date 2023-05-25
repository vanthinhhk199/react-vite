import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import InputField from "../../../../Form-controls/InputField";
import PasswordField from "../../../../Form-controls/PasswordField";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: "relative",
//     paddingTop: theme.spacing(4),
//   },

//   avatar: {
//     margin: "0 auto",
//     backgroundColor: theme.palette.secondary.main,
//   },

//   title: {
//     margin: theme.spacing(2, 0, 3, 0),
//     textAlign: "center",
//   },

//   submit: {
//     margin: theme.spacing(3, 0, 2, 0),
//   },

//   progress: {
//     position: "absolute",
//     top: theme.spacing(1),
//     left: 0,
//     right: 0,
//   },
// }));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address."),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters long."),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="root">
      {isSubmitting && <LinearProgress className="progress" />}

      <Avatar className="avatar">
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography className="title" component="h3" variant="h5">
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
