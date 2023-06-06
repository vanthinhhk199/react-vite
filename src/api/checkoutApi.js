import axiosClient from "./axiosClient";

const checkoutApi = {
  order(data) {
    const url = `/placeorder1`;
    return axiosClient.post(url, data);
  },
  
};
export default checkoutApi;