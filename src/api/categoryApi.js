
import { axiosClient } from './axiosClient';
const categoryApi = {
  getAll() {
    const url = `/categorys`;
    return axiosClient().get(url);
  },
  addCate(formData){
    const url = `/category`;
    return axiosClient().post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateCate(updatedCategory, id){
    const url = `/category/${id}`;
    return axiosClient().post(url, updatedCategory, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteCate(id){
    const url = `/category/${id}`;
    return axiosClient().delete(url);
  },
};
export default categoryApi;