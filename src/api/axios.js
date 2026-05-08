import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error("The server is taking too long to respond. It might be waking up.");
    }

    if (error.response?.status === 401) {
      console.warn("Session expired. Redirecting to login...");
    }

    return Promise.reject(error);
  }
);

export default api;