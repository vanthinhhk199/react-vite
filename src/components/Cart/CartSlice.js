
import { createSlice } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart', //Tên của slice, ở đây là 'cart'
  initialState: {//Trạng thái ban đầu của slice, bao gồm 
    showMiniCart: false,//để kiểm soát hiển thị giỏ hàng nhỏ
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],//mảng chứa các mục trong giỏ hàng
  },
  
  reducers: {//Các reducer (hàm xử lý) cho các hành động của slice.
    showMiniCart(state) {//Xử lý hành động để hiển thị giỏ hàng nhỏ 
      state.showMiniCart = true;
    },

    hideMiniCart(state) {
        state.showMiniCart = false;
    },

    addToCart(state, action){
        // newItem = { id, product, quantity }
        const newItem = action.payload;
        const index = state.cartItems.findIndex((x)=> x.id === newItem.id);

        if (index >= 0) {
            state.cartItems[index].quantity += newItem.quantity;
        }else{
            //add to cart
            state.cartItems.push(newItem);
        }
        saveCartToLocalStorage(state.cartItems); // Cập nhật giỏ hàng trong localStorage
    },
    setQuantity(state, action){
        const { id, quantity} = action.payload;
        //kiểm tra xem sản phẩm có sẵn trong giỏ hàng không
        const index = state.cartItems.findIndex((x)=> x.id === id)
        if (index >= 0) {
            state.cartItems[index].quantity = quantity;
        }
        saveCartToLocalStorage(state.cartItems); // Cập nhật giỏ hàng trong localStorage
    },
    removeFromCart(state, action){
        const isNeedToRemove = action.payload
        state.cartItems = state.cartItems.filter((x) => x.id !== isNeedToRemove)
        saveCartToLocalStorage(state.cartItems); // Cập nhật giỏ hàng trong localStorage
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions; // named export
export default reducer; // default export
