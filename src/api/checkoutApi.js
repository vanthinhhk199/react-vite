import axiosClient from "./axiosClient";

const checkoutApi = {
  order(data) {
    const url = `/placeorder1`;
    return axiosClient.post(url, data);
  },
  getAddress(userId) {
    const url = `/get-address/${userId}`;
    return axiosClient.get(url);
  },
  address(data) {
    const url = `/address`;
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/dele-addresses/${id}`;
    return axiosClient.delete(url);
  },
  updateAddress(data) {
    const url = `/checkout/update-address`;
    return axiosClient.put(url, data);
  },
};
export default checkoutApi;