import axios from "axios";

const api = axios.create({
  baseURL: "https://ms.finmarc.com.br",
});

export default api;
