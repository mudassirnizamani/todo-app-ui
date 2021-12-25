import axios, { AxiosInstance } from "axios";

// Some globals configuration of axios - Mudasir Nizamani
const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export default instance;
