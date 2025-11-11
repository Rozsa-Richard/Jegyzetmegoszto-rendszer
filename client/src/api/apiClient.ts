import axios from "axios";

export const BACKEND_URL = "http://localhost:3020";

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type" : "application/json",
        'Accept': 'application/json'
    }
});

apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem('accessToken'); 
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error); 
  }
);

export default apiClient;