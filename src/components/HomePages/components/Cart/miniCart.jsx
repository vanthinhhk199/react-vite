import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartItemsCountSelector } from "./selectors";
import { useSelector } from "react-redux";
import { Badge, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

MiniCart.propTypes = {};

function MiniCart(props) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const navigate = useNavigate();
  const [cartItemMini, setCartItemMini] = useState([]);

  useEffect(() => {
    setCartItemMini(cartItems);
  }, [cartItems]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  // Giới hạn số lượng hiển thị tối đa là 5 sản phẩm
  const displayedCartItems = cartItemMini.slice(0, 5);

  return (
    <>
      <IconButton
        style={{ marginRight: "10p" }}
        aria-label="cart"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={cartItemsCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {displayedCartItems.map((item) => (
          <MenuItem key={item.id} className="cartmini">
            <div className="miniCart-left">
              <img
                className="miniCart-img"
                src={`http://localhost:8000/assets/uploads/product/${item.product.image}`}
                alt={item.product.name}
              />
            </div>
            <div className="miniCart-right">
              <span className="miniCart-right--name">{item.product.name}</span>
              <div className="miniCart-right-info">
                <span className="miniCart-right--qty">{item.quantity}x</span>
                <span className="miniCart-right--price">
                  {item.product.price} đ
                </span>
              </div>
            </div>
          </MenuItem>
        ))}
        <MenuItem
          style={{ textAlign: "center", display: "block" }}
          onClick={handleCartClick}
        >
          View Cart
        </MenuItem>
      </Menu>
    </>
  );
}

export default MiniCart;
