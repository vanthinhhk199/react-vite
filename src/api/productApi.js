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

};
export default productApi;