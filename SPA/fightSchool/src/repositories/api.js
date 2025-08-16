import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage.
    // Make sure to save the token in localStorage upon login.
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
