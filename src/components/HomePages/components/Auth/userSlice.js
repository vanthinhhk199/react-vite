import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetCart } from '../Cart/CartSlice';
import userApi from './../../../../api/userApi';
import StorageKeys from './../../../../constants/storage-keys';

// Register
export const register = createAsyncThunk('/register', async (payload) => { //createAsyncThunk từ Redux Toolkit. Nó định nghĩa một hoạt động bất đồng bộ để đăng ký người dùng.
  const data = await userApi.register(payload);
  return data;
});


// Login
export const login = createAsyncThunk('/login', async (payload) => {
    const data = await userApi.login(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.access_token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    return data.user;
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {}, // Sử dụng đối tượng rỗng nếu không thể phân tích chuỗi JSON
    settings: {},
    userInfo: {},
  },
  reducers: {
    UserInfo(state, action) {
      state.userInfo = action.payload;
    },

    logout(state) {

      
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      
      // Xóa giỏ hàng khỏi localStorage
      // localStorage.removeItem(StorageKeys.CART);
      
      state.current = {};

      // dispatch(resetCart());
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, UserInfo } = actions;
export default reducer;
