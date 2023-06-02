import axiosClient from "./axiosClient";

const productApi = {
  getAll(page , priceMin = '', priceMax = '', cate = '', search = '') {
    const url = `/products?page=${page}&cate=${cate}&min=${priceMin}&max=${priceMax}&search=${search}`;
    return axiosClient.get(url);
  },
  getAlll() {
    const url = `/productfilter`;
    return axiosClient.get(url);
  },
  getProd(){
    const url = `/products`;
    return axiosClient.get(url);
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