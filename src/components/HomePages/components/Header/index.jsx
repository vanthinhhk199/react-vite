import { AccountCircle } from "@mui/icons-material";
import AppleIcon from "@mui/icons-material/Apple";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Container,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../Auth/userSlice";
import Login from "./../Auth/components/login/index";
import Register from "./../Auth/components/register/index";
import "./style.scss";
import MiniCart from "./../Cart/miniCart";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import userApi from "../../../../api/userApi";
import { resetCart } from "../Cart/CartSlice";

Header.propTypes = {};

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

function Header({ onSearch, test }) {
  const logoutCart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const handleLogoutClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const updatedLogoutCart = {
      cart_items: logoutCart,
      userId: userId,
    };

    const response = await userApi.logoutCart(updatedLogoutCart);
    const action = logout();
    setAnchorEl(null);
    dispatch(action);
    const resetCartAction = resetCart();
    dispatch(resetCartAction);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearch = () => {
    onSearch(searchKeyword);
    navigate("/");
  };
  const handleAccount = () => {
    navigate("/myaccount");
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "rgb(243 239 255)" }}>
        <Container>
          <Toolbar className="navbar">
            <AppleIcon
              className="iconHome"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleHomeClick}
            >
              <MenuIcon />
            </AppleIcon>
            <Box className="search">
              <TextField
                className="search-input"
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="Search"
                variant="filled"
                size="small"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <Button className="search-btn" onClick={handleSearch}>
                <SearchIcon />
              </Button>
            </Box>
            <Box className="header-right--icon">
              <a
                href="tel:0905869960"
                style={{
                  color: "black",
                  display: "flex",
                  textDecoration: "none",
                }}
              >
                Hotline
                <LocalPhoneIcon
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                />
              </a>
              <MiniCart />
              {!isLoggedIn && (
                <Button
                  className="login"
                  color="inherit"
                  onClick={handleClickOpen}
                >
                  Login
                </Button>
              )}

              {isLoggedIn && (
                <IconButton
                  className="iconUser"
                  color="inherit"
                  onClick={handleUserClick}
                >
                  <AccountCircle />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
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
        <MenuItem onClick={handleAccount}>My account</MenuItem>
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
