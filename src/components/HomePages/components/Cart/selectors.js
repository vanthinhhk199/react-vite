import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;
//trong state --> cart trong store.js -> cartItems trong CartSlice

// Đếm số lượng sản phẩm trong giỏ hàng
export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + parseInt(item.quantity, 10), 0)
);

// Tính tổng giỏ hàng
export const cartTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
);
 
