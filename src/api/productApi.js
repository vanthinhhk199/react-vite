import axiosClient from "./axiosClient";

const productApi = {
  getAll(page = 1) {
    const url = `/products?page=${page}`;
    return axiosClient.get(url);
  },
  filter(filterValues){
    const url = `/products/filter`;
    return axiosClient.post(url, filterValues)
  },
  getDetail(productSlug){
    const url = `/product/${productSlug}`;
    return axiosClient.get(url);
  },
  getNew(){
    const url = `/products/new`;
    return axiosClient.get(url);
  },
  search(keyword) {
    const url = '/product/search';
    const data = { keyword };
    return axiosClient.post(url, data);
  }
};
export default productApi;