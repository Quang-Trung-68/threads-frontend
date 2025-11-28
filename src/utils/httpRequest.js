import axios from "axios";
import Cookies from "js-cookie";

const httpRequest = axios.create({
  baseURL: "https://api01.f8team.dev/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

httpRequest.interceptors.response.use((response) => response.data);

export default httpRequest;
