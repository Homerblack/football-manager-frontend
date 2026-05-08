import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // important for Spring Security
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
// 3. Add an Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend is "sleeping" (Render Free Tier), handle it here
    if (error.code === 'ECONNABORTED') {
      console.error("The server is taking too long to respond. It might be waking up.");
    }
    
    // Centralized log for 401 (Unauthorized) - redirects to login
    if (error.response?.status === 401) {
      console.warn("Session expired. Redirecting to login...");
      // window.location.href = "/login"; 
    }

    return Promise.reject(error);
  }
);

export default api;