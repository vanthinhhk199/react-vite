import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/HomePages/components/Auth/userSlice';
import cartReducer from '../components/HomePages/components/Cart/CartSlice';
import checkoutReducer from '../components/HomePages/components/CheckOut/CheckOutSlice';


const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
