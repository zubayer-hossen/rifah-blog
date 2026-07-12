import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rifah_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Logs the real cause of every failed API call to the browser console —
// e.g. "Network Error" (backend not running / wrong VITE_API_URL / CORS)
// vs a 404/500 from the server — instead of failing silently.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const { config, response } = error;
    console.error(
      `[API] ${config?.method?.toUpperCase()} ${config?.url} failed:`,
      response ? `${response.status} ${response.statusText}` : error.message,
      response?.data || ""
    );
    return Promise.reject(error);
  }
);

export default api;
