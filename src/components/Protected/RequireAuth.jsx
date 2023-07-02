import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role) {
    } else {
      navigate("/");
      enqueueSnackbar("Bạn Không có quyền truy cập trang này", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  }, []);

  return <Outlet />;
};

export default RequireAuth;
