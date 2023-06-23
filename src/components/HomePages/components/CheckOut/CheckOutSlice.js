import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addAddressInfo: {
    name: "",
    phone: "",
    user_id: "",
    address: "",

  },
  selectAdress: {
    name: "",
    phone: "",
    user_id: "",
    total: "",
    address: "",
    order_items: [],

  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addAddressInfo: (state, action) => {
      state.addAddressInfo = action.payload;
   
    },
    selectAdress: (state, action) => {
      state.selectAdress = action.payload;
   
    }
  },
});

export const { addAddressInfo, selectAdress } = checkoutSlice.actions;

export default checkoutSlice.reducer;