import axios from 'axios';
import StorageKeys from './../constants/storage-keys';

export const axiosClient = () => {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  if (token) {
    return axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
  }
  return axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

