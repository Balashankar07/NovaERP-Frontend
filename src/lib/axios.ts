import axios from "axios";
import { toast } from "@/utils/toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle global errors and toasts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Unable to connect to the server.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 400:
        toast.error("Invalid request.");
        break;
      case 401:
        toast.error("Your session has expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        window.location.href = "/login?expired=true";
        break;
      case 403:
        toast.error("You do not have permission to perform this action.");
        window.location.href = "/403";
        break;
      case 404:
        toast.error("Requested resource was not found.");
        break;
      case 409:
        toast.error("Conflict occurred. The resource might already exist.");
        break;
      case 422:
        toast.error("Validation failed. Please check your inputs.");
        break;
      case 500:
        toast.error("Something went wrong. Please try again later.");
        break;
      default:
        toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
