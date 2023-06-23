import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  items: [],
};

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
        state.items.splice(action.payload, 1);
    },
    editItem: (state, action) => {
        const { index, updatedItem } = action.payload;
        state.items[index] = updatedItem;
    },
  },
});

export const { setName, setPhone, addItem, deleteItem, editItem } = todolistSlice.actions;
export default todolistSlice.reducer;
