import axios from "axios";

const api = axios.create({
  baseURL: "https://ms.finmarc.com.br",
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("@token")}`;
export default api;
