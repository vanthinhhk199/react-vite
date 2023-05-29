import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = `/categorys`;
    return axiosClient.get(url);
  },
};
export default categoryApi;