import axios from "axios";

export const baseURL = "http://localhost:8000/";
const axiosapi = axios.create({
  baseURL,
});
export default axiosapi;
