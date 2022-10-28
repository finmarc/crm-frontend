import axios from "axios";

const api = axios.create({
  // baseURL: "https://ms.finmarc.com.br",
  baseURL: "http://localhost:3001",
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "@token"
)}`;
export default api;
