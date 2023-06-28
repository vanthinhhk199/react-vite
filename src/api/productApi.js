import axiosClient from "./axiosClient";

const productApi = {
  getAll(page , priceMin = '', priceMax = '', cate = '', search = '') {
    const url = `/products?page=${page}&cate=${cate}&min=${priceMin}&max=${priceMax}&search=${search}`;
    return axiosClient.get(url);
  },
  getAllProd() {
    const url = `/admin/products`;
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
  addProd(formData){
    const url = `/product`;
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateProd(updatedProduct, id){
    const url = `/product/${id}`;
    return axiosClient.post(url, updatedProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteProd(id){
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },

};
export default productApi;