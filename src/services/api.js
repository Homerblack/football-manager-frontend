import axios from "axios";

const api = axios.create({

  baseURL:
    `${import.meta.env.VITE_API_URL}/api`,

  withCredentials: true,

  headers: {
    "Content-Type":
      "application/json",
  },

  timeout: 10000,
});

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.code === "ECONNABORTED"
    ) {

      console.error(
        "Server timeout."
      );
    }

    return Promise.reject(error);
  }
);

export default api;