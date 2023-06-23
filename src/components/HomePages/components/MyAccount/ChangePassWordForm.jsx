import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Paper } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import "./style.scss";
import userApi from "../../../../api/userApi";
import LinearProgress from "@mui/material/LinearProgress";
import { useSnackbar } from "notistack";

ChangePasswordForm.propTypes = {};

function ChangePasswordForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSenMail = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;

    try {
      const senMail = await userApi.changePass(email);
      setIsLoading(false);
      enqueueSnackbar(senMail.messages, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-senmail">
      <Paper className="form-senmail_paper">
        {isLoading && (
          <LinearProgress
            style={{ width: "100%", position: "absolute", top: "0" }}
          />
        )}
        <VerifiedUserIcon style={{ color: "#f84a2e", fontSize: "50px" }} />
        <p>
          Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin
          bằng một trong những cách sau.
        </p>
        <Button onClick={handleSenMail} disabled={isLoading}>
          <EmailIcon style={{ paddingRight: "5px" }} />
          Xác minh bằng liên kết Email
        </Button>
      </Paper>
    </div>
  );
}

export default ChangePasswordForm;
