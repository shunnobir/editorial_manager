import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5000/api/",
  // baseURL: "http://bike-csecu.com:5000/api/",
  timeout: 10000,
});
