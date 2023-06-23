import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = `/categorys`;
    return axiosClient.get(url);
  },
  addCate(formData){
    const url = `/category`;
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
export default categoryApi;