
import { axiosClient } from './axiosClient';
const userApi = {
  register(data) {
    const url = '/register';
    return axiosClient().post(url, data);
  },

  login(data) {
    const url = '/login';
    return axiosClient().post(url, data);
  },
  changePass(email){
    const url = `/forget-password/${email}`;
    return axiosClient().get(url);
  },
  userinfo(user_id){
    const url = `/userinfo/${user_id}`;
    return axiosClient().get(url);
  },
  updateUserInfo(user_id, data) {
    const url = `/user/${user_id}`;
    return axiosClient().put(url, data);
  },

  uploadAvatar(user_id, formData) {
    const url = `/user/${user_id}/avatar`;
    return axiosClient().post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getUser(){
    const url = `/user`;
    return axiosClient().get(url);
  },
  deleteUser(id){
    const url = `/delete-user/${id}`;
    return axiosClient().delete(url);
  },
  updateRole(data, id){
    const url = `/users/role/${id}`;
    return axiosClient().put(url, data);
  },
  logoutCart(data){
    const url = `/logout`;
    return axiosClient().post(url, data);
  },
  loginCart(user_id){
    const url = `/carts/products/${user_id}`;
    return axiosClient().get(url);
  },
  
  
 
};


export default userApi;