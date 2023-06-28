import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',  // Địa chỉ cơ sở cho các yêu cầu API
  headers: {
    'Content-Type': 'application/json',  // Đặt header Content-Type là JSON
  },
});

// Interceptors
// Thêm interceptor cho yêu cầu
axiosClient.interceptors.request.use(
    function (config) {
    // Thực hiện một số thao tác trước khi gửi yêu cầu
      return config;
    },
    function (error) {
    // Xử lý lỗi khi gửi yêu cầu
      return Promise.reject(error);
    }
  );

// Thêm interceptor cho phản hồi
  axiosClient.interceptors.response.use(
    function (response) {
    // Hàm này được gọi khi phản hồi có mã trạng thái từ 200 đến 299
    // Xử lý dữ liệu phản hồi
      return response.data; 
    },
    function (error) {

      // Hàm này được gọi khi phản hồi có mã trạng thái không nằm trong khoảng từ 200 đến 299
      // Xử lý lỗi phản hồi
      const { config, status, data } = error.response;
      if (config.url==='/login' && status === 401) {
        const errorList = data || [];

        throw new Error(errorList.masages);
      }

      return Promise.reject(error);
    }
  );

export default axiosClient;

// import axios from "axios";
// import { ACCESS_TOKEN } from "src/constants/constants";

// export const httpClient = () => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//         return axios.create({
//             baseURL: process.env.REACT_APP_SERVICE_API_URL,
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//     }
//     return axios.create({
//         baseURL: process.env.REACT_APP_SERVICE_API_URL
//     });
// }