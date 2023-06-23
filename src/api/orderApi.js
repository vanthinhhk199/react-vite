import axiosClient from "./axiosClient";

const orderApi = {
  getOrder(userId) {
    const url = `/order/${userId}`;
    return axiosClient.get(url);
  },
  
};
export default orderApi;