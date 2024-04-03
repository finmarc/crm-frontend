import axios from "axios";

const api = axios.create({
  baseURL: "https://ms.finmarc.com.br",
  //baseURL: "http://localhost:3001",
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "@token"
)}`;
export default api;

export const apiFinmarcBndes = axios.create({
  baseURL: 'https://api.finmarc.com.br',
  //baseURL: 'http://localhost:8988',
});

export const apiFinmarcBndesOld = axios.create({
  baseURL: 'https://bndes-v1.finmarc.com.br',
});

