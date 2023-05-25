import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import style from "./style.scss";
import AppleIcon from "@mui/icons-material/Apple";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Register from "./../Auth/components/register/index";
import Login from "./../Auth/components/login/index";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { logout } from "../Auth/userSlice";

Header.propTypes = {};

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

function Header(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="navbar">
          <AppleIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </AppleIcon>
          <Box>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}

            <IconButton aria-label="cart" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getcontentanchorel={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <IconButton className="closeButton" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
