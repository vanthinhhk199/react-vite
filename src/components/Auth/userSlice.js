import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';

// Register
export const register = createAsyncThunk('/register', async (payload) => { //createAsyncThunk từ Redux Toolkit. Nó định nghĩa một hoạt động bất đồng bộ để đăng ký người dùng.
  const data = await userApi.register(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
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
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
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
export const { logout } = actions;
export default reducer;