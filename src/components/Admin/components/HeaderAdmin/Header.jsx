import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { logout } from "../../../HomePages/components/Auth/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    navigate("/");
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ width: "100%", position: "fixed", zIndex: "1" }}
    >
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AdminPanelSettingsIcon />
            <Typography variant="h6" component="div" ml="10px">
              Admin
            </Typography>
          </div>
          <Button onClick={handleLogoutClick} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
