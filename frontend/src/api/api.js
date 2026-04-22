import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api/v3",
  withCredentials: true,
});

// Attach token if needed
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});