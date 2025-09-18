
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://lead-management-backend-q5vr.onrender.com",
  withCredentials: true, // VERY IMPORTANT for httpOnly cookies
});

export default api;
