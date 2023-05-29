import axiosClient from "./axiosClient";

const productApi = {
  getAll(newPage = 1) {
    const url = `/products?page=${newPage}`;
    return axiosClient.get(url);
  },
  getProd(){
    const url = `/products`;
    return axiosClient.get(url);
  },
  filter(filterValues){
    const url = `/productfilter`;
    return axiosClient.post(url, filterValues)
  },
  getDetail(productId){
    const url = `/product/${productId}`;
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