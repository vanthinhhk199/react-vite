import axiosClient from "./axiosClient";

const orderApi = {
  getOrder(userId) {
    const url = `/order/${userId}`;
    return axiosClient.get(url);
  },
  getAllOrder() {
    const url = `/admin/order`;
    return axiosClient.get(url);
  },
  upStatusOrder(data) {
    const url = `/admin/order-status`;
    return axiosClient.post(url, data);
  },
  deleteOrder(id){
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
  
};
export default orderApi;